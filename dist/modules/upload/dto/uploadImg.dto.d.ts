export declare class FileUploadDto {
    image: any;
}
export declare class UploadBodyPresigned {
    fileName: string;
    parts: {
        ETag: string;
        PartNumber: number;
    }[];
    uploadId: string;
}
