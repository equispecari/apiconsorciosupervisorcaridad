import { Model } from 'mongoose';
import { OperationRepository } from '@shared/infraestructure/base.repository';
import { TenantDocument } from './entities/tenant.entity';
export declare class TenantRepository extends OperationRepository<TenantDocument> {
    private readonly model;
    constructor(model: Model<TenantDocument>);
    getByTenantId(tenantId: string): Promise<TenantDocument>;
}
