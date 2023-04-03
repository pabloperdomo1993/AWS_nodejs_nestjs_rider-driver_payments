import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FinishTripDto {
  @ApiProperty({
    required: true,
    type: Number,
    example: 4,
    description: 'idTrip',
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  idTrip: number;

  @ApiProperty({
    required: true,
    type: String,
    example: '-76.544957',
    description: 'longitudeEnd',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  longitudeEnd: string;

  @ApiProperty({
    required: true,
    type: String,
    example: '2.510319',
    description: 'latitudeEnd',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  latitudeEnd: string;

  @ApiProperty({
    required: true,
    type: Number,
    example: 2,
    description: 'numberInstallments',
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  numberInstallments: number;
}
