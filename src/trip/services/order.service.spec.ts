import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { Trips, Drivers } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sinon from 'sinon';

describe('TripService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Trips),
          useValue: sinon.createStubInstance(Repository),
        },
        {
          provide: getRepositoryToken(Drivers),
          useValue: sinon.createStubInstance(Repository),
        },
      ],
      imports: [],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
