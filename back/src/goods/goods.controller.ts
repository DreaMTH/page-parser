import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { GoodsService } from "./goods.service";
import { GoodsUrlDto } from "./goods.dto";

@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {
  }

  @Get()
  async getGoods() {
    try {
      return await this.goodsService.findAll();
    } catch (e) {
      return new HttpException({
        body: {
          message: 'Internal server error'
        }
      }, 500);
    }
  }

  @Post('/rztk')
  async findRztkGoods(@Body() body: GoodsUrlDto) {
    try {
      return await this.goodsService.addRztkGoods(body);
    } catch (e) {
      throw new HttpException({
        body: {
          message: 'internal server error',
        }
      }, 500);
    }
  }

  @Post('/telemart')
  async findTelemartGoods(@Body() body: GoodsUrlDto) {
    try {
      return await this.goodsService.addTelemartGoods(body);
    } catch (e) {
      throw new HttpException({
        body: {
          message: e.message,
        }
      }, 500);
    }
  }
}
