import { IsString } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class CreateReqInfoDto {
  @IsString()
  @Expose()
  asunto: string;

  @IsString()
  @Expose()
  tipoDoc: string;

  @IsString()
  @Expose()
  principal: string;

  @IsString()
  @Expose()
  nomenclatura: string;

  @IsString()
  @Expose()
  folios: string;

  @Expose()
  observaciones: string;

  @Expose()
  anexo: string;
}

@Exclude()
export class UpdateReqInfoDto {
  @IsString()
  @Expose()
  asunto: string;

  @IsString()
  @Expose()
  tipoDoc: string;

  @Expose()
  principal: string;

  @IsString()
  @Expose()
  nomenclatura: string;

  @IsString()
  @Expose()
  folios: string;

  @Expose()
  observaciones: string;

  @Expose()
  anexo: string;
}
