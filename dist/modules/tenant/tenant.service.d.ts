import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantRepository } from './tenant.repository';
export declare class TenantService {
    private readonly tenantRepository;
    constructor(tenantRepository: TenantRepository);
    create(createTenantDto: CreateTenantDto): Promise<import("./entities/tenant.entity").TenantDocument>;
    findAll(): Promise<import("./entities/tenant.entity").TenantDocument[]>;
    findById(id: string): Promise<import("./entities/tenant.entity").TenantDocument>;
    update(id: string, updateTenantDto: UpdateTenantDto): Promise<import("./entities/tenant.entity").TenantDocument>;
    remove(id: string): Promise<import("./entities/tenant.entity").TenantDocument>;
    getSede(tenantId: string): Promise<import("./entities/tenant.entity").TenantDocument>;
    getNumDocSede(tenantId: string): Promise<import("./entities/tenant.entity").TenantDocument>;
    getNumDocSedeNotSum(tenantId: string): Promise<import("./entities/tenant.entity").TenantDocument>;
}
