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
exports.TramiteService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const constants_1 = require("../shared/constants");
const upload_service_1 = require("../upload/upload.service");
const interfaces_1 = require("../shared/interfaces");
let TramiteService = class TramiteService {
    constructor(_model, _awsS3Service) {
        this._model = _model;
        this._awsS3Service = _awsS3Service;
    }
    async getDocById(userAuth, id) {
        const findOne = await this._model
            .findOne({ _id: id, tenant: userAuth.tenantId })
            .populate('owner');
        if (!findOne) {
            throw new common_1.BadRequestException('No existe este documento');
        }
        return findOne;
    }
    async getUDocById(id) {
        const findOne = await this._model.findById(id);
        if (!findOne) {
            throw new common_1.BadRequestException('No existe este documento');
        }
        return findOne;
    }
    async getDocByNro(num_serie) {
        const findOne = await this._model.findOne({ num_serie }).populate('data');
        if (!findOne) {
            throw new common_1.BadRequestException('No existe este documento');
        }
        return findOne;
    }
    async create(data) {
        const nuevo = new this._model(data);
        return nuevo;
    }
    async getDocuments(query = {}, skip, limit) {
        const findOne = await this._model
            .find(query)
            .sort({ created_at: -1 })
            .skip(skip || 0)
            .limit(limit || 5)
            .populate('owner', 'name lastname')
            .populate('data');
        return findOne;
    }
    async getTotalDocuments(query = {}) {
        const findOne = await this._model.countDocuments(query);
        return findOne;
    }
};
TramiteService = __decorate([
    (0, common_1.Injectable)({}),
    __param(0, (0, mongoose_2.InjectModel)(constants_1.SchemaEnum.REQUEST)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        upload_service_1.UploadService])
], TramiteService);
exports.TramiteService = TramiteService;
//# sourceMappingURL=tramite.service.js.map