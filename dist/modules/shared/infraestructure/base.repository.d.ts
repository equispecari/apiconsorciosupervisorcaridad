import { AnyKeys, AnyObject, Document, Model } from 'mongoose';
import { BaseRepository } from '../application/base.repository';
export declare abstract class OperationRepository<T extends Document> implements BaseRepository<T> {
    protected readonly entityModel: Model<T>;
    constructor(entityModel: Model<T>);
    getOne(id: string | number): Promise<T>;
    getPage(page: number, limit: number): Promise<{
        data: T[];
        total: number;
    }>;
    update(id: string | number, entity: object): Promise<T>;
    delete(id: string | number): Promise<T>;
    list(options?: {
        where: {};
        relations: any[];
        filters: {};
    }): Promise<T[]>;
    create(entity: AnyKeys<T> & AnyObject): Promise<T>;
}
