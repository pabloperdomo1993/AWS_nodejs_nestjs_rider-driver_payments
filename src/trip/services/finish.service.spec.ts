import { Test, TestingModule } from '@nestjs/testing';
import { FinishService } from './finish.service';

describe('TripService', () => {
  let service: FinishService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinishService],
    }).compile();

    service = module.get<FinishService>(FinishService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
