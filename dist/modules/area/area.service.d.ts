import { Model } from 'mongoose';
import { IArea } from './schemas/area.schema';
import { CreateAreaDto } from './dto/area.dto';
import { UserAuth } from '@shared/interfaces';
export declare class AreaService {
    private readonly _model;
    constructor(_model: Model<IArea>);
    getUserById(id: string, tenantId: string): Promise<import("mongoose").Document<any, any, IArea> & IArea & {
        _id: string;
    }>;
    getAll(userAuth: UserAuth): Promise<IArea[]>;
    create(userAuth: UserAuth, data: CreateAreaDto): Promise<IArea>;
    updateArea(userAuth: UserAuth, update: CreateAreaDto, id: string): Promise<void>;
    deleteArea(userAuth: UserAuth, id: string): Promise<void>;
}
