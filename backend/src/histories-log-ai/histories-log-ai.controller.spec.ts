import { Test, TestingModule } from '@nestjs/testing';
import { HistoriesLogAiController } from './histories-log-ai.controller.js';
import { HistoriesLogAiService } from './histories-log-ai.service.js';

describe('HistoriesLogAiController', () => {
  let controller: HistoriesLogAiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoriesLogAiController],
      providers: [HistoriesLogAiService],
    }).compile();

    controller = module.get<HistoriesLogAiController>(HistoriesLogAiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
