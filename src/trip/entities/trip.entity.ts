import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Riders } from './rider.entity';
import { Drivers } from './driver.entity';
@Entity()
export class Trips {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  longitudeInit: string;

  @Column({ nullable: true })
  longitudeEnd: string;

  @Column()
  latitudeInit: string;

  @Column({ nullable: true })
  latitudeEnd: string;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @ManyToOne(() => Riders, (rider) => rider.trips)
  rider: Riders;

  @ManyToOne(() => Drivers, (driver) => driver.trips)
  driver: Drivers;
}
