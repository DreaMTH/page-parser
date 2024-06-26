import puppeteer from 'puppeteer';
import { GoodsDto, Source } from '../dto/goodsDto';

export const telemartGetGoods = async (path: string): Promise<string[]> => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  await page.goto(path);
  const goods = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('.product-item__title'),
      (element: HTMLDivElement) =>
        (<HTMLAnchorElement>element.children[0]).href,
    ),
  );
  await browser.close();
  return goods;
};
export const parseTelemartGoods = async (
  goodsLink: string,
): Promise<GoodsDto> => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  await page.goto(goodsLink);
  const title = await page.evaluate(
    () => document.querySelector('.card-block__title').textContent,
  );

  let price: string | number;
  try {
    price = await page.evaluate(
      () => document.querySelector('.card-block__price-summ').textContent,
    );

    price = Number.parseInt(
      price.replace(' ', '').slice(0, -1).trim(),
    );
  } catch (e) {
    price = 0;
  }
  const types = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('.breadcrumb-item'),
      (element: HTMLLIElement) => element.textContent,
    ),
  );
  const type = types.join(' ');
  const pfp = await page.evaluate(
    () => (<HTMLImageElement>document.querySelector('.card-block__gallery-item').children[0]).src,
  );
  const spec = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('.card-block__specific-col'),
      (element) =>
        element.textContent.replace('?', '').replace('\n', '').trim(),
    ),
  );
  const specification = spec.join(' ');
  await browser.close();
  return {
    title,
    price,
    pfp,
    itemSource: Source.Telemart,
    type,
    specification,
    link: goodsLink,
  };
};
