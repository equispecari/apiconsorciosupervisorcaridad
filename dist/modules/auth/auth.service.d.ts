import { UserAuth } from '@shared/interfaces';
import { CreateUserDto, ResetPassSendMail, ResetPassword, UserSigninDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'modules/user/user.service';
import { Auth, AuthDocument } from './entities/auth.entity';
import { Model } from 'mongoose';
import { TenantService } from 'modules/tenant/tenant.service';
import { MailService } from 'modules/mail/mail.service';
export declare class AuthService {
    private readonly model;
    private readonly _jwtService;
    private readonly userService;
    private readonly tenantService;
    private readonly mailService;
    private readonly authAdmin;
    constructor(model: Model<AuthDocument>, _jwtService: JwtService, userService: UserService, tenantService: TenantService, mailService: MailService);
    signinAdmin(signinDto: UserSigninDto): Promise<{
        token: string;
    }>;
    createUser(newUser: CreateUserDto): Promise<{
        user: import("../user/entities/user.entity").UserDocument;
        token: string;
    }>;
    chooseRole(sede: string, userAuth: UserAuth): Promise<{
        token: string;
        tenant: import("../tenant/entities/tenant.entity").TenantDocument;
    }>;
    renewToken(tokenAuth: string): Promise<{
        token: string;
        user: import("../user/entities/user.entity").UserDocument;
        tenant: import("../tenant/entities/tenant.entity").TenantDocument;
    }>;
    signin(userSigninDto: UserSigninDto): Promise<{
        token: string;
        user: import("../user/entities/user.entity").User & import("mongoose").Document<any, any, any> & {
            _id: any;
        };
    }>;
    private generateToken;
    resetPassword(body: ResetPassword): Promise<boolean>;
    resetPassSendMail(body: ResetPassSendMail): Promise<{
        message: string;
    }>;
    private createReset;
    findOneOnTime(token: string): Promise<Auth & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    private removeTokenByid;
}
