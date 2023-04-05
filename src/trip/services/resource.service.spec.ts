import { Test, TestingModule } from '@nestjs/testing';
import { ResourceService } from './resource.service';
import { ConfigService } from '@nestjs/config';

describe('TripService', () => {
  let service: ResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResourceService, ConfigService],
      imports: [],
    }).compile();

    service = module.get<ResourceService>(ResourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    const response = jest.spyOn(service, 'getEnviroments');
    service.getEnviroments();
    expect(response).toHaveBeenCalled();
  });
});
