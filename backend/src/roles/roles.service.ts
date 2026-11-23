
import { CreateRoleDto } from './dto/create-role.dto.js';
import { UpdateRoleDto } from './dto/update-role.dto.js';

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { Scalars } from '@prisma/orm-postgres/family-contract/types';
import { Models } from '../prisma/contract.js';

export type Role = Scalars<Models.public_Roles>;


@Injectable()
export class RolesService {

    constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {

  }


  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.prisma.db.orm.public.Roles.create(createRoleDto);
  }


  async findAll(): Promise<Role[]> {
    return this.prisma.db.orm.public.Roles.all()
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.prisma.db.orm.public.Roles.whereUnique({ id }).first();
    if (!role) throw new NotFoundException(`Role ${id} tidak ditemukan`);
    return role;
  }


  async update(id: string, updateRoleDto: UpdateRoleDto) {


        const updated = await this.prisma.db.orm.public.Roles
            .where({ id })
            .update(updateRoleDto);
          if (!updated) throw new NotFoundException(`Role ${id} tidak ditemukan`);
          return updated;
  }

  async remove(id: string): Promise<Role> {
    const deleted = await this.prisma.db.orm.public.Roles
      .where({ id })
      .delete();
    if (!deleted) throw new NotFoundException(`Role ${id} tidak ditemukan`);
    return deleted;
  }

}
