import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export enum StatusData {
  AKTIF = 'AKTIF',
  NON_AKTIF = 'NON_AKTIF',
}

export class CreatePackageDto {
  @IsString({ message: 'Nama paket harus berupa teks' })
  @IsNotEmpty({ message: 'Nama paket tidak boleh kosong' })
  @MaxLength(100, { message: 'Nama paket maksimal 100 karakter' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Deskripsi harus berupa teks' })
  description?: string;

  @IsOptional()
  @IsEnum(StatusData, {
    message: 'Status harus bernilai AKTIF atau NON_AKTIF',
  })
  status?: StatusData;

  @IsOptional()
  @IsBoolean({ message: 'Populer harus berupa boolean (true/false)' })
  populer?: boolean;

  @IsInt({ message: 'Harga harus berupa bilangan bulat' })
  @Min(0, { message: 'Harga tidak boleh kurang dari 0' })
  @IsNotEmpty({ message: 'Harga tidak boleh kosong' })
  harga: number;

  @IsOptional()
  @IsString({ message: 'Satuan harus berupa teks' })
  @MaxLength(10, { message: 'Satuan maksimal 10 karakter' })
  satuan?: string;

  @IsOptional()
  @IsString({ message: 'Catatan harus berupa teks' })
  catatan?: string;
}
