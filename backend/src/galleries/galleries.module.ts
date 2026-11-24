import { Module } from '@nestjs/common';
import { GalleriesService } from './galleries.service.js';
import { GalleriesController } from './galleries.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [GalleriesController],
  providers: [GalleriesService],
  exports: [GalleriesService],
})
export class GalleriesModule {}
