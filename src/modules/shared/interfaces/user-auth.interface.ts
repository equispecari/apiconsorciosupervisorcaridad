export interface JwtPayload extends UserAuth {
  iat: number;
  exp: number;
}

export interface UserAuth {
  sub: string;
  role: string;
}
