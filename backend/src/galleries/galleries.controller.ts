import {Controller, Get, Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { GalleriesService } from './galleries.service.js';
import { CreateGalleryDto } from './dto/create-gallery.dto.js';
import { UpdateGalleryDto } from './dto/update-gallery.dto.js';
import type { Gallery } from './galleries.service.js';

const storage = diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = './uploads/galleries';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname) || '.png';
    cb(null, `foto-${uniqueSuffix}${ext}`);
  },
});

@Controller('galleries')
export class GalleriesController {
  constructor(private readonly galleriesService: GalleriesService) {}

  /**
   * Endpoint upload file langsung (multipart/form-data)
   * Menyimpan file ke folder uploads/galleries/ dan mencatat path-nya ke database
   */
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
      limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return cb(new BadRequestException('Format file harus berupa gambar (jpg, jpeg, png, webp)'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateGalleryDto,
  ): Promise<Gallery> {
    if (!file) {
      throw new BadRequestException('File foto (field: file) wajib dilampirkan');
    }

    const relativePath = `uploads/galleries/${file.filename}`;

    return this.galleriesService.create({
      path: relativePath,
      idUsers: body.idUsers,
      idTemplates: body.idTemplates,
    });
  }

  /**
   * Endpoint create galeri (Mendukung upload multipart file ATAU JSON path langsung)
   */
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
      limits: { fileSize: 15 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (file && !file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return cb(new BadRequestException('Format file harus berupa gambar (jpg, jpeg, png, webp)'), false);
        }
        cb(null, true);
      },
    }),
  )
  create(
    @Body() createGalleryDto: CreateGalleryDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Gallery> {
    if (file) {
      createGalleryDto.path = `uploads/galleries/${file.filename}`;
    }

    if (!createGalleryDto.path) {
      throw new BadRequestException('Path foto atau lampiran file foto wajib diisi');
    }

    return this.galleriesService.create(createGalleryDto);
  }

  @Get()
  findAll(@Query('userId') userId?: string): Promise<Gallery[]> {
    return this.galleriesService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Gallery> {
    return this.galleriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGalleryDto: UpdateGalleryDto,
  ): Promise<Gallery> {
    return this.galleriesService.update(id, updateGalleryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<Gallery> {
    return this.galleriesService.remove(id);
  }
}
