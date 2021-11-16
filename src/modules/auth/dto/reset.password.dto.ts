import { IsEmail, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResetPassSendMail {
  @IsEmail()
  @Expose()
  email: string;
}

@Exclude()
export class ResetPassword {
  @IsString()
  @Expose()
  token: string;

  @IsString()
  @Expose()
  password: string;
}
