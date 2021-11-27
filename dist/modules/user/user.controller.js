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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const decorators_1 = require("../shared/decorators");
const constants_1 = require("../shared/constants");
const platform_express_1 = require("@nestjs/platform-express");
const interfaces_1 = require("../shared/interfaces");
const dto_1 = require("./dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    findAll() {
        return this.userService.findAll();
    }
    updateRoles(body) {
        return this.userService.updateRoles(body.id, body.role);
    }
    async updateInformation(user, update) {
        return await this.userService.updateInformation(user, update);
    }
    async uploadImg(user, file) {
        return await this.userService.uploadImg(user, file);
    }
    async getMyDocuments(user, querys) {
        return await this.userService.getMyDocuments(user, querys);
    }
};
__decorate([
    (0, decorators_1.Auth)(constants_1.RoleEnum.ADMIN),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Auth)(constants_1.RoleEnum.ADMIN),
    (0, common_1.Put)('changeRole'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateRoles", null);
__decorate([
    (0, common_1.Put)(''),
    (0, decorators_1.Auth)(constants_1.RoleEnum.ADMINISTRADOR, constants_1.RoleEnum.MODERATOR, constants_1.RoleEnum.USER, constants_1.RoleEnum.ADMIN),
    __param(0, (0, decorators_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.updateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateInformation", null);
__decorate([
    (0, common_1.Put)('uploadImg'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, decorators_1.Auth)(constants_1.RoleEnum.ADMINISTRADOR, constants_1.RoleEnum.MODERATOR, constants_1.RoleEnum.USER, constants_1.RoleEnum.ADMIN),
    __param(0, (0, decorators_1.User)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadImg", null);
__decorate([
    (0, common_1.Get)('getall'),
    (0, decorators_1.Auth)(constants_1.RoleEnum.ADMINISTRADOR, constants_1.RoleEnum.MODERATOR, constants_1.RoleEnum.ADMIN),
    __param(0, (0, decorators_1.User)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.QueryUsersDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMyDocuments", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map