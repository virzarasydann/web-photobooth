import { Module } from '@nestjs/common';
import { HistoriesLogAiService } from './histories-log-ai.service.js';
import { HistoriesLogAiController } from './histories-log-ai.controller.js';

@Module({
  controllers: [HistoriesLogAiController],
  providers: [HistoriesLogAiService],
})
export class HistoriesLogAiModule {}
