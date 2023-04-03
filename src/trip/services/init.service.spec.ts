import { Test, TestingModule } from '@nestjs/testing';
import { LoadDataService } from './init.service';
import { Drivers } from '../entities/driver.entity';

describe('TripService', () => {
  let service: LoadDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoadDataService],
      imports: [Drivers],
    }).compile();

    service = module.get<LoadDataService>(LoadDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
