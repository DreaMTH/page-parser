import { Goods } from "../schemas/goods.schema";
import { Model } from "mongoose";
import { GoodsUrlDto } from "./goods.dto";
export declare class GoodsService {
    private goodsModel;
    constructor(goodsModel: Model<Goods>);
    findAll(): Promise<Goods[]>;
    addRztkGoods(goodsUrl: GoodsUrlDto): Promise<Goods[]>;
    addTelemartGoods(goodsUrl: GoodsUrlDto): Promise<Goods[]>;
}
