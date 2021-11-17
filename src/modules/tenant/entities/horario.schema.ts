import { Schema } from 'mongoose';

interface IDia {
  inicio: string;
  fin: string;
  active: boolean;
}
export interface IHorario {
  0: IDia;
  1: IDia;
  2: IDia;
  3: IDia;
  4: IDia;
  5: IDia;
  6: IDia;
}

export const HorarioSchema = new Schema({
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
});
