import { ApiProperty } from '@nestjs/swagger';

export class ClienteResponseDto {
  @ApiProperty()
  cliente_id: number;

  @ApiProperty()
  nome: string;

  @ApiProperty({ enum: ['pessoa_fisica', 'pessoa_juridica'] })
  tipo: string;

  @ApiProperty()
  cpf_cnpj: string;

  @ApiProperty({ required: false })
  rg_ie?: string;

  @ApiProperty({ required: false })
  endereco?: string;

  @ApiProperty({ required: false })
  cidade?: string;

  @ApiProperty({ required: false })
  estado?: string;

  @ApiProperty({ required: false })
  cep?: string;

  @ApiProperty({ required: false })
  telefone?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty()
  ativo: boolean;

  @ApiProperty()
  data_cadastro: Date;
}