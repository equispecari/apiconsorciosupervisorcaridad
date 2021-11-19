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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../shared/constants");
const interfaces_1 = require("../shared/interfaces");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const mongoose_1 = require("@nestjs/mongoose");
const auth_entity_1 = require("./entities/auth.entity");
const mongoose_2 = require("mongoose");
const date_fns_1 = require("date-fns");
const nanoid_1 = require("nanoid");
const tenant_service_1 = require("../tenant/tenant.service");
const mail_service_1 = require("../mail/mail.service");
let AuthService = class AuthService {
    constructor(model, _jwtService, userService, tenantService, mailService) {
        this.model = model;
        this._jwtService = _jwtService;
        this.userService = userService;
        this.tenantService = tenantService;
        this.mailService = mailService;
        this.authAdmin = {
            email: 'admin@gmail.com',
            password: 'admin',
        };
    }
    async signinAdmin(signinDto) {
        const { email, password } = signinDto;
        if (email !== this.authAdmin.email ||
            password !== this.authAdmin.password) {
            throw new common_1.UnauthorizedException('Credenciales invalidas');
        }
        const token = this.generateToken({
            id: constants_1.RoleEnum.ADMIN,
            role: constants_1.RoleEnum.ADMIN,
            tenantId: constants_1.RoleEnum.ADMIN,
        });
        return Promise.resolve({ token });
    }
    async createUser(newUser) {
        const { email } = newUser;
        const findUser = await this.userService.findByEmail(email);
        if (findUser) {
            throw new common_1.BadRequestException('Ya existe un usuario con este Email');
        }
        const user = await this.userService.create(newUser);
        const token = this.generateToken({
            id: user._id,
            tenantId: user.tenant,
            role: user.role,
        });
        return { user, token };
    }
    async chooseRole(sede, userAuth) {
        const tenant = await this.tenantService.findById(sede);
        if (!tenant) {
            throw new common_1.UnauthorizedException('No esta autorizado');
        }
        const user = await this.userService.findOne(userAuth.id);
        if (!user) {
            throw new common_1.UnauthorizedException('No esta autorizado');
        }
        const token = this.generateToken({
            id: user._id,
            role: user.role,
            tenantId: tenant._id,
        });
        return {
            token,
            tenant,
        };
    }
    async renewToken(tokenAuth) {
        const payload = this._jwtService.decode(tokenAuth);
        if (!payload) {
            throw new common_1.BadRequestException('Token invalido');
        }
        const user = await this.userService.findOne(payload.id);
        if (!user) {
            throw new common_1.UnauthorizedException('No esta autorizado');
        }
        const tenant = await this.tenantService.findById(payload.tenantId);
        const token = this.generateToken({
            id: user._id,
            role: user.role,
            tenantId: user.role === constants_1.RoleEnum.ADMIN ? payload.tenantId : user.tenant,
        });
        return { token, user, tenant };
    }
    async signin(userSigninDto) {
        const { email, password } = userSigninDto;
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User no existe');
        }
        const isMatch = await this.userService.comparePasswords(password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('credenciales invalidas');
        }
        const token = this.generateToken({
            id: user._id,
            role: user.role,
            tenantId: user.tenant,
        });
        return { token, user };
    }
    generateToken(payload) {
        return this._jwtService.sign(payload);
    }
    async resetPassword(body) {
        const { token, password } = body;
        const findToken = await this.findOneOnTime(token);
        await this.userService.changePassword(findToken.id, password);
        await this.removeTokenByid(findToken._id);
        return true;
    }
    async resetPassSendMail(body) {
        const { email } = body;
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User no existe');
        }
        const token = (0, nanoid_1.nanoid)();
        await this.createReset(token, user._id);
        await this.mailService.resetPassword(token, email);
        return { message: `Revise su bandeja de entrada` };
    }
    async createReset(token, id) {
        const newReset = new this.model({ token, id });
        await newReset.save();
        return true;
    }
    async findOneOnTime(token) {
        const reset = await this.model.findOne({ token });
        if (!reset) {
            throw new common_1.BadRequestException('Token no valido');
        }
        const diferenciaMin = (0, date_fns_1.differenceInMinutes)(new Date(reset.create_at), new Date());
        if (diferenciaMin > 60 * 4) {
            await this.removeTokenByid(reset._id);
            throw new common_1.BadRequestException('Token no valido');
        }
        return reset;
    }
    async removeTokenByid(id) {
        await this.model.deleteMany({ _id: id });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(auth_entity_1.Auth.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        user_service_1.UserService,
        tenant_service_1.TenantService,
        mail_service_1.MailService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map