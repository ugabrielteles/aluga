import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateClienteDto } from './create-cliente.dto';
import { IsOptional } from 'class-validator';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  @ApiProperty({ required: false })
  @IsOptional()
  ativo?: boolean;
}