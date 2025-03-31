import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstoqueService } from './estoque.service';
import { EstoqueController } from './estoque.controller';
import { EstoqueMovimentacao } from './entities/estoque-movimentacao.entity';
import { Equipamento } from '../equipamentos/entities/equipamento.entity';
import { Usuario } from '../auth/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstoqueMovimentacao, Equipamento, Usuario])],
  controllers: [EstoqueController],
  providers: [EstoqueService],
  exports: [EstoqueService],
})
export class EstoqueModule {}