import { UserService } from './user.service';
import { IFile, UserAuth } from '@shared/interfaces';
import { QueryUsersDto, updateUserDto } from './dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<import("./entities/user.entity").UserDocument[]>;
    updateRoles(body: any): Promise<import("./entities/user.entity").UserDocument>;
    updateInformation(user: UserAuth, update: updateUserDto): Promise<import("./entities/user.entity").UserDocument>;
    uploadImg(user: UserAuth, file: IFile): Promise<{
        message: string;
        statusCode: number;
    }>;
    getMyDocuments(user: UserAuth, querys: QueryUsersDto): Promise<{
        data: (import("./entities/user.entity").User & import("mongoose").Document<any, any, any> & {
            _id: any;
        })[];
        total: number;
    }>;
}
