import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Equipamento } from './entities/equipamento.entity';
import { CreateEquipamentoDto } from './dto/create-equipamento.dto';
import { UpdateEquipamentoDto } from './dto/update-equipamento.dto';
import { CategoriaEquipamento } from 'src/categoria-equipamento/entities/categoria-equipamento.entity';
import { CategoriaEquipamentoService } from 'src/categoria-equipamento/categoria-equipamento.service';

@Injectable()
export class EquipamentosService {
  constructor(
    @InjectRepository(Equipamento)
    private equipamentoRepository: Repository<Equipamento>,
    private readonly categoriaService: CategoriaEquipamentoService
  ) {}

  async create(createEquipamentoDto: CreateEquipamentoDto): Promise<Equipamento> {
    const categoria = await this.categoriaService.findOne(createEquipamentoDto.categoriaId);
    
    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }

    const equipamento = this.equipamentoRepository.create({
      ...createEquipamentoDto,
      categoria,
      quantidadeDisponivel: createEquipamentoDto.quantidadeTotal,
    });

    return this.equipamentoRepository.save(equipamento);
  }

  async findAll(search?: string): Promise<Equipamento[]> {
    if (search) {
      return this.equipamentoRepository.find({
        where: [
          { nome: Like(`%${search}%`) },
          { modelo: Like(`%${search}%`) },
          { fabricante: Like(`%${search}%`) },
          { numeroSerie: Like(`%${search}%`) },
        ],
        relations: ['categoria'],
      });
    }
    return this.equipamentoRepository.find({ relations: ['categoria'] });
  }

  async findOne(id: number): Promise<Equipamento> {
    const equipamento = await this.equipamentoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });

    if (!equipamento) {
      throw new NotFoundException(`Equipamento com ID ${id} não encontrado`);
    }

    return equipamento;
  }

  async update(id: number, updateEquipamentoDto: UpdateEquipamentoDto): Promise<Equipamento> {
    const equipamento = await this.findOne(id);
    
    if (updateEquipamentoDto.categoriaId) {
      const categoria = await this.categoriaService.findOne(updateEquipamentoDto.categoriaId);
      
      if (!categoria) {
        throw new NotFoundException('Categoria não encontrada');
      }
      equipamento.categoria = categoria;
    }

    const updated = this.equipamentoRepository.merge(equipamento, updateEquipamentoDto);
    return this.equipamentoRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const equipamento = await this.findOne(id);
    await this.equipamentoRepository.remove(equipamento);
  }

  async checkAvailability(id: number, start: Date, end: Date): Promise<{ available: number }> {
    const equipamento = await this.findOne(id);
    
    // Aqui você implementaria a lógica para verificar quantos equipamentos estão disponíveis
    // no período solicitado, considerando os contratos existentes
    
    return { available: equipamento.quantidadeDisponivel };
  }
}