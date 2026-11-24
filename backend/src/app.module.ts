import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { RolesModule } from './roles/roles.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { HistoriesLogAiModule } from './histories-log-ai/histories-log-ai.module.js';
import { UsersModule } from './users/users.module.js';
export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    
    RolesModule, PrismaModule, HistoriesLogAiModule, UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
