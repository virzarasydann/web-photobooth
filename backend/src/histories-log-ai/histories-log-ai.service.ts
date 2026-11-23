import { Injectable } from '@nestjs/common';
import { CreateHistoriesLogAiDto } from './dto/create-histories-log-ai.dto.js';
import { UpdateHistoriesLogAiDto } from './dto/update-histories-log-ai.dto.js';

@Injectable()
export class HistoriesLogAiService {
  create(createHistoriesLogAiDto: CreateHistoriesLogAiDto) {
    return 'This action adds a new historiesLogAi';
  }

  findAll() {
    return `This action returns all historiesLogAi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historiesLogAi`;
  }

  update(id: number, updateHistoriesLogAiDto: UpdateHistoriesLogAiDto) {
    return `This action updates a #${id} historiesLogAi`;
  }

  remove(id: number) {
    return `This action removes a #${id} historiesLogAi`;
  }
}
