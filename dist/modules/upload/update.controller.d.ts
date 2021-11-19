import { UploadService } from './upload.service';
export declare class UpdateController {
    private readonly update;
    constructor(update: UploadService);
    findAll(): Promise<string>;
}
