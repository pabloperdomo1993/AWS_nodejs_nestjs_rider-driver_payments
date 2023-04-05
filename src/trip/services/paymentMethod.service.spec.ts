import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMethodService } from './paymentMethod.service';
import { Riders } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sinon from 'sinon';
import { LoadDataService } from './init.service';
import { ResourceService } from './resource.service';
import { HttpService } from '@nestjs/axios';

const httpService = {
  post: () => {
    return {};
  },
  get: () => {
    return {};
  },
};

const resourceService = {
  getEnviroments: () => {
    return {};
  },
};

describe('TripService', () => {
  let service: PaymentMethodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentMethodService,
        {
          provide: getRepositoryToken(Riders),
          useValue: sinon.createStubInstance(Repository),
        },
        {
          provide: HttpService,
          useValue: httpService,
        },
        {
          provide: ResourceService,
          useValue: resourceService,
        },
      ],
    }).compile();
    service = module.get<PaymentMethodService>(PaymentMethodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
