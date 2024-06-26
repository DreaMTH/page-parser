import { Test, TestingModule } from '@nestjs/testing';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import { getModelToken } from '@nestjs/mongoose';
import { Goods } from '../schemas/goods.schema';

describe('GoodsController', () => {
  let controller: GoodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoodsController],
      providers: [
        GoodsService,
        {
          provide: getModelToken(Goods.name),
          useValue: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<GoodsController>(GoodsController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should throw validation error', () => {
    expect(
      controller.findRztkGoods({
        goodsUrl: '123124435',
      }),
    ).toContain({
      message: 'invalid url',
    });
  });
  it('should throw validation error', () => {
    expect(
      controller.findTelemartGoods({
        goodsUrl: '123124435',
      }),
    ).toContain({
      message: 'invalid url',
    });
  });
  it('should be not null', () => {
    expect(controller.getGoods()).not.toBeNull();
  });
});
