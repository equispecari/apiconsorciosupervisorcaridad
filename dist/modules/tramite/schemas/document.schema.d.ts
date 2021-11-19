import { Schema } from 'mongoose';
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
    rechazado: {
        rechazadoPor: string;
        fecha?: Date;
    }[];
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
export declare const RequestSchema: Schema<any, import("mongoose").Model<any, any, any, any>, {}>;
export {};
