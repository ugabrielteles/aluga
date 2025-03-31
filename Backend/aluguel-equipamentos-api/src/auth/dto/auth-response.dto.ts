import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  usuario: {
    id: number;
    nome: string;
    email: string;
    cargo: string;
  };
}