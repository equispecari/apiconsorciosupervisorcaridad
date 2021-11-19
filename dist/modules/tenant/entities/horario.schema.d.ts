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
export declare const HorarioSchema: Schema<any, import("mongoose").Model<any, any, any, any>, {}>;
export {};
