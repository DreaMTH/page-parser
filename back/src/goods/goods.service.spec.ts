import { Test, TestingModule } from '@nestjs/testing';
import { GoodsService } from './goods.service';
import { getModelToken } from '@nestjs/mongoose';
import { Goods } from '../schemas/goods.schema';

describe('GoodsService', () => {
  let service: GoodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoodsService,
        {
          provide: getModelToken(Goods.name),
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<GoodsService>(GoodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should not be null', () => {
    expect(service.findAll()).not.toBeNull();
  });
  it('should not be undefined', () => {
    expect(service.findAll()).not.toBeUndefined();
  });
  it('should not be null', () => {
    expect(
      service.addRztkGoods({
        goodsUrl: 'https://rozetka.com.ua/ua/',
      }),
    ).not.toBeNull();
  });
  it('should not be undefined', () => {
    expect(
      service.addRztkGoods({
        goodsUrl: 'https://rozetka.com.ua/ua/',
      }),
    ).not.toBeUndefined();
  });
  it('should not be null', () => {
    expect(
      service.addTelemartGoods({
        goodsUrl: 'https://telemart.ua/ua/videocard/',
      }),
    ).not.toBeNull();
  });
  it('should not be undefined', () => {
    expect(
      service.addTelemartGoods({
        goodsUrl: 'https://telemart.ua/ua/videocard/',
      }),
    ).not.toBeUndefined();
  });
});
