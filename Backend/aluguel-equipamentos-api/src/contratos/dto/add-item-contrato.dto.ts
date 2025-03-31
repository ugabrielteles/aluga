import { IsNotEmpty, IsNumber, IsPositive, IsIn } from 'class-validator';

export class AddItemContratoDto {
  @IsNotEmpty()
  @IsNumber()
  equipamentoId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantidade: number;

  @IsNotEmpty()
  @IsIn(['diaria', 'semanal', 'mensal'])
  periodo: 'diaria' | 'semanal' | 'mensal';
}