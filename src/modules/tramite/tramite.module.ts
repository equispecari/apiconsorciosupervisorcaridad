import { Module } from '@nestjs/common';
import { TramiteService } from './tramite.service';
import { TramiteController } from './tramite.controller';
import { AreaModule } from '../area/area.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestSchema } from './schemas';
import { SchemaEnum } from '@shared/constants';
import { UserModule } from 'modules/user/user.module';
import { UploadModule } from 'modules/upload/upload.module';
import { MailModule } from 'modules/mail/mail.module';
import { TenantModule } from 'modules/tenant/tenant.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SchemaEnum.REQUEST, schema: RequestSchema },
    ]),
    AreaModule,
    UserModule,
    TenantModule,
    UploadModule,
    MailModule,
  ],
  controllers: [TramiteController],
  providers: [TramiteService],
})
export class TramiteModule {}
