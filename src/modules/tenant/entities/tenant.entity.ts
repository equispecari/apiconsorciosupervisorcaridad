import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type TenantDocument = Tenant & Document;

@Schema({ versionKey: false })
export class Tenant {
  _id: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  longName: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
