export enum Source {
  Rozetka= 'ROZETKA',
  Telemart = 'TELEMART'
}

export interface GoodsDto {
  title: string,
  subtitle?: string,
  description?: string,
  price: number,
  specification: string,
  type: string,
  pfp: string,
  itemSource: Source,
  link: string
}