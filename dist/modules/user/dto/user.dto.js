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
exports.updateUserRoleDto = exports.updateUserDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let updateUserDto = class updateUserDto {
};
__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], updateUserDto.prototype, "idCard", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], updateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], updateUserDto.prototype, "lastname", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], updateUserDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], updateUserDto.prototype, "departamento", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], updateUserDto.prototype, "provincia", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], updateUserDto.prototype, "distrito", void 0);
__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], updateUserDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], updateUserDto.prototype, "email", void 0);
updateUserDto = __decorate([
    (0, class_transformer_1.Exclude)()
], updateUserDto);
exports.updateUserDto = updateUserDto;
let updateUserRoleDto = class updateUserRoleDto {
};
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], updateUserRoleDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], updateUserRoleDto.prototype, "role", void 0);
updateUserRoleDto = __decorate([
    (0, class_transformer_1.Exclude)()
], updateUserRoleDto);
exports.updateUserRoleDto = updateUserRoleDto;
//# sourceMappingURL=user.dto.js.map