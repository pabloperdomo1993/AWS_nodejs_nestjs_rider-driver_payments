import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.mysql';
import { EnvironmentModule } from './environment/env.module';
import { TripModule } from 'src/trip/trip.module';
import { UtilsModule } from 'src/trip/utils/utils';
@Module({
  imports: [EnvironmentModule, DatabaseModule, TripModule, UtilsModule],
})
export class AppModule {}
