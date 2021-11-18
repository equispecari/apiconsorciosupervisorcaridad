import { Module } from '@nestjs/common';
import { UpdateController } from './update.controller';
import { UploadController } from './upload.component';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadController, UpdateController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
