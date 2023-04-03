import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Trips } from './trip.entity';
@Entity()
export class Riders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mail: string;

  @Column({ nullable: true })
  paymentMethod: number;

  @OneToMany(() => Trips, (trip) => trip.rider)
  trips: Trips[];
}
