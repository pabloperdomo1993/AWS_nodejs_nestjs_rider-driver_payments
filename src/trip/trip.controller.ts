import { Controller, Post, Body, Get } from '@nestjs/common';
import {
  CreateTripDto,
  StartTripDto,
  FinishTripDto,
  CreatePaymentMethodDto,
} from './dto';
import {
  PaymentMethodService,
  OrderService,
  StartService,
  FinishService,
  LoadDataService,
} from './services';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
@ApiTags('Trip')
@Controller('trip')
export class TripController {
  constructor(
    private paymentMethodService: PaymentMethodService,
    private orderService: OrderService,
    private startService: StartService,
    private finishService: FinishService,
    private loadService: LoadDataService,
  ) { }

  @ApiOperation({ summary: 'Create data.' })
  @Get('/load-data')
  initData() {
    return this.loadService.createData();
  }

  @ApiOperation({ summary: 'Create payment method.' })
  @Post('/payment-method')
  paymentMethod(@Body() data: CreatePaymentMethodDto): Promise<any> {
    return this.paymentMethodService.createPaymentMethod(data);
  }

  @ApiOperation({ summary: 'Request a ride to the nearest driver.' })
  @Post('/order')
  async orderTrip(@Body() data: CreateTripDto): Promise<any> {
    return this.orderService.createTrip(data);
  }

  @ApiOperation({ summary: 'Start trip.' })
  @Post('/start')
  async initTrip(@Body() data: StartTripDto): Promise<any> {
    return this.startService.startTrip(data);
  }

  @ApiOperation({ summary: 'Finish trip.' })
  @ApiResponse({ description: 'Finished trip.' })
  @Post('/finish')
  async finishTrip(@Body() data: FinishTripDto): Promise<any> {
    return this.finishService.endTrip(data);
  }
}
