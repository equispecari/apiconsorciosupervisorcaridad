import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
export declare class TenantController {
    private readonly tenantService;
    constructor(tenantService: TenantService);
    create(createTenantDto: CreateTenantDto): Promise<import("./entities/tenant.entity").TenantDocument>;
    findAll(): Promise<import("./entities/tenant.entity").TenantDocument[]>;
    update(id: string, updateTenantDto: UpdateTenantDto): Promise<import("./entities/tenant.entity").TenantDocument>;
    remove(id: string): Promise<import("./entities/tenant.entity").TenantDocument>;
}
