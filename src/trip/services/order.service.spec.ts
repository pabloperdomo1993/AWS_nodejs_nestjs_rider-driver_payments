import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { Trips, Drivers } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockTripsSave = {};
const mockTripssCreate = {
  rider: 1,
};
const mockDriversFind = [
  { latitude: '2.510319', longitude: '-76.545957', id: 1 },
];
describe('TripService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Trips),
          useValue: {
            create: jest.fn().mockReturnValue(mockTripssCreate),
            save: jest.fn().mockReturnValue(mockTripsSave),
          },
        },
        {
          provide: getRepositoryToken(Drivers),
          useValue: {
            find: jest.fn().mockReturnValue(mockDriversFind),
          },
        },
      ],
      imports: [],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    const response = jest.spyOn(service, 'createTrip');
    const spySelectDriver = jest.spyOn(service, 'selectDriver');
    const data = {
      latitudeInit: '2.510319',
      longitudeInit: '-76.545957',
      idRider: 3,
    };
    await service.createTrip(data);
    expect(response).toHaveBeenCalled();
    expect(spySelectDriver).toHaveBeenCalled();
  });
});
