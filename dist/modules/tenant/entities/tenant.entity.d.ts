import { Document } from 'mongoose';
import { IHorario } from './horario.schema';
export declare type TenantDocument = Tenant & Document;
export declare class Tenant {
    _id: string;
    name: string;
    longName: string;
    nro_doc: number;
    horario: IHorario;
}
export declare const TenantSchema: import("mongoose").Schema<Document<Tenant, any, any>, import("mongoose").Model<Document<Tenant, any, any>, any, any, any>, {}>;
