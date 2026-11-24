import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(20, { message: 'Nama maksimal 20 karakter' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Format email tidak valid' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password minimal 6 karakter' })
  password?: string;

  @IsOptional()
  @IsUUID('4', { message: 'idRole harus berupa UUID yang valid' })
  idRole?: string;

  @IsOptional()
  @IsBoolean({ message: 'isActive harus berupa boolean (true/false)' })
  isActive?: boolean;
}