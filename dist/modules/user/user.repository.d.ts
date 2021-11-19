import { Model } from 'mongoose';
import { OperationRepository } from '@shared/infraestructure/base.repository';
import { User, UserDocument } from './entities/user.entity';
export declare class UserRepository extends OperationRepository<UserDocument> {
    private readonly model;
    constructor(model: Model<UserDocument>);
    findByEmail(email: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getUsers(tenantId: string, skip?: number, limit?: number): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    getTotalUsers(tenantId: string): Promise<number>;
}
