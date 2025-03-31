import { 
    IsOptional, 
    IsEnum, 
    IsDateString, 
    IsNumber 
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class FilterMovimentacoesDto {
    @ApiProperty({ 
      enum: ['entrada', 'saida'],
      required: false 
    })
    @IsOptional()
    @IsEnum(['entrada', 'saida'])
    tipo?: 'entrada' | 'saida';
  
    @ApiProperty({ 
      enum: ['compra', 'devolucao', 'aluguel', 'avaria', 'perda'],
      required: false 
    })
    @IsOptional()
    @IsEnum(['compra', 'devolucao', 'aluguel', 'avaria', 'perda'])
    origem?: 'compra' | 'devolucao' | 'aluguel' | 'avaria' | 'perda';
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    dataInicio?: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    dataFim?: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    equipamentoId?: number;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    usuarioId?: number;
  }