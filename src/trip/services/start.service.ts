import { Injectable } from '@nestjs/common';
import { StartTripDto } from '../dto/index';
import { DateTime } from 'luxon';
import { Trips as Trip } from '../entities/index';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StartService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripsRepository: Repository<Trip>,
  ) {}

  async startTrip(data: StartTripDto): Promise<any> {
    const id = data.idTrip;
    const obj = {
      startDate: DateTime.local().toISO(),
    };
    const response = await this.tripsRepository.update(id, obj);
    const message = response
      ? 'Trip start successfull'
      : 'It is not possible to start trip';
    return { message };
  }
}
