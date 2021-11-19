import { Schema } from 'mongoose';
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
export declare const AreaSchema: Schema<any, import("mongoose").Model<any, any, any, any>, {}>;
