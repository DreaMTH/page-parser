import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Goods } from "../schemas/goods.schema";
import { Model } from "mongoose";
import { GoodsDto } from "../dto/goodsDto";
import { parseRztkGoods, rztkGetGoods } from "../utils/rztkParser";
import { parseTelemartGoods, telemartGetGoods } from "../utils/telemartParser";
import { GoodsUrlDto } from "./goods.dto";

@Injectable()
export class GoodsService {
  constructor(@InjectModel(Goods.name) private goodsModel: Model<Goods>) {

  }

  async findAll(): Promise<Goods[]> {
    return await this.goodsModel.find().exec();
  }

  async addRztkGoods(goodsUrl: GoodsUrlDto): Promise<Goods[]> {
    try {
      const catalog = goodsUrl.goodsUrl;
      const items = await rztkGetGoods(catalog);
      for (const item of items) {
        const goods: GoodsDto = await parseRztkGoods(item);
        const doc = new this.goodsModel(goods);
        await doc.save();
      }
    } catch (error) {
      throw new HttpException({
        error
      }, 400,);
    }
    return await this.goodsModel.find({}).exec();
  }

  async addTelemartGoods(goodsUrl: GoodsUrlDto): Promise<Goods[]> {
    try {
      const catalog = goodsUrl.goodsUrl;
      const items: string[] = await telemartGetGoods(catalog);
      for (const item of items) {
        const goods: GoodsDto = await parseTelemartGoods(item);
        const doc = new this.goodsModel(goods);
        await doc.save();
      }
    } catch (e) {
      throw new HttpException({
        e
      }, 400);
    }
    return await this.goodsModel.find({}).exec();
  }
}
