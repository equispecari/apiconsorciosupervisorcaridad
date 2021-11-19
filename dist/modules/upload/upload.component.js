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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const uploadImg_dto_1 = require("./dto/uploadImg.dto");
const platform_express_1 = require("@nestjs/platform-express");
const upload_service_1 = require("./upload.service");
const constants_1 = require("../shared/constants");
const decorators_1 = require("../shared/decorators");
const interfaces_1 = require("../shared/interfaces");
let UploadController = class UploadController {
    constructor(_awsS3Service) {
        this._awsS3Service = _awsS3Service;
    }
    async startUpload(query) {
        let filetype = query.fileType || '';
        let fileName = query.fileName || '';
        const { uploadId } = await this._awsS3Service.startUpload(fileName.toString(), filetype.toString());
        return { uploadId };
    }
    async createTramite(query) {
        const { fileName, partNumber, uploadId } = query;
        const { presignedUrl } = await this._awsS3Service.getUploadUrl(fileName, partNumber, uploadId);
        return { presignedUrl };
    }
    async completeUpload(body) {
        const { fileName, parts, uploadId } = body;
        const { data } = await this._awsS3Service.completeUpload(fileName, parts, uploadId);
        return { data };
    }
    async pdfUpload(query, file) {
        let fileName = query.fileName || '';
        const isUpload = await this._awsS3Service.s3UploadPdf(file.buffer, fileName);
        if (!isUpload) {
            throw new common_1.InternalServerErrorException('Hubo un error al subir imagen');
        }
        return isUpload;
    }
};
__decorate([
    (0, common_1.Get)('start-upload'),
    (0, decorators_1.Auth)(constants_1.RoleEnum.ADMINISTRADOR, constants_1.RoleEnum.MODERATOR, constants_1.RoleEnum.USER, constants_1.RoleEnum.ADMIN),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "startUpload", null);
__decorate([
    (0, common_1.Get)('get-upload-url'),
    (0, decorators_1.Auth)(constants_1.RoleEnum.ADMINISTRADOR, constants_1.RoleEnum.MODERATOR, constants_1.RoleEnum.USER, constants_1.RoleEnum.ADMIN),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "createTramite", null);
__decorate([
    (0, common_1.Post)('complete-upload'),
    (0, decorators_1.Auth)(constants_1.RoleEnum.ADMINISTRADOR, constants_1.RoleEnum.MODERATOR, constants_1.RoleEnum.USER, constants_1.RoleEnum.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [uploadImg_dto_1.UploadBodyPresigned]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "completeUpload", null);
__decorate([
    (0, common_1.Put)('pdf-upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, decorators_1.Auth)(constants_1.RoleEnum.ADMINISTRADOR, constants_1.RoleEnum.MODERATOR, constants_1.RoleEnum.USER, constants_1.RoleEnum.ADMIN),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "pdfUpload", null);
UploadController = __decorate([
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
exports.UploadController = UploadController;
//# sourceMappingURL=upload.component.js.map