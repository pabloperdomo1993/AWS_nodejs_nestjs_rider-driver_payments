import { Test, TestingModule } from '@nestjs/testing';
import { TripController } from './trip.controller';
import {
  PaymentMethodService,
  OrderService,
  StartService,
  FinishService,
  LoadDataService
} from './services';
import { Trips, Drivers, Riders  } from '../trip/entities';

describe('TripController', () => {
  let controller: TripController;
  // let spyOrderService: OrderService;
  beforeEach(async () => {
    const ApiOrderService = {
      provide: OrderService,
      useFactory: () => ({
        createTrip: jest.fn(() => []),
        selectDriver: jest.fn(() => []),
      }),
    };
    const ApiPaymentMethodService = {
      provide: PaymentMethodService,
      useFactory: () => ({
        createPaymentMethod: jest.fn(() => []),
        paymentSource: jest.fn(() => []),
        getTokenCard: jest.fn(() => []),
        getmerchants: jest.fn(() => []),
        getDataCard: jest.fn(() => []),
      }),
    };
    const ApiStartService = {
      provide: StartService,
      useFactory: () => ({
        startTrip: jest.fn(() => []),
      }),
    };
    const ApiFinishService = {
      provide: FinishService,
      useFactory: () => ({
        endTrip: jest.fn(() => []),
      }),
    };
    const ApiInidService = {
      provide: LoadDataService,
      useFactory: () => ({
        createData: jest.fn(() => []),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [
        PaymentMethodService,
        OrderService,
        StartService,
        FinishService,
        LoadDataService,
        ApiOrderService,
        ApiPaymentMethodService,
        ApiStartService,
        ApiFinishService,
        ApiInidService,
      ],
      imports: [Trips, Drivers, Riders],
    }).compile();

    controller = module.get<TripController>(TripController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
