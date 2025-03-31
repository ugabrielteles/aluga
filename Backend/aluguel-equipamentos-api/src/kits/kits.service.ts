import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kit } from './entities/kit.entity';
import { CreateKitDto } from './dto/create-kit.dto';
import { UpdateKitDto } from './dto/update-kit.dto';
import { AddItemKitDto } from './dto/add-item-kit.dto';
import { Equipamento } from '../equipamentos/entities/equipamento.entity';
import { KitItem } from './entities/kit-item.entity';

@Injectable()
export class KitsService {
  constructor(
    @InjectRepository(Kit)
    private kitRepository: Repository<Kit>,
    @InjectRepository(KitItem)
    private kitItemRepository: Repository<KitItem>,
    @InjectRepository(Equipamento)
    private equipamentoRepository: Repository<Equipamento>,
  ) {}

  async create(createKitDto: CreateKitDto): Promise<Kit> {
    const kit = this.kitRepository.create(createKitDto);
    return this.kitRepository.save(kit);
  }

  async findAll(): Promise<Kit[]> {
    return this.kitRepository.find({ relations: ['itens', 'itens.equipamento'] });
  }

  async findOne(id: number): Promise<Kit> {
    const kit = await this.kitRepository.findOne({
      where: { id },
      relations: ['itens', 'itens.equipamento'],
    });

    if (!kit) {
      throw new NotFoundException(`Kit com ID ${id} não encontrado`);
    }

    return kit;
  }

  async update(id: number, updateKitDto: UpdateKitDto): Promise<Kit> {
    const kit = await this.findOne(id);
    const updated = this.kitRepository.merge(kit, updateKitDto);
    return this.kitRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const kit = await this.findOne(id);
    await this.kitRepository.remove(kit);
  }

  async addItem(kitId: number, addItemKitDto: AddItemKitDto): Promise<KitItem> {
    const kit = await this.findOne(kitId);
    const equipamento = await this.equipamentoRepository.findOne({
      where: { id: addItemKitDto.equipamentoId },
    });

    if (!equipamento) {
      throw new NotFoundException(`Equipamento com ID ${addItemKitDto.equipamentoId} não encontrado`);
    }

    const kitItem = this.kitItemRepository.create({
      kit,
      equipamento,
      quantidade: addItemKitDto.quantidade,
    });

    return this.kitItemRepository.save(kitItem);
  }

  async removeItem(kitId: number, itemId: number): Promise<void> {
    const kitItem = await this.kitItemRepository.findOne({
      where: { id: itemId, kit: { id: kitId } },
    });

    if (!kitItem) {
      throw new NotFoundException(`Item do kit não encontrado`);
    }

    await this.kitItemRepository.remove(kitItem);
  }
}