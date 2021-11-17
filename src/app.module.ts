import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, AuthModule, TenantModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get<string>('PORT');
  }
}
