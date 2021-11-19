import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@shared/interfaces';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly _configService;
    constructor(_configService: ConfigService);
    validate(payload: JwtPayload): Promise<JwtPayload>;
}
export {};
