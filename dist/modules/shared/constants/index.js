"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaEnum = exports.ProviderEnum = exports.StateEnum = exports.UserTypeEnum = exports.RoleEnum = void 0;
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["ADMIN"] = "ADMIN";
    RoleEnum["MODERATOR"] = "MODERATOR";
    RoleEnum["ADMINISTRADOR"] = "ADMINISTRADOR";
    RoleEnum["USER"] = "USER";
})(RoleEnum = exports.RoleEnum || (exports.RoleEnum = {}));
var UserTypeEnum;
(function (UserTypeEnum) {
    UserTypeEnum["NATURAL"] = "NATURAL";
    UserTypeEnum["JURIDICA"] = "JURIDICA";
})(UserTypeEnum = exports.UserTypeEnum || (exports.UserTypeEnum = {}));
var StateEnum;
(function (StateEnum) {
    StateEnum["PENDIENTE"] = "PENDIENTE";
    StateEnum["DERIVAR"] = "DERIVAR";
    StateEnum["OBSERVAR"] = "OBSERVAR";
    StateEnum["MODIFICADO"] = "MODIFICADO";
    StateEnum["RECHAZADO"] = "RECHAZADO";
})(StateEnum = exports.StateEnum || (exports.StateEnum = {}));
var ProviderEnum;
(function (ProviderEnum) {
    ProviderEnum["DATABASE_CONNECTION"] = "DATABASE_CONNECTION";
    ProviderEnum["TENANT_CONNECTION"] = "TENANT_CONNECTION";
})(ProviderEnum = exports.ProviderEnum || (exports.ProviderEnum = {}));
var SchemaEnum;
(function (SchemaEnum) {
    SchemaEnum["SEDE"] = "Increment";
    SchemaEnum["USER"] = "User";
    SchemaEnum["AREA"] = "Area";
    SchemaEnum["REQUEST"] = "Request";
    SchemaEnum["DATA_REQUEST"] = "DataRequest";
    SchemaEnum["RESET_PASS"] = "ResetPasswordToken";
})(SchemaEnum = exports.SchemaEnum || (exports.SchemaEnum = {}));
//# sourceMappingURL=index.js.map