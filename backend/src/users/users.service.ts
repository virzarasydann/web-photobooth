import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // 1. Cek apakah email sudah dipakai
    const existingUser = await this.prisma.db.orm.public.Users
      .where({ email: createUserDto.email })
      .first();

    if (existingUser) {
      throw new ConflictException('Email sudah digunakan');
    }

    // 2. Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // 3. Simpan ke database
    const user = await this.prisma.db.orm.public.Users.create({
      ...createUserDto,
      password: hashedPassword,
      isActive: createUserDto.isActive ?? true,
    });

    // 4. Hilangkan field password saat dikembalikan ke response
    const { password, ...result } = user;
    return result;
  }

  async findAll() {
    const users = await this.prisma.db.orm.public.Users.all();
    return users.map(({ password, ...user }) => user);
  }

  async findOne(id: string) {
    const user = await this.prisma.db.orm.public.Users
      .whereUnique({ id })
      .first();

    if (!user) {
      throw new NotFoundException(`User ${id} tidak ditemukan`);
    }

    const { password, ...result } = user;
    return result;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    const data = { ...updateUserDto };

    // Kalau password ikut di-update, hash ulang password barunya
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updated = await this.prisma.db.orm.public.Users
      .where({ id })
      .update(data);

    if (!updated) {
      throw new NotFoundException(`User ${id} tidak ditemukan`);
    }

    const { password, ...result } = updated;
    return result;
  }

  async remove(id: string) {
    const deleted = await this.prisma.db.orm.public.Users
      .where({ id })
      .delete();

    if (!deleted) {
      throw new NotFoundException(`User ${id} tidak ditemukan`);
      
    }

    return { message: `User berhasil dihapus` };
  }
}