import { IsNotEmpty, IsUrl } from "class-validator";

export class GoodsUrlDto {
  @IsNotEmpty({ message: 'empty catalog url' })
  @IsUrl({}, { message: 'invalid url' })
  public goodsUrl: string;
}