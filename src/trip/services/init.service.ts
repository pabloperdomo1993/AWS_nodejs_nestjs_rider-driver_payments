import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fees, Riders } from '../entities';
import { Drivers } from '../entities/driver.entity';


@Injectable()
export class LoadDataService {

  constructor(
    @InjectRepository(Drivers)
    private driversRepository: Repository<Drivers>,
    @InjectRepository(Riders)
    private ridersRepository: Repository<Riders>,
    @InjectRepository(Fees)
    private feesRepository: Repository<Fees>
  ) { }

  async createData() {
    // Create new fee
    const newFee = this.feesRepository.create({
      rateKm: 1200,
      rateTime: 100,
      baseValue: 3500
    });
    const fee = await this.feesRepository.save(newFee);
  

    // Create new driver
    const newDriver = this.driversRepository.create({
      longitude: "1",
      latitude: "1",
      name: "carlos",
      fee: fee
    });
    newDriver.fee = newFee;
    
    this.driversRepository.save(newDriver);

    // Create new rider
    const newRider = this.ridersRepository.create({
      mail: "eduardo@example.com"
    })
    this.ridersRepository.save(newRider);
  }
}
