import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { compare, hash, genSalt } from 'bcryptjs';
import { IFile, UserAuth, UserPermistions } from '@shared/interfaces';
import { QueryUsersDto, updateUserDto, updateUserRoleDto } from './dto';
import { UploadService } from '../upload/upload.service';
const randomstring = require('randomstring');

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly uploadService: UploadService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.encryptPassword(createUserDto.password);
    return await this.userRepository.create(createUserDto);
  }

  findAll() {
    return this.userRepository.list();
  }

  async updateRoles(id: string, permisions: UserPermistions[]) {
    return await this.userRepository.update(id, { permisions });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async findOne(id: string) {
    return await this.userRepository.getOne(id);
  }

  async changePassword(id: string, newPassword: string) {
    const user = await this.userRepository.getOne(id);

    if (!user) {
      throw new BadRequestException('User not found');
    }
    const password = await this.encryptPassword(newPassword);

    await this.userRepository.update(id, { password });
  }

  async comparePasswords(password: string, userPassword: string) {
    return await compare(password, userPassword);
  }

  private async encryptPassword(password: string) {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }

  

  async updateInformation(user: UserAuth, update: updateUserDto) {
    return await this.userRepository.update(user.id, update);
  }

  async uploadImg(user: UserAuth, file: IFile) {
    const key = await this.upLoadImage(user.id, file.buffer, file.originalname);

    return { message: key, statusCode: 200 };
  }


  async upLoadImage(
    id: string,
    buffer: Buffer,
    originalname: string,
  ): Promise<string> {
    const isImage = this.uploadService.checkImg(originalname);

    const user = await this.userRepository.getOne(id);

    if (!isImage) {
      throw new BadRequestException('Suba una imagen.');
    }
    const afterDot = originalname.split('.').pop();

    const key = `user/${randomstring.generate({
      length: 10,
      charset: 'numeric',
    })}.${afterDot}`;

    const upload = await this.uploadService.upLoadS3Object(buffer, key);
    if (!upload) {
      throw new BadRequestException('No se pudo subir imagen.');
    }

    if (user.img) {
      this.uploadService.deleteS3Object(user.img);
    }
    user.img = key;
    await user.save();

    return key;
  }

  async getMyDocuments(user: UserAuth, querys: QueryUsersDto) {
    const { limit, skip } = querys;

    const users = await this.userRepository.getUsers(
      user.tenantId,
      +skip,
      +limit,
    );
    const total = await this.userRepository.getTotalUsers(user.tenantId);

    return { data: users, total };
  }

  async getUserById(id: string) {
    const findUser = await this.findOne(id);

    if (!findUser) {
      throw new BadRequestException('No existe este usuario');
    }

    return findUser;
  }
}
