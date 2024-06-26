"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const goods_schema_1 = require("../schemas/goods.schema");
const mongoose_2 = require("mongoose");
const rztkParser_1 = require("../utils/rztkParser");
const telemartParser_1 = require("../utils/telemartParser");
let GoodsService = class GoodsService {
    constructor(goodsModel) {
        this.goodsModel = goodsModel;
    }
    async findAll() {
        return await this.goodsModel.find().exec();
    }
    async addRztkGoods(goodsUrl) {
        try {
            const catalog = goodsUrl.goodsUrl;
            const items = await (0, rztkParser_1.rztkGetGoods)(catalog);
            for (const item of items) {
                const goods = await (0, rztkParser_1.parseRztkGoods)(item);
                const doc = new this.goodsModel(goods);
                await doc.save();
            }
        }
        catch (error) {
            throw new common_1.HttpException({
                error
            }, 400);
        }
        return await this.goodsModel.find({}).exec();
    }
    async addTelemartGoods(goodsUrl) {
        try {
            const catalog = goodsUrl.goodsUrl;
            const items = await (0, telemartParser_1.telemartGetGoods)(catalog);
            for (const item of items) {
                const goods = await (0, telemartParser_1.parseTelemartGoods)(item);
                const doc = new this.goodsModel(goods);
                await doc.save();
            }
        }
        catch (e) {
            throw new common_1.HttpException({
                e
            }, 400);
        }
        return await this.goodsModel.find({}).exec();
    }
};
exports.GoodsService = GoodsService;
exports.GoodsService = GoodsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(goods_schema_1.Goods.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GoodsService);
//# sourceMappingURL=goods.service.js.map