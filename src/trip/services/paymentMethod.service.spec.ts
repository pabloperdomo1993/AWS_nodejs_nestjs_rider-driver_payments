import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMethodService } from './paymentMethod.service';
import { Riders } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ResourceService } from './resource.service';
import { ApiService } from './api.service';

const resourceService = {
  getEnviroments: () => {
    const API_URL = 'this.configService.get<string>(config.api.API_URL)';
    const PRV_TEST = 'this.configService.get<string>(config.api.PRV_TEST)';
    const PUB_TEST = 'this.configService.get<string>(config.api.PUB_TEST)';
    return {
      API_URL,
      PRV_TEST,
      PUB_TEST,
    };
  },
};

const apiService = {
  postApi: () => {
    return {
      data: {
        id: 1,
      },
    };
  },
  getApi: () => {
    return {
      data: {
        presigned_acceptance: {
          acceptance_token: 'qweqwewas',
        },
      },
    };
  },
};

const mockRidersUpdate = {};
const mockRidersFind = {
  mail: 'juanito@gmail.com',
};
describe('TripService', () => {
  let service: PaymentMethodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentMethodService,
        {
          provide: getRepositoryToken(Riders),
          useValue: {
            findOneBy: jest.fn().mockReturnValue(mockRidersFind),
            update: jest.fn().mockReturnValue(mockRidersUpdate),
          },
        },
        {
          provide: ApiService,
          useValue: apiService,
        },
        {
          provide: ResourceService,
          useValue: resourceService,
        },
      ],
    }).compile();
    service = module.get<PaymentMethodService>(PaymentMethodService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    const response = jest.spyOn(service, 'createPaymentMethod');
    const spyPaymentSource = jest.spyOn(service, 'paymentSource');
    const spyGetTokeCard = jest.spyOn(service, 'getTokenCard');
    const spyGetMerchants = jest.spyOn(service, 'getmerchants');
    const data = {
      longitudeEnd: '-76.544957',
      latitudeEnd: '2.510319',
      idRider: 3,
      typePayment: 'CARD',
    };
    await service.createPaymentMethod(data);
    expect(response).toHaveBeenCalled();
    expect(spyPaymentSource).toHaveBeenCalled();
    expect(spyGetTokeCard).toHaveBeenCalled();
    expect(spyGetMerchants).toHaveBeenCalled();
  });
});
