import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '@shared/decorators';
import { RoleEnum } from '@shared/constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth(RoleEnum.ADMIN)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Auth(RoleEnum.ADMIN)
  @Put('admin/update/role')
  updateRoles(@Body() body: any) {
    return this.userService.updateRoles(body.user, body.permisions);
  }
}
