import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OperationRepository } from '@shared/infraestructure/base.repository';
import { Tenant, TenantDocument } from './entities/tenant.entity';

@Injectable()
export class TenantRepository extends OperationRepository<TenantDocument> {
  constructor(
    @InjectModel(Tenant.name)
    private readonly model: Model<TenantDocument>,
  ) {
    super(model);
  }
}
