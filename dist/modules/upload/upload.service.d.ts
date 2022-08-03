/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
export declare class UploadService {
    private readonly configService;
    private readonly s3;
    private readonly bucket;
    private readonly s3Url;
    constructor(configService: ConfigService);
    checkImg(originalName: string): boolean;
    get aws_base_uri(): string;
    upLoadS3Object(buffer: Buffer, key: string): Promise<boolean>;
    deleteS3Object(key: string): void;
    startUpload(key: string, fileType: string): Promise<{
        uploadId: string;
    }>;
    getUploadUrl(key: string, partNumber: number, uploadId: string): Promise<{
        presignedUrl: string;
    }>;
    completeUpload(key: string, parts: {
        ETag: string;
        PartNumber: number;
    }[], uploadId: string): Promise<{
        data: any;
    }>;
    s3UploadPdf(buffer: Buffer, key: string): Promise<Object>;
    generateQrGrupPdf(data: {
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
    }, pdfkey?: string): Promise<{
        key: string;
    }>;
    private getBaseKey;
    private getDateFormat;
}
