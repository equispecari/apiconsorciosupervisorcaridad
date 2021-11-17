export interface JwtPayload extends UserAuth {
  iat?: number;
  exp?: number;
}

export interface UserAuth {
  id: string;
  role: UserPermistions | null;
}

export interface UserPermistions {
  id: string;
  role: string;
}
