import { Injectable } from '@nestjs/common';
import { FinishTripDto } from '../dto';
import { DateTime } from 'luxon';
import { Trips as Trip, Fees as Fee, Riders as Rider } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UtilsModule } from '../utils/utils';
import {
  CalculateTime,
  CalculateDistance,
  CalculatePay,
  TransactionPay,
} from '../interfaces';
import { v4 as uuidv4 } from 'uuid';
import { ResourceService } from './resource.service';
import { ApiService } from './api.service';
@Injectable()
export class FinishService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripsRepository: Repository<Trip>,
    @InjectRepository(Fee)
    private readonly feeRepository: Repository<Fee>,
    @InjectRepository(Rider)
    private readonly riderRepository: Repository<Rider>,
    private readonly resourceService: ResourceService,
    private readonly apiService: ApiService,
  ) {}

  async endTrip(data: FinishTripDto): Promise<any> {
    const id = data.idTrip;
    const obj = {
      longitudeEnd: data.longitudeEnd,
      latitudeEnd: data.latitudeEnd,
      endDate: DateTime.local().toISO(),
    };
    try {
      await this.tripsRepository.update(id, obj);
      const model = await this.tripsRepository.findOneBy({ id: data.idTrip });

      const dataPayCalculate: CalculatePay = {
        startDate: model.startDate,
        endDate: model.endDate,
        idDriver: model.rider,
        longitudeInit: model.longitudeInit,
        longitudeEnd: model.longitudeEnd,
        latitudeInit: model.latitudeInit,
        latitudeEnd: model.latitudeEnd,
      };

      const rider = await this.riderRepository.findOneBy(model.rider);
      const valuePay = await this.getValueToPay(dataPayCalculate);

      const dataPayTransaction: TransactionPay = {
        valuePay: valuePay,
        rider: rider,
        numberInstallments: data.numberInstallments,
      };
      await this.payTransaction(dataPayTransaction);
      return {
        message: `Trip paid successfully by value ${valuePay}.`,
      };
    } catch (error) {
      return {
        message: 'Error',
        error: error,
      };
    }
  }

  async payTransaction(dataPayTransaction: TransactionPay) {
    const { PRV_TEST } = this.resourceService.getEnviroments();
    const { CURRENCY } = this.getCurrency();
    const body = {
      amount_in_cents: dataPayTransaction.valuePay * 100,
      currency: CURRENCY,
      customer_email: dataPayTransaction.rider.mail,
      payment_method: {
        installments: dataPayTransaction.numberInstallments,
      },
      reference: uuidv4(),
      payment_source_id: dataPayTransaction.rider.paymentMethod,
    };
    const url = 'transactions';
    const response = await this.apiService.postApi(body, url, PRV_TEST);
    return response;
  }

  async getValueToPay(dataPayCalculate: CalculatePay) {
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

  getCurrency() {
    return {
      CURRENCY: 'COP',
    };
  }
}
