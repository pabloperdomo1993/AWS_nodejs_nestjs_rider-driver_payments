import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Trips } from './trip.entity';
import { Fees } from './fee.entity';

@Entity()
export class Drivers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  longitude: string;

  @Column()
  latitude: string;

  @Column()
  name: string;

  @OneToMany(() => Trips, (trip) => trip.driver)
  trips: Trips[];

  @ManyToOne(() => Fees, (fee) => fee.drivers)
  fee: Fees;
}
