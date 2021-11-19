import { Model } from 'mongoose';
import { IRequestDoc } from './schemas/document.schema';
import { UploadService } from '../upload/upload.service';
import { UserAuth } from '@shared/interfaces';
export declare class TramiteService {
    private readonly _model;
    private readonly _awsS3Service;
    constructor(_model: Model<IRequestDoc>, _awsS3Service: UploadService);
    getDocById(userAuth: UserAuth, id: string): Promise<import("mongoose").Document<any, any, IRequestDoc> & IRequestDoc & {
        _id: string;
    }>;
    getUDocById(id: string): Promise<import("mongoose").Document<any, any, IRequestDoc> & IRequestDoc & {
        _id: string;
    }>;
    getDocByNro(num_serie: string): Promise<IRequestDoc>;
    create(data: any): Promise<import("mongoose").Document<any, any, IRequestDoc> & IRequestDoc & {
        _id: string;
    }>;
    getDocuments(query?: {
        sede: string;
        estado: string;
    } | {}, skip?: number, limit?: number): Promise<IRequestDoc[]>;
    getTotalDocuments(query?: {
        sede: string;
        estado: string;
    } | {}): Promise<number>;
}
