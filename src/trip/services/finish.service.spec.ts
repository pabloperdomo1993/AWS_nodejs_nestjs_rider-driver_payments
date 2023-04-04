import { Test, TestingModule } from '@nestjs/testing';
import { FinishService } from './finish.service';
import { Drivers, Fees, Riders } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sinon from 'sinon';

describe('TripService', () => {
  let service: FinishService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FinishService,
        {
          provide: getRepositoryToken(Drivers),
          useValue: sinon.createStubInstance(Repository),
        },
        {
          provide: getRepositoryToken(Riders),
          useValue: sinon.createStubInstance(Repository),
        },
        {
          provide: getRepositoryToken(Fees),
          useValue: sinon.createStubInstance(Repository),
        },
      ],
    }).compile();

    service = module.get<FinishService>(FinishService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
