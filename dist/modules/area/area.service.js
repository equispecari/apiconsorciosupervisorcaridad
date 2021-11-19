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
exports.AreaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const constants_1 = require("../shared/constants");
const mongoose_2 = require("@nestjs/mongoose");
const interfaces_1 = require("../shared/interfaces");
let AreaService = class AreaService {
    constructor(_model) {
        this._model = _model;
    }
    async getUserById(id, tenantId) {
        const findOne = await this._model.findOne({ _id: id, tenant: tenantId });
        if (!findOne) {
            throw new common_1.BadRequestException('No existe este area');
        }
        return findOne;
    }
    async getAll(userAuth) {
        const findAreas = await this._model.find({ tenant: userAuth.tenantId });
        return findAreas;
    }
    async create(userAuth, data) {
        const nuevo = new this._model(Object.assign(Object.assign({}, data), { tenant: userAuth.tenantId }));
        await nuevo.save();
        return nuevo;
    }
    async updateArea(userAuth, update, id) {
        const updated = await this._model.updateOne({ _id: id, tenant: userAuth.tenantId }, update);
    }
    async deleteArea(userAuth, id) {
        const deleted = await this._model.deleteOne({
            _id: id,
            tenant: userAuth.tenantId,
        });
    }
};
AreaService = __decorate([
    (0, common_1.Injectable)({}),
    __param(0, (0, mongoose_2.InjectModel)(constants_1.SchemaEnum.AREA)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], AreaService);
exports.AreaService = AreaService;
//# sourceMappingURL=area.service.js.map