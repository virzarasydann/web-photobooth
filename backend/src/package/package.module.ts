import { Module } from '@nestjs/common';
import { PackageService } from './package.service.js';
import { PackageController } from './package.controller.js';

@Module({
  controllers: [PackageController],
  providers: [PackageService],
})
export class PackageModule {}
