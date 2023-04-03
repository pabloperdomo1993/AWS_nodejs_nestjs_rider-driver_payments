import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreatePaymentMethodDto {
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
    example: 3,
    description: 'idRider',
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  idRider: number;

  @ApiProperty({
    required: true,
    type: String,
    example: 'CARD',
    description: 'typePayment',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  typePayment: string;
}
