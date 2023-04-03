import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FinishTripDto } from '../dto/index';
import { DateTime } from 'luxon';
import { Trips as Trip, Fees as Fee, Riders as Rider } from '../entities/index';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { UtilsModule } from '../utils/utils';
import { CalculateTime, CalculateDistance } from '../interfaces/index';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { v4 as uuidv4 } from 'uuid';
import { ResourceService } from './resource.service';
@Injectable()
export class FinishService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripsRepository: Repository<Trip>,
    @InjectRepository(Fee)
    private readonly feeRepository: Repository<Fee>,
    @InjectRepository(Rider)
    private readonly riderRepository: Repository<Rider>,
    private readonly httpService: HttpService,
    private readonly resourceService: ResourceService,
  ) {}

  async endTrip(data: FinishTripDto): Promise<any> {
    const id = data.idTrip;
    const obj = {
      longitudeEnd: data.longitudeEnd,
      latitudeEnd: data.latitudeEnd,
      endDate: DateTime.local().toISO(),
    };
    const trip = await this.tripsRepository.update(id, obj);

    if (trip) {
      const model = await this.tripsRepository.findOneBy({ id: data.idTrip });

      const dataPayCalculate = {
        startDate: model.startDate,
        endDate: model.endDate,
        idDriver: model.rider,
        longitudeInit: model.longitudeInit,
        longitudeEnd: model.longitudeEnd,
        latitudeInit: model.latitudeInit,
        latitudeEnd: model.latitudeEnd,
      };
      const rider = await this.getRiver(model.rider);
      const valuePay = await this.getValueToPay(dataPayCalculate);

      try {
        await this.payTransaction(valuePay, rider, data.numberInstallments);
      } catch (error) {
        const messageError = error.response.data.error.messages.reference
          ? error.response.data.error.messages.reference[0]
          : null;
        const message =
          messageError ??
          error.response.data.error.messages.valid_amount_in_cents[0];
        throw new HttpException(message, HttpStatus.BAD_REQUEST);
      }

      return {
        message: `Trip paid successfully by value ${valuePay}.`
      }
    } else {
      throw new HttpException('Trip not exist.', HttpStatus.BAD_REQUEST);
    }
  }

  async payTransaction(valuePay, rider, numberInstallments) {
    const { API_URL, PRV_TEST } = this.resourceService.getEnviroments();
    const { CURRENCY } = this.getCurrency();
    const body = {
      amount_in_cents: valuePay * 100,
      currency: CURRENCY,
      customer_email: rider.mail,
      payment_method: {
        installments: numberInstallments,
      },
      reference: uuidv4(),
      payment_source_id: rider.paymentMethod,
    };

    const headers: AxiosRequestConfig['headers'] = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${PRV_TEST}`,
    };

    const data = this.httpService
      .post(`${API_URL}/transactions`, body, { headers })
      .pipe(
        map((response: AxiosResponse<any>) => {
          return response.data;
        }),
      );
    const response = await lastValueFrom(data);
    return response;
  }

  async getValueToPay(dataPayCalculate) {
    const idDriver = dataPayCalculate.idDriver;
    const data: CalculateTime = {
      initDate: dataPayCalculate.startDate,
      endDate: dataPayCalculate.endDate,
    };
    const timeToPay = UtilsModule.calculateTimeInMinutes(data);
    const dataDistance: CalculateDistance = {
      latitudeInit: dataPayCalculate.latitudeInit,
      latitudeEnd: dataPayCalculate.latitudeEnd,
      longitudeInit: dataPayCalculate.longitudeInit,
      longitudeEnd: dataPayCalculate.longitudeEnd,
    };

    const fee = await this.feeRepository.findOneBy(idDriver);
    const distance = UtilsModule.calculateDistance(dataDistance);
    const valueToPay =
      fee.rateTime * timeToPay + fee.rateKm * distance + fee.baseValue;
    return Math.round(valueToPay);
  }

  async getRiver(id) {
    return this.riderRepository.findOneBy(id);
  }

  getCurrency() {
    return {
      CURRENCY: 'COP'
    }
  }
}
