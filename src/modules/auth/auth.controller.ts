import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSigninDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin')
  async loginAdmin(@Body() signinDto: UserSigninDto) {
    return this.authService.signinAdmin(signinDto);
  }
}
