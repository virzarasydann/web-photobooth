import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoriesLogAiDto } from './create-histories-log-ai.dto.js';

export class UpdateHistoriesLogAiDto extends PartialType(CreateHistoriesLogAiDto) {}
