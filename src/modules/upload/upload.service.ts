import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
const isImage = require('is-image');
const PDFDocument = require('pdfkit');
const qr = require('qr-image');
const path = require('path');

@Injectable()
export class UploadService {
  private readonly s3: S3;
  private readonly bucket: string;
  private readonly s3Url: string;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      credentials: {
        accessKeyId: configService.get('AWS_ACCES_ID'),
        secretAccessKey: configService.get('AWS_SECRET_KEY'),
      },
      region: configService.get('AWS_REGION'),
      signatureVersion: configService.get('AWS_VERSION'),
    });
    this.bucket = configService.get('AWS_BUCKET');
    this.s3Url = configService.get('AWS_S3_URL');
  }

  checkImg(originalName: string): Boolean {
    return isImage(originalName);
  }

  get aws_base_uri(): string {
    return this.s3Url;
  }

  async upLoadS3Object(buffer: Buffer, key: string): Promise<boolean> {
    try {
      await this.s3
        .putObject({
          Bucket: this.bucket,
          Key: key,
          ACL: 'public-read',
          Body: buffer,
        })
        .promise();
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  deleteS3Object(key: string): void {
    this.s3.deleteObject({ Bucket: this.bucket, Key: key }, (err, data) => {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });
  }

  startUpload(key: string, fileType: string): Promise<{ uploadId: string }> {
    try {
      let params = {
        Bucket: this.bucket,
        Key: key,
        ContentType: fileType,
        ACL: 'public-read',
      };

      return new Promise((resolve, reject) =>
        this.s3.createMultipartUpload(params, (err, uploadData) => {
          if (err) {
            reject(err);
          } else {
            resolve({ uploadId: uploadData.UploadId });
          }
        }),
      );
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  getUploadUrl(
    key: string,
    partNumber: number,
    uploadId: string,
  ): Promise<{ presignedUrl: string }> {
    try {
      let params = {
        Bucket: this.bucket,
        Key: key,
        PartNumber: partNumber,
        UploadId: uploadId,
      };

      return new Promise((resolve, reject) =>
        this.s3.getSignedUrl('uploadPart', params, (err, presignedUrl) => {
          if (err) {
            reject(err);
          } else {
            resolve({ presignedUrl });
          }
        }),
      );
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  completeUpload(
    key: string,
    parts: { ETag: string; PartNumber: number }[],
    uploadId: string,
  ): Promise<{ data }> {
    try {
      let params = {
        Bucket: this.bucket,
        Key: key,
        MultipartUpload: {
          Parts: parts,
        },
        UploadId: uploadId,
      };
      return new Promise((resolve, reject) =>
        this.s3.completeMultipartUpload(params, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve({ data });
          }
        }),
      );
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async s3UploadPdf(buffer: Buffer, key: string): Promise<Object> {
    try {
      await this.s3
        .upload({
          Bucket: this.bucket,
          Key: key,
          ACL: 'public-read',
          Body: buffer,
        })
        .promise();
      return true;
    } catch (error) {
      return false;
    }
  }

  async generateQrGrupPdf(
    data: {
      sede: string;
      sedeName: string;
      nomenclatura: string;
      tipo: string;
      asunto: string;
      folios: string;
      DOC_ID: string;
      remitente: string;
      email_remi: string;
      codigo: string;
      fecha: string;
    },
    pdfkey?: string,
  ): Promise<{ key: string }> {
    const datosDoc = `OFICINA/PROYECTO: ${data.sedeName}\n${data.nomenclatura}\nTIPO: ${data.tipo}\nASUNTO: ${data.asunto}\nFOLIOS: ${data.folios}`;
    const datosRem = `DOC_ID DNI/RUC: ${data.DOC_ID}\nNOMBRES Y APELLIDOS/RAZON SOCIAL: ${data.remitente}\nCORREO: ${data.email_remi}`;
    const datosCargo = `Código de registro: ${data.codigo}\nFecha y hora de recepción: ${data.fecha}`;
    const docConf = {
      X: 612,
      Y: 792,
      margin: 30,
    };
    const hespace = 10;

    const nombre_sede = 'CONSORCIO SUPERVISOR CARIDAD';
    const text_y = 40;

    const logo1 = {
      x: 80,
      y: 90,
    };

    const logo2 = {
      x: 30,
      y: 30,
    };
    const qrImage = {
      x: 140,
      y: 140,
    };

    //qr
    let pdf_string = await qr.imageSync(
      `${this.configService.get('FRONT_URL')}/${data.sede}/buscar/${
        data.codigo
      }`,
      {
        type: 'png',
      },
    );

    const doc = new PDFDocument();

    // cuadro 1
    doc.polygon(
      [docConf.margin, docConf.margin],
      [docConf.X - docConf.margin, docConf.margin],
      [docConf.X - docConf.margin, docConf.Y - docConf.margin],
      [docConf.margin, docConf.Y - docConf.margin],
    );
    doc.stroke();

    // cuadro 2
    doc
      .polygon(
        [docConf.margin * 5, docConf.Y / 2 + docConf.margin],
        [docConf.X - docConf.margin * 5, docConf.Y / 2 + docConf.margin],
        [
          docConf.X - docConf.margin * 5,
          docConf.Y - docConf.margin - docConf.margin / 2,
        ],
        [docConf.margin * 5, docConf.Y - docConf.margin - docConf.margin / 2],
      )
      .lineWidth(2)
      .stroke('#33AAFF');

    //logo CSM
    doc.image(
      path.join(__dirname, '../../../public/images/logo.png'),
      docConf.X / 2 - logo1.x / 2,
      docConf.margin + hespace,
      {
        width: logo1.x,
        height: logo1.y,
        align: 'center',
      },
    );

    doc.fontSize(18);
    doc.text(
      ` ${nombre_sede}`,
      docConf.margin + hespace,
      docConf.margin + hespace * 3 + logo1.y - 15,
      {
        width: docConf.X - docConf.margin * 2 - hespace,
        align: 'center',
      },
    );

    //qr image
    doc.image(
      pdf_string,
      docConf.X / 2 - qrImage.x / 2,
      docConf.Y - qrImage.y - docConf.margin * 2,
      {
        width: qrImage.x,
        height: qrImage.y,
      },
    );

    doc.moveDown();
    doc.fontSize(18);
    doc.text('I. DATOS DE DOCUMENTO');

    doc.moveDown();
    doc.fontSize(12);
    doc.text(datosDoc);

    doc.moveDown();
    doc.fontSize(18);
    doc.text('II. DATOS DE REMITENTE');

    doc.moveDown();
    doc.fontSize(12);
    doc.text(datosRem);

    doc.moveDown();
    doc.fontSize(18);
    doc.text('III. CARGO');

    //text 2

    doc.fontSize(16);
    doc.text(
      `MESA DE PARTES VIRTUAL\n${nombre_sede}`,
      docConf.margin * 5 + docConf.margin / 2,
      docConf.Y / 2 + docConf.margin * 3 - text_y,
      {
        align: 'center',
        width: docConf.X - docConf.margin * 11,
      },
    );

    doc.moveDown();
    doc.fontSize(11);
    doc.text(datosCargo);

    doc.moveDown();
    doc.fontSize(16);
    doc.text('DOCUMENTO RECIBIDO', {
      align: 'center',
      width: docConf.X - docConf.margin * 11,
    });

    doc.end();

    let key = this.getBaseKey(data.nomenclatura, data.sedeName) + '-cargo.pdf';

    const isSent = await this.s3UploadPdf(doc, key);

    return isSent ? { key } : { key: null };
  }

  private getBaseKey(nomenclatura: string, longName: string) {
    const { fecha, hora } = this.getDateFormat();

    return `${longName.replace(/\s/g, '')}/${fecha}-${nomenclatura.replace(
      /\s/g,
      '',
    )}/${hora}`;
  }

  private getDateFormat() {
    const date = new Date();

    const fecha = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    const hora = `${date.getHours()}-${date.getMinutes()}`;
    return { fecha, hora };
  }
}
