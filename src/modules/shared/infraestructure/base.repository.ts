import { AnyKeys, AnyObject, Document, Model } from 'mongoose';
import { UnprocessableEntityException } from '@nestjs/common';
import { BaseRepository } from '../application/base.repository';

export abstract class OperationRepository<T extends Document>
  implements BaseRepository<T>
{
  constructor(protected readonly entityModel: Model<T>) {}

  async getOne(id: string | number): Promise<T> {
    const entity = await this.entityModel.findById(id).exec();
    return entity ? entity : null;
  }

  async getPage(
    page: number,
    limit: number,
  ): Promise<{ data: T[]; total: number }> {
    const data: T[] = await this.entityModel
      .find({})
      .skip(page * limit)
      .limit(limit)
      .exec();
    const total = await this.entityModel.countDocuments({}).exec();
    return { data, total };
  }

  async update(id: string | number, entity: object): Promise<T> {
    const findEntity = await this.entityModel
      .findByIdAndUpdate(id, entity, { new: true })
      .exec();
    return findEntity ? findEntity : null;
  }

  async delete(id: string | number): Promise<T> {
    const deletedEntity = await this.entityModel
      .findByIdAndDelete(id, { new: true })
      .exec();
    return deletedEntity ? deletedEntity : null;
  }

  async list(
    options = {
      where: {},
      relations: [],
      filters: {},
    },
  ): Promise<T[]> {
    const query = this.entityModel.find(
      options.where,
      options.relations,
      options.filters,
    );
    options.relations.forEach((relation) => {
      query.populate(relation);
    });

    try {
      const data = await query.exec();
      return data;
    } catch (error) {
      throw new UnprocessableEntityException("Populated don't works!");
    }
  }

  async create(entity: AnyKeys<T> & AnyObject): Promise<T> {
    try {
      const newEntity = new this.entityModel(entity);
      await newEntity.save();
      return newEntity;
    } catch (error) {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        throw new UnprocessableEntityException('Duplicate key Error! ');
      }
    }
  }
}
