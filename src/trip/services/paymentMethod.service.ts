import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Riders as Rider } from '../entities/rider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourceService } from './resource.service';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(Rider)
    private readonly ridersRepository: Repository<Rider>,
    private readonly httpService: HttpService,
    private readonly resourceService: ResourceService,
  ) {}

  async createPaymentMethod(data) {
    const id = data.idRider;
    const rider = await this.ridersRepository.findOneBy(id);

    let paymentSourceId = null;
    try {
      const acceptanceToken = await this.getmerchants();
      const tokenCard = await this.getTokenCard();
      paymentSourceId = await this.paymentSource(
        acceptanceToken,
        tokenCard,
        rider.mail,
        data.typePayment,
      );
    } catch (error) {
      const messageError = error.response.data.error.messages?.reference[0];
      throw new HttpException(messageError, HttpStatus.BAD_REQUEST);
    }

    if (paymentSourceId) {
      const obj = {
        paymentMethod: paymentSourceId,
      };
      await this.ridersRepository.update(id, obj);
    }
    const message = paymentSourceId
      ? `Create payment resource successfull ${paymentSourceId}`
      : 'It is not possible to create payment method';
    return { message };
  }

  async paymentSource(acceptanceToken, tokenCard, mail, typePayment) {
    const body = {
      type: typePayment,
      token: tokenCard,
      customer_email: mail,
      acceptance_token: acceptanceToken,
    };
    const { API_URL, PRV_TEST } = this.resourceService.getEnviroments();
    const headers: AxiosRequestConfig['headers'] = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${PRV_TEST}`,
    };
    const data = this.httpService
      .post(`${API_URL}/payment_sources`, body, { headers })
      .pipe(
        map((response: AxiosResponse<any>) => {
          return response.data;
        }),
      );

    const response = await lastValueFrom(data);
    return response.data.id;
  }

  async getTokenCard() {
    const { API_URL, PUB_TEST } = this.resourceService.getEnviroments();
    const {
      CREADIT_CARD_NUMBER,
      CREDIT_CARD_CVC,
      CREDIT_CARD_EXP_MONTH,
      CREDIT_CARD_EXP_YEAR,
      CREDIT_CARD_CARD_HOLDER,
    } = this.getDataCard();
    const body = {
      number: CREADIT_CARD_NUMBER,
      cvc: CREDIT_CARD_CVC,
      exp_month: CREDIT_CARD_EXP_MONTH,
      exp_year: CREDIT_CARD_EXP_YEAR,
      card_holder: CREDIT_CARD_CARD_HOLDER,
    };
    const headers: AxiosRequestConfig['headers'] = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${PUB_TEST}`,
    };

    const data = this.httpService
      .post(`${API_URL}/tokens/cards`, body, { headers })
      .pipe(
        map((response: AxiosResponse<any>) => {
          return response.data;
        }),
      );

    const response = await lastValueFrom(data);
    return response.data.id;
  }

  async getmerchants() {
    const { API_URL, PUB_TEST } = this.resourceService.getEnviroments();
    const data = this.httpService.get(`${API_URL}/merchants/${PUB_TEST}`).pipe(
      map((response: AxiosResponse<any>) => {
        return response.data;
      }),
    );
    const response = await lastValueFrom(data);
    return response.data.presigned_acceptance.acceptance_token;
  }

  getDataCard() {
    const CREADIT_CARD_NUMBER = '4242424242424242';
    const CREDIT_CARD_CVC = '123';
    const CREDIT_CARD_EXP_MONTH = '08';
    const CREDIT_CARD_EXP_YEAR = '28';
    const CREDIT_CARD_CARD_HOLDER = 'José Pérez';

    return {
      CREADIT_CARD_NUMBER,
      CREDIT_CARD_CVC,
      CREDIT_CARD_EXP_MONTH,
      CREDIT_CARD_EXP_YEAR,
      CREDIT_CARD_CARD_HOLDER,
    };
  }
}
