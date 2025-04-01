import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './shared/database.module';
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './clientes/clientes.module';
import { EquipamentosModule } from './equipamentos/equipamentos.module';
import { KitsModule } from './kits/kits.module';
import { ContratosModule } from './contratos/contratos.module';
import { EstoqueModule } from './estoque/estoque.module';
import { TemplatesModule } from './templates/templates.module';
import { LogsModule } from './logs/logs.module';
import { LogsInterceptor } from './logs/logs.interceptor';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    ClientesModule,
    EquipamentosModule,
    KitsModule,
    ContratosModule,
    EstoqueModule,
    TemplatesModule,
    LogsModule,
    CategoriaModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LogsInterceptor,
    },
  ],
})
export class AppModule {}