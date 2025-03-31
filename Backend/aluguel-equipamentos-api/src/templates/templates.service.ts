import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContratoTemplate } from './entities/contrato-template.entity';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { Usuario } from '../auth/entities/usuario.entity';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(ContratoTemplate)
    private templateRepository: Repository<ContratoTemplate>,
  ) {}

  async create(createTemplateDto: CreateTemplateDto, usuario: Usuario): Promise<ContratoTemplate> {
    const template = this.templateRepository.create({
      ...createTemplateDto,
      usuario,
    });

    return this.templateRepository.save(template);
  }

  async findAll(): Promise<ContratoTemplate[]> {
    return this.templateRepository.find({ relations: ['usuario'] });
  }

  async findOne(id: number): Promise<ContratoTemplate> {
    const template = await this.templateRepository.findOne({ 
      where: { id },
      relations: ['usuario'],
    });

    if (!template) {
      throw new NotFoundException(`Template com ID ${id} não encontrado`);
    }

    return template;
  }

  async findDefault(): Promise<ContratoTemplate> {
    const template = await this.templateRepository.findOne({ 
      where: { padrao: true },
      relations: ['usuario'],
    });

    if (!template) {
      throw new NotFoundException('Nenhum template padrão definido');
    }

    return template;
  }

  async update(id: number, updateTemplateDto: UpdateTemplateDto): Promise<ContratoTemplate> {
    const template = await this.findOne(id);
    const updated = this.templateRepository.merge(template, updateTemplateDto);
    return this.templateRepository.save(updated);
  }

  async setAsDefault(id: number): Promise<ContratoTemplate> {
    // Primeiro, remove o padrão de todos os templates
    await this.templateRepository.update({ padrao: true }, { padrao: false });
    
    // Depois, define o novo template como padrão
    const template = await this.findOne(id);
    template.padrao = true;
    return this.templateRepository.save(template);
  }

  async remove(id: number): Promise<void> {
    const template = await this.findOne(id);
    await this.templateRepository.remove(template);
  }
}