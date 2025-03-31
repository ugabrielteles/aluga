import { ApiProperty } from '@nestjs/swagger';

export class TemplateResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  conteudo: string;

  @ApiProperty()
  padrao: boolean;

  @ApiProperty()
  dataCriacao: Date;

  @ApiProperty()
  usuario: {
    id: number;
    nome: string;
    email: string;
  };
}