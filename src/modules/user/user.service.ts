import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { compare, hash, genSalt } from 'bcryptjs';
import { UserPermistions } from '@shared/interfaces';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
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
}
