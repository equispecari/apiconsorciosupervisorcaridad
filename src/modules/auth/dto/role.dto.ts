import { IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ChooseRole {
  @IsString()
  @Expose()
  tenantId: string;
}
