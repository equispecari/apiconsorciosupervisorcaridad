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
exports.TenantSchema = exports.Tenant = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Tenant = class Tenant {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Tenant.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Tenant.prototype, "longName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Tenant.prototype, "nro_doc", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        0: {
            active: { type: Boolean, default: false },
            inicio: { type: String, default: '08:30:00' },
            fin: { type: String, default: '13:00:00' },
        },
        1: {
            active: { type: Boolean, default: true },
            inicio: { type: String, default: '08:30:00' },
            fin: { type: String, default: '17:30:00' },
        },
        2: {
            active: { type: Boolean, default: true },
            inicio: { type: String, default: '08:30:00' },
            fin: { type: String, default: '17:30:00' },
        },
        3: {
            active: { type: Boolean, default: true },
            inicio: { type: String, default: '08:30:00' },
            fin: { type: String, default: '17:30:00' },
        },
        4: {
            active: { type: Boolean, default: true },
            inicio: { type: String, default: '08:30:00' },
            fin: { type: String, default: '17:30:00' },
        },
        5: {
            active: { type: Boolean, default: true },
            inicio: { type: String, default: '08:30:00' },
            fin: { type: String, default: '17:30:00' },
        },
        6: {
            active: { type: Boolean, default: true },
            inicio: { type: String, default: '08:30:00' },
            fin: { type: String, default: '13:00:00' },
        },
    })),
    __metadata("design:type", Object)
], Tenant.prototype, "horario", void 0);
Tenant = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], Tenant);
exports.Tenant = Tenant;
exports.TenantSchema = mongoose_1.SchemaFactory.createForClass(Tenant);
exports.TenantSchema.methods.toJSON = function () {
    const tenant = this;
    return { _id: tenant._id, name: tenant.name, longName: tenant.longName };
};
//# sourceMappingURL=tenant.entity.js.map