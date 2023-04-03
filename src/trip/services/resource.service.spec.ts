import { Test, TestingModule } from '@nestjs/testing';
import { ResourceService } from './resource.service';
import { ConfigService } from '@nestjs/config';

describe('TripService', () => {
  let service: ResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResourceService],
      imports: [ConfigService],
    }).compile();

    service = module.get<ResourceService>(ResourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
