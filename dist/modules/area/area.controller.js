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
exports.AreaController = void 0;
const common_1 = require("@nestjs/common");
const area_dto_1 = require("./dto/area.dto");
const constants_1 = require("../shared/constants");
const area_service_1 = require("./area.service");
const decorators_1 = require("../shared/decorators");
const interfaces_1 = require("../shared/interfaces");
let AreaController = class AreaController {
    constructor(_areaService) {
        this._areaService = _areaService;
    }
    async creaTramite(userAuth, data) {
        const nuevo = await this._areaService.create(userAuth, data);
        return { message: nuevo };
    }
    async updateTramite(userAuth, data, id) {
        await this._areaService.updateArea(userAuth, data, id);
        return { message: 'Datos actualizados' };
    }
    async deleteTramite(userAuth, id) {
        await this._areaService.deleteArea(userAuth, id);
        return { message: 'Se elimino correctamente' };
    }
    async getMyDocuments(userAuth) {
        return await this._areaService.getAll(userAuth);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    (0, decorators_1.Auth)(constants_1.RoleEnum.ADMINISTRADOR, constants_1.RoleEnum.MODERATOR, constants_1.RoleEnum.ADMIN),
    __param(0, (0, decorators_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, area_dto_1.CreateAreaDto]),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "creaTramite", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, decorators_1.Auth)(constants_1.RoleEnum.ADMINISTRADOR, constants_1.RoleEnum.MODERATOR, constants_1.RoleEnum.ADMIN),
    __param(0, (0, decorators_1.User)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, area_dto_1.CreateAreaDto, String]),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "updateTramite", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorators_1.Auth)(constants_1.RoleEnum.ADMINISTRADOR, constants_1.RoleEnum.MODERATOR, constants_1.RoleEnum.ADMIN),
    __param(0, (0, decorators_1.User)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "deleteTramite", null);
__decorate([
    (0, common_1.Get)('getall'),
    (0, decorators_1.Auth)(constants_1.RoleEnum.ADMINISTRADOR, constants_1.RoleEnum.MODERATOR, constants_1.RoleEnum.ADMIN),
    __param(0, (0, decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "getMyDocuments", null);
AreaController = __decorate([
    (0, common_1.Controller)('area'),
    __metadata("design:paramtypes", [area_service_1.AreaService])
], AreaController);
exports.AreaController = AreaController;
//# sourceMappingURL=area.controller.js.map