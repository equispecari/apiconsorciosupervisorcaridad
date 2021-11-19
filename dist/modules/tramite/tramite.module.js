"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TramiteModule = void 0;
const common_1 = require("@nestjs/common");
const tramite_service_1 = require("./tramite.service");
const tramite_controller_1 = require("./tramite.controller");
const area_module_1 = require("../area/area.module");
const mongoose_1 = require("@nestjs/mongoose");
const schemas_1 = require("./schemas");
const constants_1 = require("../shared/constants");
const user_module_1 = require("../user/user.module");
const upload_module_1 = require("../upload/upload.module");
const mail_module_1 = require("../mail/mail.module");
const tenant_module_1 = require("../tenant/tenant.module");
let TramiteModule = class TramiteModule {
};
TramiteModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: constants_1.SchemaEnum.REQUEST, schema: schemas_1.RequestSchema },
            ]),
            area_module_1.AreaModule,
            user_module_1.UserModule,
            tenant_module_1.TenantModule,
            upload_module_1.UploadModule,
            mail_module_1.MailModule,
        ],
        controllers: [tramite_controller_1.TramiteController],
        providers: [tramite_service_1.TramiteService],
    })
], TramiteModule);
exports.TramiteModule = TramiteModule;
//# sourceMappingURL=tramite.module.js.map