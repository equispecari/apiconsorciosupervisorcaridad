import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const nodemailer = require('nodemailer');

@Injectable()
export class MailService {
  private transporter;
  private web_uri;
  private aws_base_uri;
  private name_bussines = 'SEG Ingenieria';
  constructor(private readonly _configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: _configService.get<string>('SMTP_HOST'),
      port: 465,
      secure: true,
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: _configService.get<string>('SMTP_USER'),
        pass: _configService.get<string>('SMTP_PASS'),
      },
    });
    this.web_uri = _configService.get('FRONT_URL');
    this.aws_base_uri = _configService.get('AWS_S3_URL');
  }

  async sendEmailToWithData(to: string, subject: string, body: string) {
    try {
      const info = await this.transporter.sendMail({
        from: `${
          this.name_bussines
        } - Mesa de partes virtual<${this._configService.get(
          'SMTP_FROM_MAIL',
        )}>`,
        to: to,
        subject: subject,
        html: body,
      });

      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.log('error', error.message);
    }
  }

  resetPassword(token: string, email: string) {
    const url = `${this.web_uri}/reset-password/${token}`;
    const bodyMail = `¡Importante! Si no solicitó recuperar su contraseña ignore este mensaje.
    \nPor favor siga el siguiente enlace para restaurar su contraseña: \n${url}
    \nEste enlace caducará en 4 horas.`;
    this.sendEmailToWithData(
      email,
      `${this.name_bussines} - Recuperar Contraseña`,
      bodyMail,
    );
  }

  registerDocument(email: string, num_serie: string, key: string) {
    const url = `${this.web_uri}/buscar/${num_serie}`;
    const cargoUri = `${this.aws_base_uri}/${key}`;

    const html = `
    <h4>Estimad@</h4>
    <p>Su trámite se ha registrado con el siguiente código de registro ${num_serie}, ${url}</p>
    
    <a href="${cargoUri}">
      <img 
        title="CARGO"
        src="https://summit-dew.s3.us-east-2.amazonaws.com/email/pdf.png"
        width=75" 
        height="75">
    </a>
    </br>
    </br>
    <hr>
    <div style="text-align: right;">
      <p>Saludos,</br>
      Mesa de Partes Virtual</br>
      ${this.name_bussines}</p>
    </div>
    
    `;
    this.sendEmailToWithData(
      email,
      `${this.name_bussines} - Registro y cargo`,
      html,
    );
  }

  deribarDoc(
    to: { encargado: string; email: string },
    data: {
      nomenclatura: string;
      asunto: string;
      principal: string;
      anexo?: string;
    },
  ) {
    let html = `
        <h4>Estimad@ ${to.encargado}</h4>
        <p>Tiene este documento por revisar, ${data.nomenclatura}, ${data.asunto}. </p>
        
        <a href="${this.aws_base_uri}/${data.principal}" style="text-align: center;">
          <img 
            title="PRINCIPAL"
            src="https://summit-dew.s3.us-east-2.amazonaws.com/email/pdf.png"
            width=75" 
            height="75">
        </a>            
      `;

    if (data.anexo) {
      html =
        html +
        `<a href="${this.aws_base_uri}/${data.anexo}" style="text-align: center;">
        <img 
          title="ANEXOS"
          src="https://summit-dew.s3.us-east-2.amazonaws.com/email/archive.png"
          width=75" 
          height="75">
      </a>
      </br>
      </br>
      <hr>
      <div style="text-align: right;">
        <p>Saludos,</br>
        Mesa de Partes Virtual</br>
        ${this.name_bussines}</p>
      </div>  `;
    } else {
      html =
        html +
        `
      </br>
      </br>
      <hr>
      <div style="text-align: right;">
        <p>Saludos,</br>
        Mesa de Partes Virtual</br>
        ${this.name_bussines}</p>
      </div>  `;
    }

    this.sendEmailToWithData(
      to.email,
      `${this.name_bussines} - ${data.asunto}`,
      html,
    );
  }
}
