import { Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { IRequestDoc } from './schemas/document.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SchemaEnum } from '@shared/constants';

import { CreateReqInfoDto } from './dto';
import { UploadService } from '../upload/upload.service';
import { UserAuth } from '@shared/interfaces';

@Injectable({})
export class TramiteService {
  constructor(
    @InjectModel(SchemaEnum.REQUEST)
    private readonly _model: Model<IRequestDoc>,
    private readonly _awsS3Service: UploadService,
  ) {}

  async getDocById(userAuth: UserAuth, id: string) {
    const findOne = await this._model
      .findOne({ _id: id, tenant: userAuth.tenantId })
      .populate('owner');

    if (!findOne) {
      throw new BadRequestException('No existe este documento');
    }

    return findOne;
  }

  async getUDocById(id: string) {
    const findOne = await this._model.findById(id);

    if (!findOne) {
      throw new BadRequestException('No existe este documento');
    }

    return findOne;
  }

  async getDocByNro(num_serie: string): Promise<IRequestDoc> {
    const findOne = await this._model.findOne({ num_serie }).populate('data');

    if (!findOne) {
      throw new BadRequestException('No existe este documento');
    }

    return findOne;
  }

  async create(data: any) {
    const nuevo = new this._model(data);

    return nuevo;
  }

  async getDocuments(
    query: { sede: string; estado: string } | {} = {},
    skip?: number,
    limit?: number,
  ): Promise<IRequestDoc[]> {
    const findOne = await this._model
      .find(query)
      .sort({ created_at: -1 })
      .skip(skip || 0)
      .limit(limit || 5)
      .populate('owner', 'name lastname')
      .populate('data');
    return findOne;
  }

  async getTotalDocuments(
    query: { sede: string; estado: string } | {} = {},
  ): Promise<number> {
    const findOne = await this._model.countDocuments(query);
    return findOne;
  }
}
