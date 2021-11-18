import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { IHorario } from './horario.schema';

export type TenantDocument = Tenant & Document;

@Schema({ versionKey: false })
export class Tenant {
  _id: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  longName: string;

  @Prop({ type: Number, default: 0 })
  nro_doc: number;

  @Prop(
    raw({
      0: {
        active: { type: Boolean, default: false },
        inicio: { type: String, default: '08:30:00' },
        fin: { type: String, default: '13:00:00' },
      },
      1: {
        active: { type: Boolean, default: true },
        inicio: { type: String, default: '08:30:00' },
        fin: { type: String, default: '17:30:00' },
      },
      2: {
        active: { type: Boolean, default: true },
        inicio: { type: String, default: '08:30:00' },
        fin: { type: String, default: '17:30:00' },
      },
      3: {
        active: { type: Boolean, default: true },
        inicio: { type: String, default: '08:30:00' },
        fin: { type: String, default: '17:30:00' },
      },
      4: {
        active: { type: Boolean, default: true },
        inicio: { type: String, default: '08:30:00' },
        fin: { type: String, default: '17:30:00' },
      },
      5: {
        active: { type: Boolean, default: true },
        inicio: { type: String, default: '08:30:00' },
        fin: { type: String, default: '17:30:00' },
      },
      6: {
        active: { type: Boolean, default: true },
        inicio: { type: String, default: '08:30:00' },
        fin: { type: String, default: '13:00:00' },
      },
    }),
  )
  horario: IHorario;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);

TenantSchema.methods.toJSON = function (this: TenantDocument) {
  const tenant = this;

  return { _id: tenant._id, name: tenant.name, longName: tenant.longName };
};
