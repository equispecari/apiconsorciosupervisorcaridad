import { Controller, Get } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('update')
export class UpdateController {
  constructor(private readonly update: UploadService) {}

  @Get()
  async findAll() {
    const { key } = await this.update.generateQrGrupPdf({
      DOC_ID: '555',
      asunto: 'prueba',
      codigo: 'test-1',
      email_remi: 'edu91325@gmail.com',
      fecha: '2021/12/21',
      folios: '15',
      nomenclatura: 'test-12',
      remitente: 'eduw',
      sede: 'prueba',
      sedeName: 'test',
      tipo: 'test',
    });

    return `https://consorciosupervisorcaridad.s3.us-east-2.amazonaws.com/${key}`;
  }
}
