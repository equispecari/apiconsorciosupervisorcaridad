import { IsMongoId, IsString } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class DerivarReqDto {
  @IsMongoId()
  @Expose()
  docId: string;

  @IsMongoId()
  @Expose()
  areaId: string;
}

@Exclude()
export class ObservacionesReqDto {
  @IsMongoId()
  @Expose()
  docId: string;

  @IsString()
  @Expose()
  observaciones: string;
}

@Exclude()
export class RechazadoReqDto {
  @IsMongoId()
  @Expose()
  docId: string;
}

export class QuerysReqDto {
  limit: number;

  skip: number;

  query: string;
}

export class QueryUsersDto {
  limit: number;

  skip: number;
}

export class idReqDto {
  @IsMongoId()
  id: string;
}
