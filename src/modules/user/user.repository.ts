import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OperationRepository } from '@shared/infraestructure/base.repository';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserRepository extends OperationRepository<UserDocument> {
  constructor(
    @InjectModel(User.name)
    private readonly model: Model<UserDocument>,
  ) {
    super(model);
  }

  async findByEmail(email: string) {
    return await this.model.findOne({ email: email });
  }

  async getUsers(tenantId: string, skip?: number, limit?: number) {
    const findUsers = await this.model
      .find({ permisions: { $elemMatch: { tenantId } } })
      .sort({ _id: -1 })
      .skip(skip || 0)
      .limit(limit || 5);
    return findUsers;
  }

  async getTotalUsers(tenantId: string): Promise<number> {
    const findOne = await this.model.countDocuments({
      permisions: { $elemMatch: { tenantId } },
    });
    return findOne;
  }

  async getPermisions(userId: string) {
    const user = await this.model
      .findOne({ _id: userId })
      .populate('permisions.tenant');
    return user.permisions;
  }
}
