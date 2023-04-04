import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { Trips as Trip, Drivers as Driver } from '../entities';

describe('TripService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService],
      imports: [Trip, Driver],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
