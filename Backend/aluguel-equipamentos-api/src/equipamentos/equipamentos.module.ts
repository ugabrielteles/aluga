import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipamentosService } from './equipamentos.service';
import { EquipamentosController } from './equipamentos.controller';
import { Equipamento } from './entities/equipamento.entity';
import { CategoriaEquipamento } from './entities/categoria-equipamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equipamento, CategoriaEquipamento])],
  controllers: [EquipamentosController],
  providers: [EquipamentosService],
  exports: [EquipamentosService],
})
export class EquipamentosModule {}