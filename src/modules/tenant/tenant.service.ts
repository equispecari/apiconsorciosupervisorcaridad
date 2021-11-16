import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantRepository } from './tenant.repository';

@Injectable()
export class TenantService {
  constructor(private readonly tenantRepository: TenantRepository) {}

  create(createTenantDto: CreateTenantDto) {
    return this.tenantRepository.create(createTenantDto);
  }

  findAll() {
    return this.tenantRepository.list();
  }

  update(id: string, updateTenantDto: UpdateTenantDto) {
    return this.tenantRepository.update(id, updateTenantDto);
  }

  remove(id: string) {
    return this.tenantRepository.delete(id);
  }
}
