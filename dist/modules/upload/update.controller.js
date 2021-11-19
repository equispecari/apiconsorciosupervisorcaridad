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
exports.UpdateController = void 0;
const common_1 = require("@nestjs/common");
const upload_service_1 = require("./upload.service");
let UpdateController = class UpdateController {
    constructor(update) {
        this.update = update;
    }
    async findAll() {
        const { key } = await this.update.generateQrGrupPdf({
            DOC_ID: '555',
            asunto: 'prueba',
            codigo: 'test-1',
            email_remi: 'edu91325@gmail.com',
            fecha: '2021/12/21',
            folios: '15',
            nomenclatura: 'test-12',
            remitente: 'eduw',
            sede: 'prueba',
            sedeName: 'test',
            tipo: 'test',
        });
        return `https://consorciosupervisorcaridad.s3.us-east-2.amazonaws.com/${key}`;
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UpdateController.prototype, "findAll", null);
UpdateController = __decorate([
    (0, common_1.Controller)('update'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UpdateController);
exports.UpdateController = UpdateController;
//# sourceMappingURL=update.controller.js.map