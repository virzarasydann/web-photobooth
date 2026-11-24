import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateGalleryDto {
  @IsOptional()
  @IsString({ message: 'Path harus berupa teks string lokasi file' })
  path?: string;

  @IsOptional()
  @IsUUID(4, { message: 'idUsers harus berupa UUID v4 yang valid' })
  idUsers?: string;

  @IsOptional()
  @IsUUID(4, { message: 'idTemplates harus berupa UUID v4 yang valid' })
  idTemplates?: string;
}
