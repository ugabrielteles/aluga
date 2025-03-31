import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateContratoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  clienteId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dataInicio: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dataTermino: Date;

  @ApiProperty({ required: false })
  observacoes?: string;
}