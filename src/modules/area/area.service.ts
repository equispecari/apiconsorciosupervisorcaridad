import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { IArea } from './schemas/area.schema';
import { SchemaEnum } from '@shared/constants';
import { CreateAreaDto } from './dto/area.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserAuth } from '@shared/interfaces';

@Injectable({})
export class AreaService {
  constructor(
    @InjectModel(SchemaEnum.AREA)
    private readonly _model: Model<IArea>,
  ) {}

  async getUserById(id: string, tenantId: string): Promise<IArea> {
    const findOne = await this._model.findOne({ _id: id, tenant: tenantId });

    if (!findOne) {
      throw new BadRequestException('No existe este area');
    }
    return findOne;
  }

  async getAll(userAuth: UserAuth): Promise<IArea[]> {
    const findAreas = await this._model.find({ tenant: userAuth.tenantId });
    return findAreas;
  }

  async create(userAuth: UserAuth, data: CreateAreaDto): Promise<IArea> {
    const nuevo = new this._model({ ...data, tenant: userAuth.tenantId });
    await nuevo.save();

    return nuevo;
  }

  async updateArea(
    userAuth: UserAuth,
    update: CreateAreaDto,
    id: string,
  ): Promise<void> {
    const updated: any = await this._model.updateOne(
      { _id: id, tenant: userAuth.tenantId },
      update,
    );

    if (!updated.ok) {
      throw new InternalServerErrorException('No se pudo updatear');
    }
  }

  async deleteArea(userAuth: UserAuth, id: string): Promise<void> {
    const deleted: any = await this._model.deleteOne({
      _id: id,
      tenant: userAuth.tenantId,
    });
    if (!deleted.ok) {
      throw new InternalServerErrorException('No se pudo eliminar');
    }
  }
}
