import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { setting } from './env.setting';
import { list } from './env.list';
import { validation } from './env.validation';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: list[process.env.NODE_ENV] || list.production,
      load: [setting],
      validationOptions: validation,
    }),
  ],
  exports: [ConfigModule],
})

export class EnvironmentModule {}
