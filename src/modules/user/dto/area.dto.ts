import { IsString, IsEmail } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class CreateAreaDto {
  @IsString()
  @Expose()
  area: string;

  @IsString()
  @Expose()
  encargado: string;

  @IsString()
  @Expose()
  dni: string;

  @IsString()
  @Expose()
  especialidad: string;

  @IsString()
  @Expose()
  phone: string;

  @IsEmail()
  @Expose()
  email: string;
}
