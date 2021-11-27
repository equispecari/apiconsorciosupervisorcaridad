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
import { QueryUsersDto, updateUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth(RoleEnum.ADMIN)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Auth(RoleEnum.ADMIN)
  @Put('changeRole')
  updateRoles(@Body() body: any) {
    return this.userService.updateRoles(body.id, body.role);
  }

  @Put('')
  @Auth(
    RoleEnum.ADMINISTRADOR,
    RoleEnum.MODERATOR,
    RoleEnum.USER,
    RoleEnum.ADMIN,
  )
  async updateInformation(
    @User() user: UserAuth,
    @Body() update: updateUserDto,
  ) {
    return await this.userService.updateInformation(user, update);
  }

  @Put('uploadImg')
  @UseInterceptors(FileInterceptor('image'))
  @Auth(
    RoleEnum.ADMINISTRADOR,
    RoleEnum.MODERATOR,
    RoleEnum.USER,
    RoleEnum.ADMIN,
  )
  async uploadImg(@User() user: UserAuth, @UploadedFile() file: IFile) {
    return await this.userService.uploadImg(user, file);
  }

  @Get('getall')
  @Auth(RoleEnum.ADMINISTRADOR, RoleEnum.MODERATOR, RoleEnum.ADMIN)
  async getMyDocuments(@User() user: UserAuth, @Query() querys: QueryUsersDto) {
    return await this.userService.getMyDocuments(user, querys);
  }
}
