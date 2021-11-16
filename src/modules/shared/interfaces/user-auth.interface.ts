export interface JwtPayload extends UserAuth {
  iat?: number;
  exp?: number;
}

export interface UserAuth {
  id: string;
  role: string;
}
