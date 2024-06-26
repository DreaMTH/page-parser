import { GoodsDto } from '../dto/goodsDto';
export declare const telemartGetGoods: (path: string) => Promise<string[]>;
export declare const parseTelemartGoods: (goodsLink: string) => Promise<GoodsDto>;
