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
  tenantId: string;
  role: string;
}
