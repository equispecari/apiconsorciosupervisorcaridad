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
exports.TenantService = void 0;
const common_1 = require("@nestjs/common");
const tenant_repository_1 = require("./tenant.repository");
let TenantService = class TenantService {
    constructor(tenantRepository) {
        this.tenantRepository = tenantRepository;
    }
    create(createTenantDto) {
        return this.tenantRepository.create(createTenantDto);
    }
    findAll() {
        return this.tenantRepository.list();
    }
    findById(id) {
        return this.tenantRepository.getOne(id);
    }
    update(id, updateTenantDto) {
        return this.tenantRepository.update(id, updateTenantDto);
    }
    remove(id) {
        return this.tenantRepository.delete(id);
    }
    async getSede(tenantId) {
        const findOne = await this.tenantRepository.getByTenantId(tenantId);
        if (!findOne) {
            throw new common_1.BadRequestException('No existe este sede');
        }
        return findOne;
    }
    async getNumDocSede(tenantId) {
        const sede = await this.getSede(tenantId);
        sede.nro_doc += 1;
        await sede.save();
        return sede;
    }
    async getNumDocSedeNotSum(tenantId) {
        const sede = await this.getSede(tenantId);
        return sede;
    }
};
TenantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_repository_1.TenantRepository])
], TenantService);
exports.TenantService = TenantService;
//# sourceMappingURL=tenant.service.js.map