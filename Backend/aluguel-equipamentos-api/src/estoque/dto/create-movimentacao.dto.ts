import { 
    IsNotEmpty, 
    IsNumber, 
    IsPositive, 
    IsEnum, 
    IsOptional 
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateMovimentacaoDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    equipamentoId: number;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantidade: number;
  
    @ApiProperty({ enum: ['entrada', 'saida'] })
    @IsNotEmpty()
    @IsEnum(['entrada', 'saida'])
    tipo: 'entrada' | 'saida';
  
    @ApiProperty({ 
      enum: ['compra', 'devolucao', 'aluguel', 'avaria', 'perda'],
      description: 'compra/devolucao para entrada; aluguel/avaria/perda para saída'
    })
    @IsNotEmpty()
    @IsEnum(['compra', 'devolucao', 'aluguel', 'avaria', 'perda'])
    origem: 'compra' | 'devolucao' | 'aluguel' | 'avaria' | 'perda';
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    referenciaId?: number;
  
    @ApiProperty({ required: false })
    @IsOptional()
    observacoes?: string;
  }