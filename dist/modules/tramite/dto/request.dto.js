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
exports.idReqDto = exports.QueryUsersDto = exports.QuerysReqDto = exports.RechazadoReqDto = exports.ObservacionesReqDto = exports.DerivarReqDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let DerivarReqDto = class DerivarReqDto {
};
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DerivarReqDto.prototype, "docId", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DerivarReqDto.prototype, "areaId", void 0);
DerivarReqDto = __decorate([
    (0, class_transformer_1.Exclude)()
], DerivarReqDto);
exports.DerivarReqDto = DerivarReqDto;
let ObservacionesReqDto = class ObservacionesReqDto {
};
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ObservacionesReqDto.prototype, "docId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ObservacionesReqDto.prototype, "observaciones", void 0);
ObservacionesReqDto = __decorate([
    (0, class_transformer_1.Exclude)()
], ObservacionesReqDto);
exports.ObservacionesReqDto = ObservacionesReqDto;
let RechazadoReqDto = class RechazadoReqDto {
};
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RechazadoReqDto.prototype, "docId", void 0);
RechazadoReqDto = __decorate([
    (0, class_transformer_1.Exclude)()
], RechazadoReqDto);
exports.RechazadoReqDto = RechazadoReqDto;
class QuerysReqDto {
}
exports.QuerysReqDto = QuerysReqDto;
class QueryUsersDto {
}
exports.QueryUsersDto = QueryUsersDto;
class idReqDto {
}
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], idReqDto.prototype, "id", void 0);
exports.idReqDto = idReqDto;
//# sourceMappingURL=request.dto.js.map