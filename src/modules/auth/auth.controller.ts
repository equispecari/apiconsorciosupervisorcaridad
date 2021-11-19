import { Controller, Post, Body, Req, Get, Param } from '@nestjs/common';
import { RoleEnum } from '@shared/constants';
import { Auth, User } from '@shared/decorators';
import { UserAuth } from '@shared/interfaces';
import { Request } from 'express';
import { AuthService } from './auth.service';
import {
  CreateUserDto,
  ResetPassSendMail,
  ResetPassword,
  UserSigninDto,
} from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin')
  async loginAdmin(@Body() signinDto: UserSigninDto) {
    return this.authService.signinAdmin(signinDto);
  }

  @Post('create/user')
  async createUser(@Body() userDni: CreateUserDto) {
    return await this.authService.createUser(userDni);
  }

  @Auth(RoleEnum.ADMIN)
  @Get('select/sede/:sede')
  async selectSede(@Param('sede') sede: string, @User() user: UserAuth) {
    return await this.authService.chooseRole(sede, user);
  }

  @Post('user')
  async loginUser(@Body() userSigninDto: UserSigninDto) {
    return await this.authService.signin(userSigninDto);
  }

  @Post('reset/sendmail')
  async resetPassSendMail(@Body() body: ResetPassSendMail) {
    return await this.authService.resetPassSendMail(body);
  }

  @Post('reset/password')
  async resetPassword(@Body() body: ResetPassword) {
    return await this.authService.resetPassword(body);
  }

  @Get('renew')
  async reniewTokenModerator(@Req() req: Request) {
    const oldtoken = req.headers['access-token'] as string;
    return await this.authService.renewToken(oldtoken);
  }
}
