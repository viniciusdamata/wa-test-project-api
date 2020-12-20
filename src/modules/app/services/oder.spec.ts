// import { Order } from '../../database/models/order';
import { IOrder } from 'modules/database/interfaces/order';
import { OrderRepository } from '../repositories/order';
import { OrderService } from './order';

describe('App/OrderService', () => {
  let orderRepository: OrderRepository;
  let service: OrderService;

  const order: IOrder = {
    description: 'Teste',
    quantity: 5,
    value: 800
  };

  const ordersList: Array<IOrder> = [
    {
      description: 'Teste',
      quantity: 5,
      value: 800
    },
    {
      description: 'Teste',
      quantity: 5,
      value: 800
    },
    {
      description: 'Teste',
      quantity: 5,
      value: 800
    }
  ];

  beforeEach(() => {
    orderRepository = new OrderRepository();
    service = new OrderService(orderRepository);
  });

  it('should create one Order', async () => {
    jest.spyOn(orderRepository, 'insert').mockImplementationOnce((order: IOrder) => Promise.resolve(order as any));
    const response = await service.save(order);

    expect(orderRepository.insert).toHaveBeenCalledTimes(1);
    expect(response).toBeDefined();
    expect(response).toEqual(order);
  });

  it('should list all Orders', async () => {
    const orderRepositoryMock = jest.fn(() => ({
      list: jest.fn(() => Promise.resolve(ordersList))
    }))();

    const response = await orderRepositoryMock.list();
    expect(response).toBeDefined();
    expect(response).toBeArray();
    expect(response).toEqual(ordersList);
  });

  it('should update one Order', async () => {
    jest.spyOn(orderRepository, 'insert').mockImplementationOnce(order => Promise.resolve({ id: 1, ...order } as any));
    jest
      .spyOn(orderRepository, 'findById')
      .mockImplementationOnce((id = 1) => Promise.resolve({ id, ...order } as any));
    jest
      .spyOn(orderRepository, 'update')
      .mockImplementationOnce(order => Promise.resolve({ id: 1, newDescription, ...order } as any));

    const { id } = await service.save(order);
    const newDescription = 'nova descrição';

    const response = await service.update(id, { description: newDescription, ...order });

    expect(response).toBeDefined();
    expect(response).toEqual({ id, newDescription, ...order });
  });

  it('should remove one Order', async () => {
    jest
      .spyOn(orderRepository, 'findById')
      .mockImplementationOnce((id = 1) => Promise.resolve({ id, ...order } as any));
    jest.spyOn(orderRepository, 'remove').mockImplementationOnce(_ => Promise.resolve());
    await service.remove(1);

    expect(orderRepository.remove).toHaveBeenCalledTimes(1);
  });
});
