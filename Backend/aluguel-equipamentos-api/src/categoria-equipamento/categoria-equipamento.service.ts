import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriaEquipamentoDto } from './dto/create-categoria-equipamento.dto';
import { UpdateCategoriaEquipamentoDto } from './dto/update-categoria-equipamento.dto';
import { CategoriaEquipamento } from './entities/categoria-equipamento.entity'

@Injectable()
export class CategoriaEquipamentoService {
  constructor(
    @InjectRepository(CategoriaEquipamento)
    private readonly categoryRepository: Repository<CategoriaEquipamento>,
  ) {}

  async create(createCategoryDto: CreateCategoriaEquipamentoDto): Promise<CategoriaEquipamento> {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async findAll(): Promise<CategoriaEquipamento[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: number): Promise<CategoriaEquipamento> {
    const category = await this.categoryRepository.findOne({ where: { categoria_id: id } });
    if (!category) {
      throw new NotFoundException(`Equipment category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoriaEquipamentoDto): Promise<CategoriaEquipamento> {
    const category = await this.findOne(id);
    this.categoryRepository.merge(category, updateCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Equipment category with ID ${id} not found`);
    }
  }
}