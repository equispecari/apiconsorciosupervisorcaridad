"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require('nodemailer');
let MailService = class MailService {
    constructor(_configService) {
        this._configService = _configService;
        this.name_bussines = 'Consorcio Supervisor Caridad';
        this.transporter = nodemailer.createTransport({
            host: _configService.get('SMTP_HOST'),
            port: 465,
            secure: true,
            tls: {
                rejectUnauthorized: false,
            },
            auth: {
                user: _configService.get('SMTP_USER'),
                pass: _configService.get('SMTP_PASS'),
            },
        });
        this.web_uri = _configService.get('FRONT_URL');
    }
    async sendEmailToWithData(to, subject, body) {
        try {
            let info = await this.transporter.sendMail({
                from: `${this.name_bussines} - Mesa de partes virtual<${this._configService.get('SMTP_FROM_MAIL')}>`,
                to: to,
                subject: subject,
                html: body,
            });
            console.log('Message sent: %s', info.messageId);
        }
        catch (error) {
            console.log('error', error.message);
        }
    }
    resetPassword(token, email) {
        const url = `${this._configService.get('FRONT_URL')}/reset-password/${token}`;
        const bodyMail = `¡Importante! Si no solicitó recuperar su contraseña ignore este mensaje.
    \nPor favor siga el siguiente enlace para restaurar su contraseña: \n${url}
    \nEste enlace caducará en 4 horas.`;
        this.sendEmailToWithData(email, `${this.name_bussines} - Recuperar Contraseña`, bodyMail);
    }
    registerDocument(email, num_serie, key) {
        const url = `${this.web_uri}/buscar/${num_serie}`;
        const html = `
    <h4>Estimad@</h4>
    <p>Su trámite se ha registrado con el siguiente código de registro ${num_serie}, ${url}</p>
    
    <a href="${key}">
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
        this.sendEmailToWithData(email, '${this.name_bussines} - Registro y cargo', html);
    }
    deribarDoc(to, data) {
        let html = `
        <h4>Estimad@ ${to.encargado}</h4>
        <p>Tiene este documento por revisar, ${data.nomenclatura}, ${data.asunto}. </p>
        
        <a href="${this.web_uri}/${data.principal}" style="text-align: center;">
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
                    `<a href="${data.anexo}" style="text-align: center;">
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
        }
        else {
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
        this.sendEmailToWithData(to.email, `${this.name_bussines} - ${data.asunto}`, html);
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map