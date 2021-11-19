import { UploadBodyPresigned } from './dto/uploadImg.dto';
import { UploadService } from './upload.service';
import { IFile } from '@shared/interfaces';
export declare class UploadController {
    private readonly _awsS3Service;
    constructor(_awsS3Service: UploadService);
    startUpload(query: any): Promise<{
        uploadId: string;
    }>;
    createTramite(query: any): Promise<{
        presignedUrl: string;
    }>;
    completeUpload(body: UploadBodyPresigned): Promise<{
        data: any;
    }>;
    pdfUpload(query: any, file: IFile): Promise<Object>;
}
