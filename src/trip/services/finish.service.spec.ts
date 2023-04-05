import { Test, TestingModule } from '@nestjs/testing';
import { FinishService } from './finish.service';
import { Trips, Fees, Riders } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sinon from 'sinon';
import { HttpService } from '@nestjs/axios';
import { ResourceService } from './resource.service';
import { FinishTripDto } from '../dto/finish-trip.dto';

// const httpService = {
//   post: () => {
//     return {
//       data: {}, 
//     };
//   },
// };
let httpService: HttpService;
const resourceService = {
  getEnviroments: () => {
    return {};
  },
};
describe('TripService', () => {
  let service: FinishService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FinishService,
        {
          provide: getRepositoryToken(Trips),
          useValue: {
            update: jest.fn().mockReturnValue({ id: 1 }),
            findOneBy: jest.fn().mockReturnValue({
              startDate: '2023-04-04 10:44:02',
              endDate: '2023-04-04 12:44:02',
              rider: 4,
              longitudeInit: '-76.544957',
              longitudeEnd: '-76.544957',
              latitudeInit: '2.510319',
              latitudeEnd: '2.510319',
            }),
          },
        },
        {
          provide: getRepositoryToken(Riders),
          useValue: {
            findOneBy: jest.fn().mockReturnValue({
              mail: 'juanito@gmail.com',
              paymentMethod: 123,
            }),
          },
        },
        {
          provide: getRepositoryToken(Fees),
          useValue: {
            findOneBy: jest.fn().mockReturnValue({
              rateKm: 1000,
              baseValue: 200,
              rateTime: 100,
            }),
          },
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
    service = module.get<FinishService>(FinishService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    const data = {
      idTrip: 4,
      longitudeEnd: '-76.544957',
      latitudeEnd: '2.510319',
      numberInstallments: 2,
    };
    const response = jest.spyOn(service, 'endTrip');
    await service.endTrip(data);
    expect(response).toHaveBeenCalled();
  });
});
