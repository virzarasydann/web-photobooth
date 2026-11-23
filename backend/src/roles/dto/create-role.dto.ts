import { TimestampString } from "@prisma/orm-postgres/contract-builder";
import { IsString, MaxLength, IsOptional, IsEnum, MinLength } from "class-validator";


export class CreateRoleDto {
    @IsString()
    @MinLength(1, {message: "Nama Role Minimal 1"})
    @MaxLength(20, {message: "Nama Role Maksimal 20"})
  name: string;

  
  @IsEnum(['Aktif', 'Tidak Aktif'], {message: "Status harus Aktif / Tidak Aktif"})
  status?: 'Aktif' | 'Tidak Aktif';
}
