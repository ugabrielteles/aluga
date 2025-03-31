import { 
    IsOptional, 
    IsString, 
    IsNumber, 
    IsPositive 
  } from 'class-validator';
  
  export class UpdateKitDto {
    @IsOptional()
    @IsString()
    nome?: string;
  
    @IsOptional()
    @IsString()
    descricao?: string;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    valor_diaria?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    valor_semanal?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    valor_mensal?: number;
  
    @IsOptional()
    ativo?: boolean;
  }