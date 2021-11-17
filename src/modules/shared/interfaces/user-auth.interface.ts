import { Tenant } from 'modules/tenant/entities/tenant.entity';

export interface JwtPayload extends UserAuth {
  iat?: number;
  exp?: number;
}

export interface UserAuth {
  id: string;
  role?: string;
  tenantId?: string;
}

export interface UserPermistions {
  tenant: Tenant | string;
  role: string;
}
