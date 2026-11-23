import { Test, TestingModule } from '@nestjs/testing';
import { HistoriesLogAiService } from './histories-log-ai.service.js';

describe('HistoriesLogAiService', () => {
  let service: HistoriesLogAiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoriesLogAiService],
    }).compile();

    service = module.get<HistoriesLogAiService>(HistoriesLogAiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
