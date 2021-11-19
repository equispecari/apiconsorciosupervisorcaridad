import { Document } from 'mongoose';
export declare type AuthDocument = Auth & Document;
export declare class Auth {
    _id: string;
    token: string;
    create_at: string;
    id: string;
}
export declare const AuthSchema: import("mongoose").Schema<Document<Auth, any, any>, import("mongoose").Model<Document<Auth, any, any>, any, any, any>, {}>;
