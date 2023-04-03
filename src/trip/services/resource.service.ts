import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ResourceService {
  constructor(private readonly configService: ConfigService) {}

  getEnviroments() {
    const API_URL = this.configService.get<string>('config.api.API_URL');
    const PRV_TEST = this.configService.get<string>('config.api.PRV_TEST');
    const PUB_TEST = this.configService.get<string>('config.api.PUB_TEST');

    return {
      API_URL,
      PRV_TEST,
      PUB_TEST,
    };
  }
}
