import { Test, TestingModule } from '@nestjs/testing';
import { StartService } from './start.service';
import { Trips } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sinon from 'sinon';

describe('TripService', () => {
  let service: StartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StartService,
        {
          provide: getRepositoryToken(Trips),
          useValue: sinon.createStubInstance(Repository),
        },
      ],
    }).compile();

    service = module.get<StartService>(StartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
