import { ApiProperty } from '@nestjs/swagger';

export class KitResponseDto {
  @ApiProperty()
  kit_id: number;

  @ApiProperty()
  nome: string;

  @ApiProperty({ required: false })
  descricao?: string;

  @ApiProperty()
  valor_diaria: number;

  @ApiProperty({ required: false })
  valor_semanal?: number;

  @ApiProperty({ required: false })
  valor_mensal?: number;

  @ApiProperty()
  ativo: boolean;

  @ApiProperty()
  itens: KitItemResponseDto[];
}

export class KitItemResponseDto {
  @ApiProperty()
  kit_item_id: number;

  @ApiProperty()
  equipamento_id: number;

  @ApiProperty()
  equipamento_nome: string;

  @ApiProperty()
  quantidade: number;
}