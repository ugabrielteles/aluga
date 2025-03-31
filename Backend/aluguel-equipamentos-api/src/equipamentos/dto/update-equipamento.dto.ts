import { 
    IsOptional, 
    IsNumber, 
    IsPositive, 
    IsString, 
    IsEnum,
    IsDateString
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  import { PartialType } from '@nestjs/swagger';
  import { CreateEquipamentoDto } from './create-equipamento.dto';
  
  export class UpdateEquipamentoDto extends PartialType(CreateEquipamentoDto) {
    @ApiProperty({
      required: false,
      description: 'ID da categoria do equipamento',
      example: 1
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    categoriaId?: number;
  
    @ApiProperty({
      required: false,
      description: 'Nome do equipamento',
      example: 'Betoneira 400L'
    })
    @IsOptional()
    @IsString()
    nome?: string;
  
    @ApiProperty({
      required: false,
      description: 'Descrição detalhada do equipamento',
      example: 'Betoneira elétrica com capacidade para 400 litros'
    })
    @IsOptional()
    @IsString()
    descricao?: string;
  
    @ApiProperty({
      required: false,
      description: 'Modelo do equipamento',
      example: 'BT-400'
    })
    @IsOptional()
    @IsString()
    modelo?: string;
  
    @ApiProperty({
      required: false,
      description: 'Fabricante do equipamento',
      example: 'Tramontina'
    })
    @IsOptional()
    @IsString()
    fabricante?: string;
  
    @ApiProperty({
      required: false,
      description: 'Número de série do equipamento',
      example: 'SN-123456789'
    })
    @IsOptional()
    @IsString()
    numeroSerie?: string;
  
    @ApiProperty({
      required: false,
      description: 'Valor da diária de aluguel',
      example: 150.00,
      minimum: 0.01
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    valorDiaria?: number;
  
    @ApiProperty({
      required: false,
      description: 'Valor do aluguel semanal (opcional)',
      example: 750.00,
      minimum: 0.01
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    valorSemanal?: number;
  
    @ApiProperty({
      required: false,
      description: 'Valor do aluguel mensal (opcional)',
      example: 2500.00,
      minimum: 0.01
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    valorMensal?: number;
  
    @ApiProperty({
      required: false,
      description: 'Quantidade total em estoque',
      example: 5,
      minimum: 0
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    quantidadeTotal?: number;
  
    @ApiProperty({
      required: false,
      description: 'Data de aquisição do equipamento',
      example: '2023-01-15'
    })
    @IsOptional()
    @IsDateString()
    dataAquisicao?: Date;
  
    @ApiProperty({
      required: false,
      description: 'Valor de aquisição do equipamento',
      example: 5000.00,
      minimum: 0
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    valorAquisicao?: number;
  
    @ApiProperty({
      required: false,
      description: 'Status de ativação do equipamento',
      example: true
    })
    @IsOptional()
    ativo?: boolean;
  }