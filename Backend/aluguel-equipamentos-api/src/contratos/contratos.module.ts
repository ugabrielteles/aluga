import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratosService } from './contratos.service';
import { ContratosController } from './contratos.controller';
import { Contrato } from './entities/contrato.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Usuario } from '../auth/entities/usuario.entity';
import { StatusContrato } from './entities/status-contrato.entity';
import { ContratoItem } from './entities/contrato-item.entity';
import { ContratoKit } from './entities/contrato-kit.entity';
import { Equipamento } from '../equipamentos/entities/equipamento.entity';
import { Kit } from '../kits/entities/kit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Contrato,
      ContratoItem,
      ContratoKit,
      StatusContrato,
      Cliente,
      Usuario,
      Equipamento,
      Kit,
    ]),
  ],
  controllers: [ContratosController],
  providers: [ContratosService],
  exports: [ContratosService],
})
export class ContratosModule {}