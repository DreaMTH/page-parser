import mongoose, { HydratedDocument } from "mongoose";
import { Source } from "../dto/goodsDto";
export type GoodsDocument = HydratedDocument<Goods>;
export declare class Goods {
    title: string;
    subtitle: string;
    type: string;
    specification: string;
    description: string;
    price: number;
    pfp: string;
    itemSource: Source;
    link: string;
}
export declare const GoodsSchema: mongoose.Schema<Goods, mongoose.Model<Goods, any, any, any, mongoose.Document<unknown, any, Goods> & Goods & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Goods, mongoose.Document<unknown, {}, mongoose.FlatRecord<Goods>> & mongoose.FlatRecord<Goods> & {
    _id: mongoose.Types.ObjectId;
}>;
