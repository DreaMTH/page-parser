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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodsSchema = exports.Goods = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const goodsDto_1 = require("../dto/goodsDto");
let Goods = class Goods {
};
exports.Goods = Goods;
__decorate([
    (0, mongoose_1.Prop)({ required: true, max: 256 }),
    __metadata("design:type", String)
], Goods.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ max: 256 }),
    __metadata("design:type", String)
], Goods.prototype, "subtitle", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Goods.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Goods.prototype, "specification", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Goods.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, min: 0 }),
    __metadata("design:type", Number)
], Goods.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Goods.prototype, "pfp", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['ROZETKA', 'TELEMART']
    }),
    __metadata("design:type", String)
], Goods.prototype, "itemSource", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Goods.prototype, "link", void 0);
exports.Goods = Goods = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Goods);
exports.GoodsSchema = mongoose_1.SchemaFactory.createForClass(Goods);
//# sourceMappingURL=goods.schema.js.map