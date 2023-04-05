import { Test, TestingModule } from '@nestjs/testing';
import { TripController } from './trip.controller';
import {
  PaymentMethodService,
  OrderService,
  StartService,
  FinishService,
  LoadDataService,
} from './services';
import { Trips, Drivers, Riders } from '../trip/entities';

describe('TripController', () => {
  let controller: TripController;

  beforeEach(async () => {
    const orderService = {
      createTrip: () => {
        return {};
      },
    };
    const paymentMethodService = {
      createPaymentMethod: () => {
        return {};
      },
    };
    const startService = {
      startTrip: () => {
        return {};
      },
    };
    const finishService = {
      endTrip: () => {
        return {};
      },
    };
    const loadDataService = {
      createData: () => {
        return {};
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [
        {
          provide: PaymentMethodService,
          useValue: paymentMethodService,
        },
        {
          provide: OrderService,
          useValue: orderService,
        },
        {
          provide: StartService,
          useValue: startService,
        },
        {
          provide: FinishService,
          useValue: finishService,
        },
        {
          provide: LoadDataService,
          useValue: loadDataService,
        },
      ],
      imports: [Trips, Drivers, Riders],
    }).compile();

    controller = module.get<TripController>(TripController);
  });

  it('should be defined and call load-data', () => {
    expect(controller).toBeDefined();
    const response = jest.spyOn(controller, 'initData');
    controller.initData();
    expect(response).toHaveBeenCalled();
  });

  it('should call payment-method', () => {
    const response = jest.spyOn(controller, 'paymentMethod');
    const data = {
      longitudeEnd: '-76.544957',
      latitudeEnd: '2.510319',
      idRider: 3,
      typePayment: 'CARD',
    };
    controller.paymentMethod(data);
    expect(response).toHaveBeenCalled();
  });

  it('should call orderTrip', () => {
    const response = jest.spyOn(controller, 'orderTrip');
    const data = {
      longitudeInit: '-76.544957',
      latitudeInit: '2.510319',
      idRider: 3,
    };
    controller.orderTrip(data);
    expect(response).toHaveBeenCalled();
  });

  it('should call startTrip', () => {
    const response = jest.spyOn(controller, 'initTrip');
    const data = {
      idTrip: 4,
    };
    controller.initTrip(data);
    expect(response).toHaveBeenCalled();
  });

  it('should call finishTrip', () => {
    const response = jest.spyOn(controller, 'finishTrip');
    const data = {
      longitudeEnd: '-76.545957',
      latitudeEnd: '2.510319',
      idTrip: 4,
      numberInstallments: 2,
    };
    controller.finishTrip(data);
    expect(response).toHaveBeenCalled();
  });
});
