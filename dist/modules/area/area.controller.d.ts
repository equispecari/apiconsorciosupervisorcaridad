import { CreateAreaDto } from './dto/area.dto';
import { AreaService } from './area.service';
import { UserAuth } from '@shared/interfaces';
export declare class AreaController {
    private readonly _areaService;
    constructor(_areaService: AreaService);
    creaTramite(userAuth: UserAuth, data: CreateAreaDto): Promise<{
        message: import("./schemas/area.schema").IArea;
    }>;
    updateTramite(userAuth: UserAuth, data: CreateAreaDto, id: string): Promise<{
        message: string;
    }>;
    deleteTramite(userAuth: UserAuth, id: string): Promise<{
        message: string;
    }>;
    getMyDocuments(userAuth: UserAuth): Promise<import("./schemas/area.schema").IArea[]>;
}
