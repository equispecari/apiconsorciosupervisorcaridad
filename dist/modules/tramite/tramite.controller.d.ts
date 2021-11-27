import { ObservacionesReqDto, DerivarReqDto, CreateReqInfoDto, QuerysReqDto, idReqDto, UpdateReqInfoDto, RechazadoReqDto } from './dto';
import { AreaService } from '../area/area.service';
import { TenantService } from '../tenant/tenant.service';
import { UploadService } from '../upload/upload.service';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';
import { UserAuth } from '@shared/interfaces';
import { TramiteService } from './tramite.service';
export declare class TramiteController {
    private readonly _userService;
    private readonly _reqDocService;
    private readonly _awsS3Service;
    private readonly _incrementService;
    private readonly _nodemailder;
    private readonly _areaService;
    constructor(_userService: UserService, _reqDocService: TramiteService, _awsS3Service: UploadService, _incrementService: TenantService, _nodemailder: MailService, _areaService: AreaService);
    createTramite(userAuth: UserAuth, create: CreateReqInfoDto): Promise<{
        message: import("mongoose").Document<any, any, import("./schemas").IRequestDoc> & import("./schemas").IRequestDoc & {
            _id: string;
        };
    }>;
    updateTramite(userAuth: UserAuth, update: UpdateReqInfoDto, id: string): Promise<{
        message: string;
    }>;
    deleteUploadObj(key: string): Promise<{
        message: string;
    }>;
    deribaTramite(userAuth: UserAuth, data: DerivarReqDto): Promise<{
        message: import("mongoose").Document<any, any, import("./schemas").IRequestDoc> & import("./schemas").IRequestDoc & {
            _id: string;
        };
    }>;
    observarTramite(userAuth: UserAuth, data: ObservacionesReqDto): Promise<{
        message: import("mongoose").Document<any, any, import("./schemas").IRequestDoc> & import("./schemas").IRequestDoc & {
            _id: string;
        };
    }>;
    rechazarTramite(userAuth: UserAuth, data: RechazadoReqDto): Promise<{
        message: import("mongoose").Document<any, any, import("./schemas").IRequestDoc> & import("./schemas").IRequestDoc & {
            _id: string;
        };
    }>;
    getDocuments(userAuth: UserAuth, querys: QuerysReqDto): Promise<{
        data: import("./schemas").IRequestDoc[];
        total: number;
    }>;
    getMyDocuments(userAuth: UserAuth, querys: QuerysReqDto): Promise<{
        data: import("./schemas").IRequestDoc[];
        total: number;
    }>;
    getDocumentByNro(param: {
        num_serie: string;
    }): Promise<{
        message: import("./schemas").IRequestDoc;
    }>;
    getDocumentById(userAuth: UserAuth, param: idReqDto): Promise<{
        message: import("mongoose").Document<any, any, import("./schemas").IRequestDoc> & import("./schemas").IRequestDoc & {
            _id: string;
        };
    }>;
}
