import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Usuario } from '../auth/entities/usuario.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { CategoriaEquipamento } from '../equipamentos/entities/categoria-equipamento.entity';
import { Equipamento } from '../equipamentos/entities/equipamento.entity';
import { Kit } from '../kits/entities/kit.entity';
import { KitItem } from '../kits/entities/kit-item.entity';
import { Contrato } from '../contratos/entities/contrato.entity';
import { ContratoItem } from '../contratos/entities/contrato-item.entity';
import { ContratoKit } from '../contratos/entities/contrato-kit.entity';
import { StatusContrato } from '../contratos/entities/status-contrato.entity';
import { EstoqueMovimentacao } from '../estoque/entities/estoque-movimentacao.entity';
import { ContratoTemplate } from '../templates/entities/contrato-template.entity';
import { Log } from '../logs/entities/log.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [
          Usuario,
          Cliente,
          CategoriaEquipamento,
          Equipamento,
          Kit,
          KitItem,
          Contrato,
          ContratoItem,
          ContratoKit,
          StatusContrato,
          EstoqueMovimentacao,
          ContratoTemplate,
          Log,
        ],
        synchronize: true, // Apenas para desenvolvimento
        logging: true,
      }),
    }),
  ],
})
export class DatabaseModule {}