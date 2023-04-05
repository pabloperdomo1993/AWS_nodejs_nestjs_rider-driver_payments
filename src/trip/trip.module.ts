import { Module } from '@nestjs/common';
import { TripController } from './trip.controller';
import {
  PaymentMethodService,
  OrderService,
  StartService,
  FinishService,
  ResourceService,
  LoadDataService,
  ApiService,
} from './services/index';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trips, Fees, Drivers, Riders } from './entities/index';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trips, Fees, Drivers, Riders]),
    HttpModule,
  ],
  controllers: [TripController],
  providers: [
    PaymentMethodService,
    OrderService,
    StartService,
    FinishService,
    ResourceService,
    LoadDataService,
    ApiService,
  ],
})
export class TripModule {}
