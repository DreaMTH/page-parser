"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRztkGoods = exports.rztkGetGoods = void 0;
const puppeteer_1 = require("puppeteer");
const goodsDto_1 = require("../dto/goodsDto");
const rztkGetGoods = async (path) => {
    const browser = await puppeteer_1.default.launch({});
    const page = await browser.newPage();
    await page.goto(path);
    const goods = await page.evaluate(() => Array.from(document.querySelectorAll('.product-link'), (element) => element.href));
    const uniqueGoods = new Set(goods);
    await browser.close();
    return Array.from(uniqueGoods);
};
exports.rztkGetGoods = rztkGetGoods;
const parseRztkGoods = async (goodsLink) => {
    const browser = await puppeteer_1.default.launch({});
    const page = await browser.newPage();
    await page.goto(goodsLink);
    const title = await page.evaluate(() => document.querySelector('.title').textContent);
    let description;
    try {
        description = await page.evaluate(() => document.querySelector('.product-about__description-content').textContent);
    }
    catch (e) {
        description = 'No description';
    }
    let itemPrice = await page.evaluate(() => document.querySelector('.product-price__big').textContent);
    const price = Number.parseInt(itemPrice.replace(/\s+/g, '').slice(0, -1).trim());
    const type = await page.evaluate(() => document
        .querySelector(".breadcrumbs .ng-star-inserted")
        .textContent.slice(0, -1));
    const pfp = await page.evaluate(() => document.querySelectorAll(".picture-container__picture")[0].src);
    await page.goto(`${goodsLink}/characteristics/`);
    const specification = await page.evaluate(() => document
        .querySelector(".product-tabs__content")
        .textContent.replace(/(?=\p{Lu}\p{Ll}+)/gu, " "));
    await browser.close();
    return {
        title,
        description,
        price,
        pfp,
        itemSource: goodsDto_1.Source.Rozetka,
        type,
        specification,
        link: goodsLink
    };
};
exports.parseRztkGoods = parseRztkGoods;
//# sourceMappingURL=rztkParser.js.map