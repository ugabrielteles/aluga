import { IsNotEmpty, IsString, IsEnum, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClienteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ enum: ['pessoa_fisica', 'pessoa_juridica'] })
  @IsNotEmpty()
  @IsEnum(['pessoa_fisica', 'pessoa_juridica'])
  tipo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cpfCnpj: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  rgIe?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  endereco?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cidade?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  estado?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cep?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  telefone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  observacoes?: string;
}