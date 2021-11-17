import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Put,
  UseInterceptors,
  UploadedFile,
  InternalServerErrorException,
} from '@nestjs/common';
import { UploadBodyPresigned } from './dto/uploadImg.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { RoleEnum } from '@shared/constants';
import { Auth } from '@shared/decorators';
import { IFile } from '@shared/interfaces';

@Controller('upload')
export class UploadController {
  constructor(private readonly _awsS3Service: UploadService) {}

  @Get('start-upload')
  @Auth(RoleEnum.ADMINISTRADOR, RoleEnum.MODERATOR, RoleEnum.USER)
  async startUpload(@Query() query: any) {
    let filetype = query.fileType || '';
    let fileName = query.fileName || '';

    const { uploadId } = await this._awsS3Service.startUpload(
      fileName.toString(),
      filetype.toString(),
    );

    return { uploadId };
  }

  @Get('get-upload-url')
  @Auth(RoleEnum.ADMINISTRADOR, RoleEnum.MODERATOR, RoleEnum.USER)
  async createTramite(@Query() query: any) {
    const { fileName, partNumber, uploadId } = query;

    const { presignedUrl } = await this._awsS3Service.getUploadUrl(
      fileName,
      partNumber,
      uploadId,
    );

    return { presignedUrl };
  }

  @Post('complete-upload')
  @Auth(RoleEnum.ADMINISTRADOR, RoleEnum.MODERATOR, RoleEnum.USER)
  async completeUpload(@Body() body: UploadBodyPresigned) {
    const { fileName, parts, uploadId } = body;
    const { data } = await this._awsS3Service.completeUpload(
      fileName,
      parts,
      uploadId,
    );

    return { data };
  }

  @Put('pdf-upload')
  @UseInterceptors(FileInterceptor('file'))
  @Auth(RoleEnum.ADMINISTRADOR, RoleEnum.MODERATOR, RoleEnum.USER)
  async pdfUpload(@Query() query: any, @UploadedFile() file: IFile) {
    let fileName = query.fileName || '';
    const isUpload = await this._awsS3Service.s3UploadPdf(
      file.buffer,
      fileName,
    );

    if (!isUpload) {
      throw new InternalServerErrorException('Hubo un error al subir imagen');
    }

    return isUpload;
  }
}
