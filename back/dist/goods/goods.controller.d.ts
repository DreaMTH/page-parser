import { HttpException } from '@nestjs/common';
import { GoodsService } from "./goods.service";
import { GoodsUrlDto } from "./goods.dto";
export declare class GoodsController {
    private readonly goodsService;
    constructor(goodsService: GoodsService);
    getGoods(): Promise<import("../schemas/goods.schema").Goods[] | HttpException>;
    findRztkGoods(body: GoodsUrlDto): Promise<import("../schemas/goods.schema").Goods[]>;
    findTelemartGoods(body: GoodsUrlDto): Promise<import("../schemas/goods.schema").Goods[]>;
}
