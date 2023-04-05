import { Test, TestingModule } from '@nestjs/testing';
import { StartService } from './start.service';
import { Trips } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sinon from 'sinon';

const mockTripsUpdate = {
  value: 1,
};
describe('TripService', () => {
  let service: StartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StartService,
        {
          provide: getRepositoryToken(Trips),
          useValue: {
            update: jest.fn().mockReturnValue(mockTripsUpdate),
          },
        },
      ],
    }).compile();

    service = module.get<StartService>(StartService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    const response = jest.spyOn(service, 'startTrip');
    const data = {
      idTrip: 2,
    };
    await service.startTrip(data);
    expect(response).toHaveBeenCalled();
  });
});
