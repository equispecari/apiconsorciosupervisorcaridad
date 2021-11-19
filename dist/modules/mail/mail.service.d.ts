import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private readonly _configService;
    private transporter;
    private web_uri;
    private name_bussines;
    constructor(_configService: ConfigService);
    sendEmailToWithData(to: string, subject: string, body: string): Promise<void>;
    resetPassword(token: string, email: string): void;
    registerDocument(email: string, num_serie: string, key: string): void;
    deribarDoc(to: {
        encargado: string;
        email: string;
    }, data: {
        nomenclatura: string;
        asunto: string;
        principal: string;
        anexo?: string;
    }): void;
}
