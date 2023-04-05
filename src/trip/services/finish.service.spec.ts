import { Test, TestingModule } from '@nestjs/testing';
import { FinishService } from './finish.service';
import { Trips, Fees, Riders } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ResourceService } from './resource.service';
import { ApiService } from './api.service';

const apiService = {
  postApi: () => {
    return {};
  },
  getApi: () => {
    return {};
  },
};
const resourceService = {
  getEnviroments: () => {
    return {};
  },
};

const mockTripsFind = {
  startDate: '2023-04-04 10:44:02',
  endDate: '2023-04-04 12:44:02',
  rider: 4,
  longitudeInit: '-76.544957',
  longitudeEnd: '-76.544957',
  latitudeInit: '2.510319',
  latitudeEnd: '2.510319',
};
const mockTripsUpdate = { id: 1 };
const mockRidersFind = {
  mail: 'juanito@gmail.com',
  paymentMethod: 123,
};
const mockFeesFind = {
  rateKm: 1000,
  baseValue: 200,
  rateTime: 100,
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
            update: jest.fn().mockReturnValue(mockTripsUpdate),
            findOneBy: jest.fn().mockReturnValue(mockTripsFind),
          },
        },
        {
          provide: getRepositoryToken(Riders),
          useValue: {
            findOneBy: jest.fn().mockReturnValue(mockRidersFind),
          },
        },
        {
          provide: getRepositoryToken(Fees),
          useValue: {
            findOneBy: jest.fn().mockReturnValue(mockFeesFind),
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
    service = module.get<FinishService>(FinishService);
  });

  it('should finish trip with successful', async () => {
    expect(service).toBeDefined();
    const data = {
      idTrip: 4,
      longitudeEnd: '-76.544957',
      latitudeEnd: '2.510319',
      numberInstallments: 2,
    };
    const response = jest.spyOn(service, 'endTrip');
    const spyPayTransaction = jest.spyOn(service, 'payTransaction');
    const spyGetValueToPay = jest.spyOn(service, 'getValueToPay');
    await service.endTrip(data);
    expect(response).toHaveBeenCalled();
    expect(spyPayTransaction).toHaveBeenCalled();
    expect(spyGetValueToPay).toHaveBeenCalled();
  });
});
