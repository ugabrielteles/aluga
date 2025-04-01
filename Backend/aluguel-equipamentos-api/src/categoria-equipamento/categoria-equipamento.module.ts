import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEquipamentoController } from './categoria-equipamento.controller';
import { CategoriaEquipamentoService } from './categoria-equipamento.service';
import { CategoriaEquipamento } from './entities/categoria-equipamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaEquipamento])],
  controllers: [CategoriaEquipamentoController],
  providers: [CategoriaEquipamentoService],
  exports: [CategoriaEquipamentoService],
})
export class CategoriaEquipamentoModule {}