import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserTypeEnum } from '@shared/constants';
import { UserPermistions } from '@shared/interfaces';

import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  _id: string;

  @Prop({ type: String, required: true })
  idCard: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  lastname: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  departamento: string;

  @Prop({ type: String, required: true })
  provincia: string;

  @Prop({ type: String, required: true })
  distrito: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: Boolean, default: true })
  active: boolean;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, default: UserTypeEnum.NATURAL })
  type: string;

  @Prop([{tenant:{type:String, ref:'Tenant'},role:String}])
  permisions: UserPermistions[];

  @Prop({ type: String })
  img: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.toJSON = function (this: UserDocument) {
  let user = this.toObject();
  delete user.password;
  return user;
};
