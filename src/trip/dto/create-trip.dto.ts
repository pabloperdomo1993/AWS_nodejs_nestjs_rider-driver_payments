import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTripDto {
  @ApiProperty({
    required: true,
    type: String,
    example: '-76.544957',
    description: 'longitudeInit',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  longitudeInit: string;

  @ApiProperty({
    required: true,
    type: String,
    example: '2.510319',
    description: 'latitudeInit',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  latitudeInit: string;

  @ApiProperty({
    required: true,
    type: Number,
    example: 3,
    description: 'idRider',
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  idRider: number;
}
