"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTelemartGoods = exports.telemartGetGoods = void 0;
const puppeteer_1 = require("puppeteer");
const goodsDto_1 = require("../dto/goodsDto");
const telemartGetGoods = async (path) => {
    const browser = await puppeteer_1.default.launch({});
    const page = await browser.newPage();
    await page.goto(path);
    const goods = await page.evaluate(() => Array.from(document.querySelectorAll('.product-item__title'), (element) => element.children[0].href));
    await browser.close();
    return goods;
};
exports.telemartGetGoods = telemartGetGoods;
const parseTelemartGoods = async (goodsLink) => {
    const browser = await puppeteer_1.default.launch({});
    const page = await browser.newPage();
    await page.goto(goodsLink);
    const title = await page.evaluate(() => document.querySelector('.card-block__title').textContent);
    let price;
    try {
        price = await page.evaluate(() => document.querySelector('.card-block__price-summ').textContent);
        price = Number.parseInt(price.replace(' ', '').slice(0, -1).trim());
    }
    catch (e) {
        price = 0;
    }
    const types = await page.evaluate(() => Array.from(document.querySelectorAll('.breadcrumb-item'), (element) => element.textContent));
    const type = types.join(' ');
    const pfp = await page.evaluate(() => document.querySelector('.card-block__gallery-item').children[0].src);
    const spec = await page.evaluate(() => Array.from(document.querySelectorAll('.card-block__specific-col'), (element) => element.textContent.replace('?', '').replace('\n', '').trim()));
    const specification = spec.join(' ');
    await browser.close();
    return {
        title,
        price,
        pfp,
        itemSource: goodsDto_1.Source.Telemart,
        type,
        specification,
        link: goodsLink,
    };
};
exports.parseTelemartGoods = parseTelemartGoods;
//# sourceMappingURL=telemartParser.js.map