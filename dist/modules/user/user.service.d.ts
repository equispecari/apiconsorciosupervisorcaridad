/// <reference types="node" />
/// <reference types="mongoose" />
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { IFile, UserAuth } from '@shared/interfaces';
import { QueryUsersDto, updateUserDto } from './dto';
import { UploadService } from '../upload/upload.service';
export declare class UserService {
    private readonly userRepository;
    private readonly uploadService;
    constructor(userRepository: UserRepository, uploadService: UploadService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").UserDocument>;
    findAll(): Promise<import("./entities/user.entity").UserDocument[]>;
    updateRoles(id: string, role: string): Promise<import("./entities/user.entity").UserDocument>;
    findByEmail(email: string): Promise<import("./entities/user.entity").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findOne(id: string): Promise<import("./entities/user.entity").UserDocument>;
    changePassword(id: string, newPassword: string): Promise<void>;
    comparePasswords(password: string, userPassword: string): Promise<boolean>;
    private encryptPassword;
    updateInformation(user: UserAuth, update: updateUserDto): Promise<import("./entities/user.entity").UserDocument>;
    uploadImg(user: UserAuth, file: IFile): Promise<{
        message: string;
        statusCode: number;
    }>;
    upLoadImage(id: string, buffer: Buffer, originalname: string): Promise<string>;
    getMyDocuments(user: UserAuth, querys: QueryUsersDto): Promise<{
        data: (import("./entities/user.entity").User & import("mongoose").Document<any, any, any> & {
            _id: any;
        })[];
        total: number;
    }>;
    getUserById(id: string): Promise<import("./entities/user.entity").UserDocument>;
}
