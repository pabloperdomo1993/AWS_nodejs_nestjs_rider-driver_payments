import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTripDto } from '../dto/create-trip.dto';
import { Trips as Trip, Drivers as Driver } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { UtilsModule } from '../utils/utils';
import { CalculateDistance } from '../interfaces/calculateDistance';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripsRepository: Repository<Trip>,
    @InjectRepository(Driver)
    private readonly driveRepository: Repository<Driver>,
  ) {}

  async createTrip(data: CreateTripDto): Promise<any> {
    const driver = await this.selectDriver(
      data.latitudeInit,
      data.longitudeInit,
    );
    const obj = {
      ...data,
      idDriver: driver,
    };
    const trip = this.tripsRepository.create(obj);
    const response: any = await this.tripsRepository.save(trip);

    const message = response
      ? `Create order successfull ${response.id}.`
      : 'It is not possible to create order.';
    return { message };
  }

  async selectDriver(latitude, longitude) {
    const drivers = await this.driveRepository.find();
    const bestDrivers = [];
    drivers.forEach((element) => {
      const dataDistance: CalculateDistance = {
        latitudeInit: latitude,
        latitudeEnd: element.latitude,
        longitudeInit: longitude,
        longitudeEnd: element.longitude,
      };
      const distance = UtilsModule.calculateDistance(dataDistance);
      bestDrivers.push({
        id: element.id,
        distance: distance,
      });
    });

    let bestDriver = bestDrivers[0];
    bestDrivers.forEach((element) => {
      if (element.distance < bestDriver.distance) {
        bestDriver = element;
      }
    });
    return bestDriver.id;
  }
}
