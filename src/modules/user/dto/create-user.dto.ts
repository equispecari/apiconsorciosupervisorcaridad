import { IsEmail, IsNumberString, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateUserDto {
  @IsNumberString()
  @Expose()
  idCard: string;

  @IsString()
  @Expose()
  name: string;

  @Expose()
  lastname: string;

  @IsString()
  @Expose()
  address: string;

  @IsString()
  @Expose()
  departamento: string;

  @IsString()
  @Expose()
  provincia: string;

  @IsString()
  @Expose()
  distrito: string;

  @IsNumberString()
  @Expose()
  phone: string;

  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @Expose()
  password: string;

  @IsString()
  @Expose()
  type: string;
}
