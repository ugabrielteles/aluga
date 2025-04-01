import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCategoriaEquipamentoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;
}