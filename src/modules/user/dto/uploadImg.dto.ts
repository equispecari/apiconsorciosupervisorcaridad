import { IsNotEmpty, IsString } from 'class-validator';

export class FileUploadDto {
  image: any;
}

export class UploadBodyPresigned {
  @IsString()
  fileName: string;

  @IsNotEmpty()
  parts: { ETag: string; PartNumber: number }[];

  @IsNotEmpty()
  @IsString()
  uploadId: string;
}
