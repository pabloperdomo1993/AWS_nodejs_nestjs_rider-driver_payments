import { Test, TestingModule } from '@nestjs/testing';
import { LoadDataService } from './init.service';
import { Drivers, Fees, Riders } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sinon from 'sinon';

describe('TripService', () => {
  let service: LoadDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoadDataService,
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

    service = module.get<LoadDataService>(LoadDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
