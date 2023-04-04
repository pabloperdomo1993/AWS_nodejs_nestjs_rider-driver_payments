import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMethodService } from './paymentMethod.service';
import { Riders } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sinon from 'sinon';
import { LoadDataService } from './init.service';
import { ResourceService } from './resource.service';
import { HttpService } from '@nestjs/axios';
import { AxiosInstance } from 'axios';

describe('TripService', () => {
  let service: PaymentMethodService;
  let httpService: HttpService;
  let axiosInstance: AxiosInstance;
  const AXIOS_INSTANCE_TOKEN = '';

  beforeEach(async () => {
    const ApiInidService = {
      provide: LoadDataService,
      useFactory: () => ({
        createData: jest.fn(() => []),
      }),
    };
    const ApiResourceService = {
      provide: ResourceService,
      useFactory: () => ({
        getEnviroments: jest.fn(() => []),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentMethodService,
        ApiResourceService,
        ResourceService,
        ApiInidService,
        LoadDataService,
        {
          provide: getRepositoryToken(Riders),
          useValue: sinon.createStubInstance(Repository),
        },
      ],
      imports: [HttpService, AXIOS_INSTANCE_TOKEN],
    }).compile();
    service = module.get<PaymentMethodService>(PaymentMethodService);
    // httpService = module.get<HttpService>(HttpService);
    // axiosInstance = module.get<AxiosInstance>(AXIOS_INSTANCE_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
