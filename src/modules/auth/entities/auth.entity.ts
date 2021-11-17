import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema({ versionKey: false })
export class Auth {
  _id: string;

  @Prop({ type: String })
  token: string;

  @Prop({ type: Date, default: Date.now })
  create_at: string;

  @Prop({ type: String })
  id: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
