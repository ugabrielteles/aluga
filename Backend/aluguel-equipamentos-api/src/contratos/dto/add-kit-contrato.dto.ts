import { 
    IsNotEmpty, 
    IsNumber, 
    IsPositive, 
    IsEnum,
    IsOptional
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class AddKitContratoDto {
    @ApiProperty({
      description: 'ID do kit a ser adicionado ao contrato',
      example: 1
    })
    @IsNotEmpty()
    @IsNumber()
    kitId: number;
  
    @ApiProperty({
      description: 'Quantidade do kit a ser alugada',
      example: 2,
      minimum: 1
    })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantidade: number;
  
    @ApiProperty({
      enum: ['diaria', 'semanal', 'mensal'],
      description: 'Período de cobrança do kit',
      example: 'diaria'
    })
    @IsNotEmpty()
    @IsEnum(['diaria', 'semanal', 'mensal'])
    periodo: 'diaria' | 'semanal' | 'mensal';
  
    @ApiProperty({
      required: false,
      description: 'Observações sobre o kit no contrato',
      example: 'Kit com acessórios especiais'
    })
    @IsOptional()
    observacoes?: string;
  }