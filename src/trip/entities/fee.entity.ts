import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Drivers } from './driver.entity';
@Entity()
export class Fees {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rateKm: number;

  @Column()
  rateTime: number;

  @Column()
  baseValue: number;

  @OneToMany(() => Drivers, (driver) => driver.fee)
  drivers: Drivers[];
}
