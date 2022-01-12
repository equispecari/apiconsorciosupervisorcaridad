/// <reference types="mongoose" />
import { UserAuth } from '@shared/interfaces';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto, ResetPassSendMail, ResetPassword, UserSigninDto } from './dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginAdmin(signinDto: UserSigninDto): Promise<{
        token: string;
    }>;
    createUser(userDni: CreateUserDto): Promise<{
        user: import("../user/entities/user.entity").UserDocument;
        token: string;
    }>;
    selectSede(sede: string, user: UserAuth): Promise<{
        token: string;
        tenant: import("../tenant/entities/tenant.entity").TenantDocument;
    }>;
    loginUser(userSigninDto: UserSigninDto): Promise<{
        token: string;
        user: import("../user/entities/user.entity").User & import("mongoose").Document<any, any, any> & {
            _id: any;
        };
    }>;
    resetPassSendMail(body: ResetPassSendMail): Promise<{
        message: string;
    }>;
    resetPassword(body: ResetPassword): Promise<boolean>;
    reniewTokenModerator(req: Request): Promise<{
        token: string;
        user: import("../user/entities/user.entity").UserDocument;
        tenant: import("../tenant/entities/tenant.entity").TenantDocument;
    }>;
}
