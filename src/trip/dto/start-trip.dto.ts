import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class StartTripDto {
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
}
