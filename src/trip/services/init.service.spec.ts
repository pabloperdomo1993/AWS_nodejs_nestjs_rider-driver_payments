import { Test, TestingModule } from '@nestjs/testing';
import { LoadDataService } from './init.service';
import { Drivers, Fees, Riders } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockDriversCreate = {
  fee: 1,
};
const mockDriversSave = {};
const mockRidersCreate = {
  rider: 1,
};
const mockRidersSave = {};
const mockFeesCreate = {
  rider: 1,
};
const mockFeesSave = {};
describe('TripService', () => {
  let service: LoadDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoadDataService,
        {
          provide: getRepositoryToken(Drivers),
          useValue: {
            create: jest.fn().mockReturnValue(mockDriversCreate),
            save: jest.fn().mockReturnValue(mockDriversSave),
          },
        },
        {
          provide: getRepositoryToken(Riders),
          useValue: {
            create: jest.fn().mockReturnValue(mockRidersCreate),
            save: jest.fn().mockReturnValue(mockRidersSave),
          },
        },
        {
          provide: getRepositoryToken(Fees),
          useValue: {
            create: jest.fn().mockReturnValue(mockFeesCreate),
            save: jest.fn().mockReturnValue(mockFeesSave),
          },
        },
      ],
    }).compile();

    service = module.get<LoadDataService>(LoadDataService);
  });

  it('should call seeds data', async () => {
    expect(service).toBeDefined();
    const response = jest.spyOn(service, 'createData');
    await service.createData();
    expect(response).toHaveBeenCalled();
  });
});
