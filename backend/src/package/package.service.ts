import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { Scalars } from '@prisma/orm-postgres/family-contract/types';
import { Models } from '../prisma/contract.js';
import { CreatePackageDto } from './dto/create-package.dto.js';
import { UpdatePackageDto } from './dto/update-package.dto.js';

export type Package = Scalars<Models.public_Package>;

@Injectable()
export class PackageService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async create(createPackageDto: CreatePackageDto): Promise<Package> {
    return this.prisma.db.orm.public.Package.create(createPackageDto);
  }

  async findAll(): Promise<{ message: string; data: Package[] }> {
    const packages = await this.prisma.db.orm.public.Package.all();

    if (packages.length === 0) {
      return {
        message: 'Tidak ada data package',
        data: [],
      };
    }

    return {
      message: 'Data package berhasil diambil',
      data: packages,
    };
  }

  async findOne(id: string): Promise<Package> {
    const pkg = await this.prisma.db.orm.public.Package.whereUnique({
      id,
    }).first();
    if (!pkg) throw new NotFoundException(`Package ${id} tidak ditemukan`);
    return pkg;
  }

  async update(id: string, updatePackageDto: UpdatePackageDto) {
    const updated = await this.prisma.db.orm.public.Package.where({
      id,
    }).update(updatePackageDto);
    if (!updated) throw new NotFoundException(`Package ${id} tidak ditemukan`);
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.prisma.db.orm.public.Package.where({
      id,
    }).delete();
    if (!deleted) throw new NotFoundException(`Package ${id} tidak ditemukan`);
    return { message: `Package ${id} berhasil dihapus` };
  }
}
