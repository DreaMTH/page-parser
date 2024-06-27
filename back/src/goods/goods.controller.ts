import { Body, Controller, Get, Post } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsUrlDto } from './goods.dto';

@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Get()
  async getGoods() {
    return await this.goodsService.findAll();
  }

  @Post('/rztk')
  async findRztkGoods(@Body() body: GoodsUrlDto) {
    return await this.goodsService.addRztkGoods(body);
  }

  @Post('/telemart')
  async findTelemartGoods(@Body() body: GoodsUrlDto) {
    return await this.goodsService.addTelemartGoods(body);
  }
}
