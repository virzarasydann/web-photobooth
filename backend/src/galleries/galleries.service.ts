import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { Scalars } from '@prisma/orm-postgres/family-contract/types';
import { Models } from '../prisma/contract.js';
import { CreateGalleryDto } from './dto/create-gallery.dto.js';
import { UpdateGalleryDto } from './dto/update-gallery.dto.js';
import * as fs from 'fs';
import { join } from 'path';

export type Gallery = Scalars<Models.public_Galleries>;

@Injectable()
export class GalleriesService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async create(createGalleryDto: CreateGalleryDto): Promise<Gallery> {
    return this.prisma.db.orm.public.Galleries.create(createGalleryDto);
  }

  async findAll(userId?: string): Promise<Gallery[]> {
    if (userId) {
      return this.prisma.db.orm.public.Galleries.where({ idUsers: userId }).all();
    }
    return this.prisma.db.orm.public.Galleries.all();
  }

  async findOne(id: string): Promise<Gallery> {
    const gallery = await this.prisma.db.orm.public.Galleries.whereUnique({ id }).first();
    if (!gallery) {
      throw new NotFoundException(`Galeri foto dengan ID ${id} tidak ditemukan`);
    }
    return gallery;
  }

  async update(id: string, updateGalleryDto: UpdateGalleryDto): Promise<Gallery> {
    const updated = await this.prisma.db.orm.public.Galleries.where({ id }).update(updateGalleryDto);
    if (!updated) {
      throw new NotFoundException(`Galeri foto dengan ID ${id} tidak ditemukan`);
    }
    return updated;
  }

  async remove(id: string): Promise<Gallery> {
    const gallery = await this.findOne(id);

    const deleted = await this.prisma.db.orm.public.Galleries.where({ id }).delete();
    if (!deleted) {
      throw new NotFoundException(`Galeri foto dengan ID ${id} tidak ditemukan`);
    }

    if (gallery.path) {
      try {
        const fullFilePath = join(process.cwd(), gallery.path);
        if (fs.existsSync(fullFilePath)) {
          fs.unlinkSync(fullFilePath);
        }
      } catch (err) {
        console.warn(`Gagal menghapus file fisik ${gallery.path}:`, err);
      }
    }

    return deleted;
  }
}
