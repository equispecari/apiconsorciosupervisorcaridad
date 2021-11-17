import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RoleEnum } from '@shared/constants';
import { JwtPayload, UserAuth, UserPermistions } from '@shared/interfaces';
import {
  CreateUserDto,
  ResetPassSendMail,
  ResetPassword,
  UserSigninDto,
} from './dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'modules/user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './entities/auth.entity';
import { Model } from 'mongoose';
import { differenceInMinutes } from 'date-fns';
import { nanoid } from 'nanoid';
import { ChooseRole } from './dto/role.dto';
import { TenantService } from 'modules/tenant/tenant.service';
@Injectable()
export class AuthService {
  private readonly authAdmin: UserSigninDto = {
    email: 'admin@gmail.com',
    password: 'admin',
  };

  constructor(
    @InjectModel(Auth.name)
    private readonly model: Model<AuthDocument>,
    private readonly _jwtService: JwtService,
    private readonly userService: UserService,
    private readonly tenantService: TenantService,
  ) {}

  async signinAdmin(signinDto: UserSigninDto): Promise<{ token: string }> {
    const { email, password } = signinDto;

    if (
      email !== this.authAdmin.email ||
      password !== this.authAdmin.password
    ) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    const token = this.generateToken({
      id: RoleEnum.ADMIN,
      role: RoleEnum.ADMIN,
      tenantId: RoleEnum.ADMIN,
    });
    return Promise.resolve({ token });
  }

  async createUser(newUser: CreateUserDto) {
    const { email } = newUser;
    const findUser = await this.userService.findByEmail(email);

    if (findUser) {
      throw new BadRequestException('Ya existe un usuario con este Email');
    }

    const user = await this.userService.create(newUser);

    const token = this.generateToken({ id: user._id });

    return { user, token };
  }

  async chooseRole(permition: ChooseRole, userAuth: UserAuth) {
    const tenant = await this.tenantService.findById(permition.tenantId);

    if (!tenant) {
      throw new UnauthorizedException('No esta autorizado');
    }

    const user = await this.userService.findOne(userAuth.id);
    if (!user) {
      throw new UnauthorizedException('No esta autorizado');
    }
    const permision = this.selectPermision(permition.tenantId, user.permisions);

    if (!permision) {
      throw new UnauthorizedException('No esta autorizado');
    }

    const token = this.generateToken({
      id: user._id,
      role: permision.role,
      tenantId: permision.tenantId,
    });
    return { token };
  }

  async renewToken(tokenAuth: string) {
    const payload = this._jwtService.decode(tokenAuth) as JwtPayload;
    if (!payload) {
      throw new BadRequestException('Token invalido');
    }

    const user = await this.userService.findOne(payload.id);
    if (!user) {
      throw new UnauthorizedException('No esta autorizado');
    }

    const permision = this.selectPermision(payload.tenantId, user.permisions);

    let token: string;

    if (permision) {
      token = this.generateToken({
        id: user._id,
        role: permision.role,
        tenantId: permision.tenantId,
      });
    } else {
      token = this.generateToken({ id: user._id });
    }

    return { token, user };
  }

  async signin(userSigninDto: UserSigninDto) {
    const { email, password } = userSigninDto;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User no existe');
    }

    const isMatch = this.userService.comparePasswords(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('credenciales invalidas');
    }

    const token = this.generateToken({ id: user._id });

    return { token, user };
  }

  private generateToken(payload: JwtPayload) {
    return this._jwtService.sign(payload);
  }

  async resetPassword(body: ResetPassword) {
    const { token, password } = body;

    const findToken = await this.findOneOnTime(token);

    await this.userService.changePassword(findToken.id, password);
    await this.removeTokenByid(findToken._id);
    return true;
  }

  async resetPassSendMail(body: ResetPassSendMail) {
    // const { tenant }: any = req.params;

    const { email } = body;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User no existe');
    }

    const token = nanoid();
    await this.createReset(token, user._id);
    //SEND email with url
    // const url = `${this._config.get(
    //   ConfigEnum.FRONT_URL,
    // )}/${tenant}/reset-password/${token}`;
    // const bodyMail = `¡Importante! Si no solicitó recuperar su contraseña ignore este mensaje.
    // \nPor favor siga el siguiente enlace para restaurar su contraseña: \n${url}
    // \nEste enlace caducará en 4 horas.`;
    // this._nodemailder.sendEmailToWithData(
    //   email,
    //   'Consorcio San Miguel - Recuperar Contraseña',
    //   bodyMail,
    // );

    console.log(token, '<--token');

    return { message: `Revise su bandeja de entrada` };
  }

  private selectPermision(
    tenantId: string,
    permisions: UserPermistions[],
  ): UserPermistions {
    const permision = permisions.find((p) => p.tenantId === tenantId);

    if (!permision) {
      return null;
    }

    return permision;
  }

  private async createReset(token: string, id: string): Promise<boolean> {
    const newReset = new this.model({ token, id });
    await newReset.save();
    return true;
  }

  async findOneOnTime(token: string) {
    const reset = await this.model.findOne({ token });
    if (!reset) {
      throw new BadRequestException('Token no valido');
    }

    const diferenciaMin: number = differenceInMinutes(
      new Date(reset.create_at),
      new Date(),
    );
    //4hrs de validos
    if (diferenciaMin > 60 * 4) {
      await this.removeTokenByid(reset._id);
      throw new BadRequestException('Token no valido');
    }
    return reset;
  }

  private async removeTokenByid(id: string): Promise<void> {
    await this.model.deleteMany({ _id: id });
  }
}
