import {
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
    @MaxLength(20, { message: 'Nama maksimal 20 karakter' })
    name: string;

    @IsEmail({}, { message: 'Format email tidak valid' })
    @IsNotEmpty({ message: 'Email tidak boleh kosong' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Password tidak boleh kosong' })
    @MinLength(6, { message: 'Password minimal 6 karakter' })
    password: string;

    @IsOptional()
    //@IsUUID('4', { message: 'idRole harus berupa UUID yang valid' })
    idRole?: string;

    //@IsOptional()
    @IsBoolean({ message: 'isActive harus berupa boolean (true/false)' })
    isActive?: boolean;
}