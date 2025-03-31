import { IsNotEmpty, IsNumber, IsPositive, IsIn } from 'class-validator';

export class AddItemContratoDto {
  @IsNotEmpty()
  @IsNumber()
  equipamento_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantidade: number;

  @IsNotEmpty()
  @IsIn(['diaria', 'semanal', 'mensal'])
  periodo: 'diaria' | 'semanal' | 'mensal';
}