import { IsString, IsEmail, IsNumberString, IsMongoId } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class updateUserDto {
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
}

@Exclude()
export class updateUserRoleDto {
  @IsMongoId()
  @Expose()
  id: string;

  @IsString()
  @Expose()
  role: string;
}
