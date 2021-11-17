import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const nodemailer = require('nodemailer');

@Injectable()
export class MailService {
  private transporter;
  constructor(private readonly _configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: _configService.get('SMTP_HOST'),
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: _configService.get('SMTP_USER'), // generated ethereal user
        pass: _configService.get('SMTP_PASS'), // generated ethereal password
      },
    });
  }

  async sendEmailToWithData(
    to: string,
    subject: string,
    body: string,
  ): Promise<void> {
    try {
      // send mail with defined transport object
      let info = await this.transporter.sendMail({
        from: `Consorcio San Miguel - Mesa de partes virtual<${this._configService.get(
          'SMTP_FROM_MAIL',
        )}>`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: body, // html body
      });

      console.log('Message sent: %s', info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    } catch (error) {
      console.log(error.message);
    }
  }

  async resetPassword(token: string, email: string) {
    const url = `${this._configService.get(
      'FRONT_URL',
    )}/reset-password/${token}`;
    const bodyMail = `¡Importante! Si no solicitó recuperar su contraseña ignore este mensaje.
    \nPor favor siga el siguiente enlace para restaurar su contraseña: \n${url}
    \nEste enlace caducará en 4 horas.`;
    await this.sendEmailToWithData(
      email,
      'Consorcio San Miguel - Recuperar Contraseña',
      bodyMail,
    );
  }
}
