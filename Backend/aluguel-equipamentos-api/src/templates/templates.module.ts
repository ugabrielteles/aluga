import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { ContratoTemplate } from './entities/contrato-template.entity';
import { Usuario } from '../auth/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContratoTemplate, Usuario])],
  controllers: [TemplatesController],
  providers: [TemplatesService],
  exports: [TemplatesService],
})
export class TemplatesModule {}