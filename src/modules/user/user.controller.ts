import {
  Controller,
  Get,
  Body,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth, User } from '@shared/decorators';
import { RoleEnum } from '@shared/constants';
import { FileInterceptor } from '@nestjs/platform-express';
import { IFile, UserAuth } from '@shared/interfaces';
import { QueryUsersDto, updateUserDto, updateUserRoleDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth(RoleEnum.ADMIN)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Auth()
  @Get('permitions')
  findPermmitions(@User() user: UserAuth) {
    return this.userService.getPermisions(user);
  }

  @Auth(RoleEnum.ADMIN)
  @Put('admin/update/role')
  updateRoles(@Body() body: any) {
    return this.userService.updateRoles(body.user, body.permisions);
  }

  @Put('changeRole')
  @Auth(RoleEnum.MODERATOR, RoleEnum.ADMINISTRADOR)
  async changeAuth(@User() user: UserAuth, @Body() data: updateUserRoleDto) {
    return await this.userService.changeAuth(user, data);
  }

  @Put('')
  @Auth(RoleEnum.ADMINISTRADOR, RoleEnum.MODERATOR, RoleEnum.USER)
  async updateInformation(
    @User() user: UserAuth,
    @Body() update: updateUserDto,
  ) {
    return await this.userService.updateInformation(user, update);
  }

  @Put('uploadImg')
  @UseInterceptors(FileInterceptor('image'))
  @Auth(RoleEnum.ADMINISTRADOR, RoleEnum.MODERATOR, RoleEnum.USER)
  async uploadImg(@User() user: UserAuth, @UploadedFile() file: IFile) {
    return await this.userService.uploadImg(user, file);
  }

  @Get('getall')
  @Auth(RoleEnum.ADMINISTRADOR, RoleEnum.MODERATOR)
  async getMyDocuments(@User() user: UserAuth, @Query() querys: QueryUsersDto) {
    return await this.userService.getMyDocuments(user, querys);
  }
}
