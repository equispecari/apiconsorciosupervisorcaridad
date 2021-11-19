import { ConfigService } from '@nestjs/config';
export declare class AppModule {
    private readonly configService;
    static port: number;
    constructor(configService: ConfigService);
}
