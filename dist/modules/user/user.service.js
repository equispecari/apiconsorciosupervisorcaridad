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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
const bcryptjs_1 = require("bcryptjs");
const interfaces_1 = require("../shared/interfaces");
const upload_service_1 = require("../upload/upload.service");
const randomstring = require('randomstring');
let UserService = class UserService {
    constructor(userRepository, uploadService) {
        this.userRepository = userRepository;
        this.uploadService = uploadService;
    }
    async create(createUserDto) {
        createUserDto.password = await this.encryptPassword(createUserDto.password);
        return await this.userRepository.create(createUserDto);
    }
    findAll() {
        return this.userRepository.list();
    }
    async updateRoles(id, permisions) {
        return await this.userRepository.update(id, { permisions });
    }
    async findByEmail(email) {
        return await this.userRepository.findByEmail(email);
    }
    async findOne(id) {
        return await this.userRepository.getOne(id);
    }
    async changePassword(id, newPassword) {
        const user = await this.userRepository.getOne(id);
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const password = await this.encryptPassword(newPassword);
        await this.userRepository.update(id, { password });
    }
    async comparePasswords(password, userPassword) {
        return await (0, bcryptjs_1.compare)(password, userPassword);
    }
    async encryptPassword(password) {
        const salt = await (0, bcryptjs_1.genSalt)(10);
        return await (0, bcryptjs_1.hash)(password, salt);
    }
    async updateInformation(user, update) {
        return await this.userRepository.update(user.id, update);
    }
    async uploadImg(user, file) {
        const key = await this.upLoadImage(user.id, file.buffer, file.originalname);
        return { message: key, statusCode: 200 };
    }
    async upLoadImage(id, buffer, originalname) {
        const isImage = this.uploadService.checkImg(originalname);
        const user = await this.userRepository.getOne(id);
        if (!isImage) {
            throw new common_1.BadRequestException('Suba una imagen.');
        }
        const afterDot = originalname.split('.').pop();
        const key = `user/${randomstring.generate({
            length: 10,
            charset: 'numeric',
        })}.${afterDot}`;
        const upload = await this.uploadService.upLoadS3Object(buffer, key);
        if (!upload) {
            throw new common_1.BadRequestException('No se pudo subir imagen.');
        }
        if (user.img) {
            this.uploadService.deleteS3Object(user.img);
        }
        user.img = key;
        await user.save();
        return key;
    }
    async getMyDocuments(user, querys) {
        const { limit, skip } = querys;
        const users = await this.userRepository.getUsers(user.tenantId, +skip, +limit);
        const total = await this.userRepository.getTotalUsers(user.tenantId);
        return { data: users, total };
    }
    async getUserById(id) {
        const findUser = await this.findOne(id);
        if (!findUser) {
            throw new common_1.BadRequestException('No existe este usuario');
        }
        return findUser;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        upload_service_1.UploadService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map