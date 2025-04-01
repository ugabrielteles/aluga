import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipamentosService } from './equipamentos.service';
import { EquipamentosController } from './equipamentos.controller';
import { Equipamento } from './entities/equipamento.entity';
import { CategoriaEquipamentoModule } from 'src/categoria-equipamento/categoria-equipamento.module';

@Module({
  imports: [TypeOrmModule.forFeature([Equipamento]), CategoriaEquipamentoModule],
  controllers: [EquipamentosController],
  providers: [EquipamentosService],
  exports: [EquipamentosService],
})
export class EquipamentosModule {}