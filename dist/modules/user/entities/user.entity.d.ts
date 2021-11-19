import { Document } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    _id: string;
    idCard: string;
    name: string;
    lastname: string;
    address: string;
    departamento: string;
    provincia: string;
    distrito: string;
    phone: string;
    email: string;
    active: boolean;
    created_at: Date;
    password: string;
    type: string;
    tenant: string;
    role: string;
    img: string;
}
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any, any>, {}>;
