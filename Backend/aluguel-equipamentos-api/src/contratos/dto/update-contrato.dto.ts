import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateContratoDto } from './create-contrato.dto';

export class UpdateContratoDto extends PartialType(CreateContratoDto) {
}