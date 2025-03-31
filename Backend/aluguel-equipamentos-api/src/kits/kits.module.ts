import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KitsService } from './kits.service';
import { KitsController } from './kits.controller';
import { Kit } from './entities/kit.entity';
import { KitItem } from './entities/kit-item.entity';
import { Equipamento } from '../equipamentos/entities/equipamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kit, KitItem, Equipamento])],
  controllers: [KitsController],
  providers: [KitsService],
  exports: [KitsService],
})
export class KitsModule {}