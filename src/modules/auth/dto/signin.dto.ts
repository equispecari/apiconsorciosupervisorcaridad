import { IsEmail, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserSigninDto {
  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @Expose()
  password: string;
}
