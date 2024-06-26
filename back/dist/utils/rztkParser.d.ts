import { GoodsDto } from "../dto/goodsDto";
export declare const rztkGetGoods: (path: string) => Promise<string[]>;
export declare const parseRztkGoods: (goodsLink: string) => Promise<GoodsDto>;
