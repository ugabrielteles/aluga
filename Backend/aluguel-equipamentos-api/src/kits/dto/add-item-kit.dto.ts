import { 
    IsNotEmpty, 
    IsNumber, 
    IsPositive 
  } from 'class-validator';
  
  export class AddItemKitDto {
    @IsNotEmpty()
    @IsNumber()
    equipamento_id: number;
  
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantidade: number;
  }