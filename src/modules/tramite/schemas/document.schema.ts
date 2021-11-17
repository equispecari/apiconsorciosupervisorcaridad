import { Schema, Types } from 'mongoose';
import { SchemaEnum, StateEnum } from '@shared/constants';
var moment = require('moment-timezone');

export interface IDataRequestDoc {
  asunto: string;
  tipoDoc: string;
  nomenclatura: string;
  principal: string;
  folios: string;
  observaciones: string;
  anexo?: string;
}

interface IArea {
  admin: any;
  area: any;
  in_area_at: any;
  _id?: string;
}

interface IObserved {
  admin: any;
  description: string;
  observed_at: any;
  _id?: string;
}

export interface IRequestDoc extends Document {
  _id: string;
  area: IArea[];
  owner: string;
  estado: string;
  tenant: string;
  rechazado: { rechazadoPor: string; fecha?: Date }[];
  data: IDataRequestDoc;
  modified_at: Date[];
  observacionesRecep: IObserved[];
  num_serie: string;
  pdf: string;
}

export interface IRequestDoc_ {
  data: IDataRequestDoc;
  num_serie: string;
  owner: string;
  modified_at?: Date[] | string;
  _id: string;
  area: IArea[];
  estado?: string;
  observacionesRecep?: IObserved[];
  pdf?: string;
}

const ObservacionesAdminSchema = new Schema({
  admin: { type: Types.ObjectId, ref: SchemaEnum.USER },
  observed_at: { type: String, required: true },
  description: { type: String, required: true },
});

const AreaAdminSchema = new Schema({
  admin: { type: Types.ObjectId, ref: SchemaEnum.USER },
  area: { type: Types.ObjectId, ref: SchemaEnum.AREA, required: true },
  in_area_at: { type: String, required: true },
});

const DataRequestSchema = new Schema({
  asunto: { type: String, required: true },
  tipoDoc: { type: String, required: true },
  nomenclatura: { type: String, required: true },
  principal: { type: String, required: true },
  folios: { type: String, required: true },
  observaciones: { type: String },
  anexo: { type: String },
});

export const RequestSchema = new Schema({
  created_at: { type: Date, default: Date.now },
  area: [AreaAdminSchema],
  owner: { type: String, ref: 'User' },
  data: DataRequestSchema,
  estado: { type: String, default: StateEnum.PENDIENTE },
  rechazado: [
    {
      rechazadoPor: { type: String },
      fecha: { type: Date, default: Date.now },
    },
  ],
  modified_at: [{ type: Date }],
  pdf: { type: String },
  num_serie: { type: String, required: true },
  observacionesRecep: [ObservacionesAdminSchema],
  tenant: { type: String, required: true },
});

RequestSchema.methods.toJSON = function () {
  let data = this.toObject();
  if (data.modified_at) {
    const count = data.modified_at.length;
    if (count > 0) {
      data.modified_at = moment(data.modified_at[count - 1])
        .tz('America/Lima')
        .format('D/MM/YYYY h:mm:ssa');
    }
    if (count == 0) {
      data.modified_at = null;
    }
  }
  data.created_at = moment(data.created_at)
    .tz('America/Lima')
    .format('D/MM/YYYY h:mm:ssa');

  return data;
};
