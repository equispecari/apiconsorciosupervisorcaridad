import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from 'modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './entities/auth.entity';
import { TenantModule } from 'modules/tenant/tenant.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),

    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SEED'),
        signOptions: { expiresIn: '90d' },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    TenantModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
