import { Schema, Types } from 'mongoose';

export interface IArea extends Document {
  _id: string;
  area: string;
  encargado: string;
  dni: string;
  especialidad: string;
  phone: string;
  email: string;
  created_at: Date;
}

export interface IArea_ {
  _id: string;
  area: string;
  encargado: string;
  dni: string;
  especialidad: string;
  phone: string;
  email: string;
  created_at: Date;
}

export const AreaSchema = new Schema({
  area: { type: String, required: true },
  encargado: { type: String, required: true },
  dni: { type: String, required: true },
  especialidad: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  tenant: { type: String, required: true },
});
