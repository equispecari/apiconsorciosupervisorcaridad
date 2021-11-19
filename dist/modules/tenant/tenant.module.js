"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantModule = void 0;
const common_1 = require("@nestjs/common");
const tenant_service_1 = require("./tenant.service");
const tenant_controller_1 = require("./tenant.controller");
const mongoose_1 = require("@nestjs/mongoose");
const tenant_entity_1 = require("./entities/tenant.entity");
const tenant_repository_1 = require("./tenant.repository");
let TenantModule = class TenantModule {
};
TenantModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: tenant_entity_1.Tenant.name, schema: tenant_entity_1.TenantSchema }]),
        ],
        controllers: [tenant_controller_1.TenantController],
        providers: [tenant_service_1.TenantService, tenant_repository_1.TenantRepository],
        exports: [tenant_service_1.TenantService],
    })
], TenantModule);
exports.TenantModule = TenantModule;
//# sourceMappingURL=tenant.module.js.map