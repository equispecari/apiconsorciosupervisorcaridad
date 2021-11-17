import { BadRequestException, Injectable } from '@nestjs/common';
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

  findById(id: string) {
    return this.tenantRepository.getOne(id);
  }

  update(id: string, updateTenantDto: UpdateTenantDto) {
    return this.tenantRepository.update(id, updateTenantDto);
  }

  remove(id: string) {
    return this.tenantRepository.delete(id);
  }

  async getSede(tenantId: string) {
    const findOne = await this.tenantRepository.getByTenantId(tenantId);

    if (!findOne) {
      throw new BadRequestException('No existe este sede');
    }

    return findOne;
  }

  async getNumDocSede(tenantId: string) {
    const sede = await this.getSede(tenantId);
    sede.nro_doc += 1;
    await sede.save();
    return sede;
  }

  async getNumDocSedeNotSum(tenantId: string) {
    const sede = await this.getSede(tenantId);
    return sede;
  }
}
