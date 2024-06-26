import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Source } from "../dto/goodsDto";


export type GoodsDocument = HydratedDocument<Goods>;

@Schema({ timestamps: true })
export class Goods {
  @Prop({ required: true, max: 256 })
  title: string;
  @Prop({ max: 256 })
  subtitle: string;
  @Prop()
  type: string;
  @Prop()
  specification: string;
  @Prop()
  description: string;
  @Prop({ type: Number, min: 0 })
  price: number;
  @Prop()
  pfp: string;
  @Prop({
    type: String,
    enum: ['ROZETKA', 'TELEMART']
  })
  itemSource: Source;
  @Prop()
  link: string;
}

export const GoodsSchema = SchemaFactory.createForClass(Goods);