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
exports.TramiteController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const area_service_1 = require("../area/area.service");
const tenant_service_1 = require("../tenant/tenant.service");
const lodash_1 = require("lodash");
const moment = require('moment-timezone');
const hours_of_attention_1 = require("../shared/utils/hours-of-attention");
const upload_service_1 = require("../upload/upload.service");
const mail_service_1 = require("../mail/mail.service");
const decorators_1 = require("../shared/decorators");
const constants_1 = require("../shared/constants");
const user_service_1 = require("../user/user.service");
const interfaces_1 = require("../shared/interfaces");
const tramite_service_1 = require("./tramite.service");
let TramiteController = class TramiteController {
    constructor(_userService, _reqDocService, _awsS3Service, _incrementService, _nodemailder, _areaService) {
        this._userService = _userService;
        this._reqDocService = _reqDocService;
        this._awsS3Service = _awsS3Service;
        this._incrementService = _incrementService;
        this._nodemailder = _nodemailder;
        this._areaService = _areaService;
    }
    async createTramite(userAuth, create) {
        const inc = await this._incrementService.getNumDocSede(userAuth.tenantId);
        const num_serie = inc.name.toUpperCase().trim() +
            '-' +
            (0, lodash_1.repeat)('0', 3 - inc.nro_doc.toString().length) +
            inc.nro_doc;
        const user = await this._userService.getUserById(userAuth.id);
        const dateReception = hours_of_attention_1.HoursOfAttention.getNewHour(inc.horario);
        const reqDoc = await this._reqDocService.create({
            data: create,
            num_serie,
            owner: user._id,
            tenant: userAuth.tenantId,
        });
        if (user.type === constants_1.UserTypeEnum.JURIDICA)
            user.lastname = '';
        const { key } = await this._awsS3Service.generateQrGrupPdf({
            codigo: num_serie,
            DOC_ID: user.idCard,
            fecha: dateReception,
            remitente: user.name + ' ' + user.lastname,
            tipo: reqDoc.data.tipoDoc,
            asunto: reqDoc.data.asunto,
            folios: reqDoc.data.folios,
            email_remi: user.email,
            nomenclatura: reqDoc.data.nomenclatura,
            sede: inc.name,
            sedeName: inc.longName,
        });
        this._nodemailder.registerDocument(user.email, num_serie, key);
        reqDoc.pdf = key;
        await reqDoc.save();
        return { message: reqDoc };
    }
    async updateTramite(userAuth, update, id) {
        const reqDoc = await this._reqDocService.getUDocById(id);
        if (reqDoc.estado !== constants_1.StateEnum.OBSERVAR) {
            throw new common_1.BadRequestException('El documento ya fue derivado o rechazado');
        }
        const user = await this._userService.getUserById(userAuth.id);
        reqDoc.estado = constants_1.StateEnum.MODIFICADO;
        const momentUtc = moment().utc().toDate();
        reqDoc.modified_at.push(momentUtc);
        reqDoc.data = update;
        const inc = await this._incrementService.getNumDocSedeNotSum(userAuth.tenantId);
        const dateReception = hours_of_attention_1.HoursOfAttention.getNewHour(inc.horario);
        const { key } = await this._awsS3Service.generateQrGrupPdf({
            codigo: reqDoc.num_serie,
            DOC_ID: user.idCard,
            fecha: dateReception,
            remitente: user.name + ' ' + user.lastname,
            tipo: update.tipoDoc,
            asunto: update.asunto,
            folios: update.folios,
            email_remi: user.email,
            nomenclatura: update.nomenclatura,
            sede: inc.name,
            sedeName: inc.longName,
        });
        reqDoc.pdf = key;
        await reqDoc.save();
        return { message: 'updated' };
    }
    async deleteUploadObj(key) {
        this._awsS3Service.deleteS3Object(key);
        return { message: 'eliminado' };
    }
    async deribaTramite(userAuth, data) {
        const { areaId, docId } = data;
        const reqDoc = await this._reqDocService.getDocById(userAuth, docId);
        reqDoc.area.push({
            admin: userAuth.id,
            area: areaId,
            in_area_at: moment(Date.now()).tz('America/Lima').format('DD/MM/YYYY'),
        });
        reqDoc.estado = constants_1.StateEnum.DERIVAR;
        const area = await this._areaService.getUserById(areaId, userAuth.tenantId);
        this._nodemailder.deribarDoc({ email: area.email, encargado: area.encargado }, reqDoc.data);
        await reqDoc.save();
        return { message: reqDoc };
    }
    async observarTramite(userAuth, data) {
        const { observaciones, docId } = data;
        const reqDoc = await this._reqDocService.getDocById(userAuth, docId);
        if (reqDoc.estado === constants_1.StateEnum.DERIVAR) {
            throw new common_1.BadRequestException('El documento ya fue derivado');
        }
        reqDoc.observacionesRecep.push({
            admin: userAuth.id,
            description: observaciones,
            observed_at: moment(Date.now()).tz('America/Lima').format('DD/MM/YYYY'),
        });
        reqDoc.estado = constants_1.StateEnum.OBSERVAR;
        await reqDoc.save();
        return { message: reqDoc };
    }
    async rechazarTramite(userAuth, data) {
        const { docId } = data;
        const reqDoc = await this._reqDocService.getDocById(userAuth, docId);
        if (reqDoc.estado === constants_1.StateEnum.DERIVAR) {
            throw new common_1.BadRequestException('El documento ya fue derivado');
        }
        reqDoc.estado = constants_1.StateEnum.RECHAZADO;
        reqDoc.rechazado.push({ rechazadoPor: userAuth.id });
        await reqDoc.save();
        return { message: reqDoc };
    }
    async getDocuments(userAuth, querys) {
        const { limit, query, skip } = querys;
        let nQuery = {
            tenant: userAuth.tenantId,
        };
        if (query === constants_1.StateEnum.DERIVAR ||
            query === constants_1.StateEnum.OBSERVAR ||
            query === constants_1.StateEnum.MODIFICADO ||
            query === constants_1.StateEnum.RECHAZADO ||
            query === constants_1.StateEnum.PENDIENTE) {
            nQuery.estado = query;
        }
        const reqDoc = await this._reqDocService.getDocuments(nQuery, Number(skip), Number(limit));
        const total = await this._reqDocService.getTotalDocuments(nQuery);
        return { data: reqDoc, total };
    }
    async getMyDocuments(userAuth, querys) {
        const { limit, query, skip } = querys;
        let nQuery = {
            owner: userAuth.id,
            tenant: userAuth.tenantId,
        };
        if (query === constants_1.StateEnum.DERIVAR ||
            query === constants_1.StateEnum.OBSERVAR ||
            query === constants_1.StateEnum.MODIFICADO ||
            query === constants_1.StateEnum.RECHAZADO ||
            query === constants_1.StateEnum.PENDIENTE) {
            nQuery.estado = query;
        }
        const reqDoc = await this._reqDocService.getDocuments(nQuery, Number(skip), Number(limit));
        const total = await this._reqDocService.getTotalDocuments(nQuery);
        return { data: reqDoc, total };
    }
    async getDocumentByNro(param) {
        const { num_serie } = param;
        const reqDoc = await this._reqDocService.getDocByNro(num_serie);
        return { message: reqDoc };
    }
    async getDocumentById(userAuth, param) {
        const { id } = param;
        const reqDoc = await this._reqDocService.getDocById(userAuth, id);
        return { message: reqDoc };
    }
};
__decorate([
    (0, common_1.Post)('create'),
    (0, decorators_1.Auth)(constants_1.RoleEnum.ADMINISTRADOR, constants_1.RoleEnum.MODERATOR, constants_1.RoleEnum.USER, constants_1.RoleEnum.ADMIN),
    __param(0, (0, decorators_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreateReqInfoDto]),
    __metadata("design:returntype", Promise)
], TramiteController.prototype, "createTramite", null);
__decorate([
    (0, common_1.Post)('update/:id'),
    (0, decorators_1.Auth)(constants_1.RoleEnum.ADMINISTRADOR, constants_1.RoleEnum.MODERATOR, constants_1.RoleEnum.USER, constants_1.RoleEnum.ADMIN),
    __param(0, (0, decorators_1.User)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateReqInfoDto, String]),
    __metadata("design:returntype", Promise)
], TramiteController.prototype, "updateTramite", null);
__decorate([
    (0, common_1.Put)('delete/object'),
    (0, decorators_1.Auth)(constants_1.RoleEnum.ADMINISTRADOR, constants_1.RoleEnum.MODERATOR, constants_1.RoleEnum.USER, constants_1.RoleEnum.ADMIN),
    __param(0, (0, common_1.Body)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TramiteController.prototype, "deleteUploadObj", null);
__decorate([
    (0, common_1.Put)('deribar'),
    (0, decorators_1.Auth)(constants_1.RoleEnum.ADMINISTRADOR, constants_1.RoleEnum.MODERATOR, constants_1.RoleEnum.ADMIN),
    __param(0, (0, decorators_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.DerivarReqDto]),
    __metadata("design:returntype", Promise)
], TramiteController.prototype, "deribaTramite", null);
__decorate([
    (0, common_1.Put)('observar'),
    (0, decorators_1.Auth)(constants_1.RoleEnum.ADMINISTRADOR, constants_1.RoleEnum.MODERATOR, constants_1.RoleEnum.ADMIN),
    __param(0, (0, decorators_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.ObservacionesReqDto]),
    __metadata("design:returntype", Promise)
], TramiteController.prototype, "observarTramite", null);
__decorate([
    (0, common_1.Put)('rechazar'),
    (0, decorators_1.Auth)(constants_1.RoleEnum.ADMINISTRADOR, constants_1.RoleEnum.MODERATOR, constants_1.RoleEnum.ADMIN),
    __param(0, (0, decorators_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.RechazadoReqDto]),
    __metadata("design:returntype", Promise)
], TramiteController.prototype, "rechazarTramite", null);
__decorate([
    (0, common_1.Get)('documents'),
    (0, decorators_1.Auth)(constants_1.RoleEnum.ADMINISTRADOR, constants_1.RoleEnum.MODERATOR, constants_1.RoleEnum.ADMIN),
    __param(0, (0, decorators_1.User)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.QuerysReqDto]),
    __metadata("design:returntype", Promise)
], TramiteController.prototype, "getDocuments", null);
__decorate([
    (0, common_1.Get)('mydocuments'),
    (0, decorators_1.Auth)(constants_1.RoleEnum.ADMINISTRADOR, constants_1.RoleEnum.MODERATOR, constants_1.RoleEnum.USER, constants_1.RoleEnum.ADMIN),
    __param(0, (0, decorators_1.User)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.QuerysReqDto]),
    __metadata("design:returntype", Promise)
], TramiteController.prototype, "getMyDocuments", null);
__decorate([
    (0, common_1.Get)('document/serie/:num_serie'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TramiteController.prototype, "getDocumentByNro", null);
__decorate([
    (0, common_1.Get)('document/:id'),
    (0, decorators_1.Auth)(constants_1.RoleEnum.ADMINISTRADOR, constants_1.RoleEnum.MODERATOR, constants_1.RoleEnum.USER, constants_1.RoleEnum.ADMIN),
    __param(0, (0, decorators_1.User)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.idReqDto]),
    __metadata("design:returntype", Promise)
], TramiteController.prototype, "getDocumentById", null);
TramiteController = __decorate([
    (0, common_1.Controller)('tramite'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        tramite_service_1.TramiteService,
        upload_service_1.UploadService,
        tenant_service_1.TenantService,
        mail_service_1.MailService,
        area_service_1.AreaService])
], TramiteController);
exports.TramiteController = TramiteController;
//# sourceMappingURL=tramite.controller.js.map