import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateAreaDto } from './dto/area.dto';
import { RoleEnum } from '@shared/constants';
import { AreaService } from './area.service';
import { Auth, User } from '@shared/decorators';
import { UserAuth } from '@shared/interfaces';

@Controller('area')
export class AreaController {
  constructor(private readonly _areaService: AreaService) {}

  @Post('create')
  @Auth(RoleEnum.ADMINISTRADOR, RoleEnum.MODERATOR, RoleEnum.ADMIN)
  async creaTramite(@User() userAuth: UserAuth, @Body() data: CreateAreaDto) {
    const nuevo = await this._areaService.create(userAuth, data);

    return { message: nuevo };
  }

  @Put(':id')
  @Auth(RoleEnum.ADMINISTRADOR, RoleEnum.MODERATOR, RoleEnum.ADMIN)
  async updateTramite(
    @User() userAuth: UserAuth,
    @Body() data: CreateAreaDto,
    @Param('id') id: string,
  ) {
    await this._areaService.updateArea(userAuth, data, id);

    return { message: 'Datos actualizados' };
  }

  @Delete(':id')
  @Auth(RoleEnum.ADMINISTRADOR, RoleEnum.MODERATOR, RoleEnum.ADMIN)
  async deleteTramite(@User() userAuth: UserAuth, @Param('id') id: string) {
    await this._areaService.deleteArea(userAuth, id);

    return { message: 'Se elimino correctamente' };
  }

  @Get('getall')
  @Auth(RoleEnum.ADMINISTRADOR, RoleEnum.MODERATOR, RoleEnum.ADMIN)
  async getMyDocuments(@User() userAuth: UserAuth) {
    return await this._areaService.getAll(userAuth);
  }
}
