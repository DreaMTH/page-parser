import { Module } from '@nestjs/common';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Goods, GoodsSchema } from '../schemas/goods.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Goods.name,
        schema: GoodsSchema,
      },
    ]),
  ],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}
