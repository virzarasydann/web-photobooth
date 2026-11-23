import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoriesLogAiService } from './histories-log-ai.service.js';
import { CreateHistoriesLogAiDto } from './dto/create-histories-log-ai.dto.js';
import { UpdateHistoriesLogAiDto } from './dto/update-histories-log-ai.dto.js';

@Controller('histories-log-ai')
export class HistoriesLogAiController {
  constructor(private readonly historiesLogAiService: HistoriesLogAiService) {}

  @Post()
  create(@Body() createHistoriesLogAiDto: CreateHistoriesLogAiDto) {
    return this.historiesLogAiService.create(createHistoriesLogAiDto);
  }

  @Get()
  findAll() {
    return this.historiesLogAiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historiesLogAiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoriesLogAiDto: UpdateHistoriesLogAiDto) {
    return this.historiesLogAiService.update(+id, updateHistoriesLogAiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historiesLogAiService.remove(+id);
  }
}
