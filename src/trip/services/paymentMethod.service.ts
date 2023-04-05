import { Injectable } from '@nestjs/common';
import { Riders as Rider } from '../entities/rider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourceService } from './resource.service';
import { ApiService } from './api.service';
import { SourcePay } from '../interfaces/sourcePay';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(Rider)
    private readonly ridersRepository: Repository<Rider>,
    private readonly resourceService: ResourceService,
    private readonly apiService: ApiService,
  ) {}

  async createPaymentMethod(data) {
    const id = data.idRider;
    const rider = await this.ridersRepository.findOneBy(id);

    try {
      const acceptanceToken = await this.getmerchants();
      const tokenCard = await this.getTokenCard();
      const sourcePay: SourcePay = {
        acceptanceToken: acceptanceToken,
        tokenCard: tokenCard,
        riderMail: rider.mail,
        typePayment: data.typePayment,
      };
      const paymentSourceId = await this.paymentSource(sourcePay);

      const obj = {
        paymentMethod: paymentSourceId,
      };
      await this.ridersRepository.update(id, obj);

      const message = paymentSourceId
        ? `Create payment resource successfull ${paymentSourceId}`
        : 'It is not possible to create payment method';
      return { message };
    } catch (error) {
      return {
        message: 'Error',
        error: error,
      };
    }
  }

  async paymentSource(sourcePay: SourcePay) {
    const body = {
      type: sourcePay.typePayment,
      token: sourcePay.tokenCard,
      customer_email: sourcePay.riderMail,
      acceptance_token: sourcePay.acceptanceToken,
    };
    const { PRV_TEST } = this.resourceService.getEnviroments();
    const url = 'payment_sources';
    const response = await this.apiService.postApi(body, url, PRV_TEST);
    return response.data.id;
  }

  async getTokenCard() {
    const { PUB_TEST } = this.resourceService.getEnviroments();
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
    const url = 'tokens/cards';
    const response = await this.apiService.postApi(body, url, PUB_TEST);
    return response.data.id;
  }

  async getmerchants() {
    const { PUB_TEST } = this.resourceService.getEnviroments();
    const url = 'merchants';
    const response = await this.apiService.getApi(url, PUB_TEST);
    return response.data.presigned_acceptance.acceptance_token;
  }

  getDataCard() {
    return {
      CREADIT_CARD_NUMBER: '4242424242424242',
      CREDIT_CARD_CVC: '123',
      CREDIT_CARD_EXP_MONTH: '08',
      CREDIT_CARD_EXP_YEAR: '28',
      CREDIT_CARD_CARD_HOLDER: 'José Pérez',
    };
  }
}
