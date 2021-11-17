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
}
