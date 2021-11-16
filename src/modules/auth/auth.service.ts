import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RoleEnum } from '@shared/constants';
import { JwtPayload } from '@shared/interfaces';
import { UserSigninDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly authAdmin: UserSigninDto = {
    email: 'admin@gmail.com',
    password: 'admin',
  };

  constructor(private readonly _jwtService: JwtService) {}

  async signinAdmin(signinDto: UserSigninDto): Promise<{ token: string }> {
    const { email, password } = signinDto;

    if (
      email !== this.authAdmin.email ||
      password !== this.authAdmin.password
    ) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    const payload: JwtPayload = {
      id: 'admin',
      role: RoleEnum.ADMIN,
    };

    const token = this._jwtService.sign(payload);
    return Promise.resolve({ token });
  }
}
