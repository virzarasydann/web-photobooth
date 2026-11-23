import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto.js';
import { IsString, MinLength, MaxLength, IsEnum, IsOptional } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {


        @IsString()
        @IsOptional()
            
      name: string;
    
      @IsOptional()
      @IsEnum(['Aktif', 'Tidak Aktif'], {message: "Status harus Aktif / Tidak Aktif"})
      status?: 'Aktif' | 'Tidak Aktif';
}
