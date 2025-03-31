import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contrato } from './entities/contrato.entity';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { AddItemContratoDto } from './dto/add-item-contrato.dto';
import { AddKitContratoDto } from './dto/add-kit-contrato.dto';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Usuario } from '../auth/entities/usuario.entity';
import { StatusContrato } from './entities/status-contrato.entity';
import { Equipamento } from '../equipamentos/entities/equipamento.entity';
import { Kit } from '../kits/entities/kit.entity';
import { ContratoItem } from './entities/contrato-item.entity';
import { ContratoKit } from './entities/contrato-kit.entity';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';

@Injectable()
export class ContratosService {
  constructor(
    @InjectRepository(Contrato)
    private contratoRepository: Repository<Contrato>,
    @InjectRepository(StatusContrato)
    private statusRepository: Repository<StatusContrato>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    @InjectRepository(Equipamento)
    private equipamentoRepository: Repository<Equipamento>,
    @InjectRepository(Kit)
    private kitRepository: Repository<Kit>,
    @InjectRepository(ContratoItem)
    private contratoItemRepository: Repository<ContratoItem>,
    @InjectRepository(ContratoKit)
    private contratoKitRepository: Repository<ContratoKit>,
  ) {}

  async create(createContratoDto: CreateContratoDto, usuario: Usuario): Promise<Contrato> {
    const cliente = await this.clienteRepository.findOne({
      where: { id: createContratoDto.clienteId },
    });
    
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const status = await this.statusRepository.findOne({ 
      where: { nome: 'Aguardando Aprovação' } 
    });

    const contrato = this.contratoRepository.create({
      cliente,
      usuario,
      status,
      dataInicio: createContratoDto.dataInicio,
      dataTermino: createContratoDto.dataTermino,
      observacoes: createContratoDto.observacoes,
      valorTotal: 0,
      valorFinal: 0,
    } as Contrato);

    return this.contratoRepository.save(contrato);
  }

  async findAll(status?: string): Promise<Contrato[]> {
    const where = status ? { status: { nome: status } } : {};
    return this.contratoRepository.find({
      where,
      relations: ['cliente', 'status', 'usuario'],
      order: { dataInicio: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Contrato> {
    const contrato = await this.contratoRepository.findOne({
      where: { id },
      relations: [
        'cliente', 
        'status', 
        'usuario', 
        'itens', 
        'itens.equipamento', 
        'kits', 
        'kits.kit',
        'kits.kit.itens',
        'kits.kit.itens.equipamento'
      ],
    });

    if (!contrato) {
      throw new NotFoundException(`Contrato com ID ${id} não encontrado`);
    }

    return contrato;
  }

  async update(id: number, updateContratoDto: UpdateContratoDto): Promise<Contrato> {
    const contrato = await this.findOne(id);
    const updated = this.contratoRepository.merge(contrato, updateContratoDto);
    return this.contratoRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const contrato = await this.findOne(id);
    await this.contratoRepository.remove(contrato);
  }

  async addItem(contratoId: number, addItemDto: AddItemContratoDto): Promise<ContratoItem> {
    const contrato = await this.findOne(contratoId);
    const equipamento = await this.equipamentoRepository.findOne({
      where: { id: addItemDto.equipamentoId },
    });

    if (!equipamento) {
      throw new NotFoundException(`Equipamento com ID ${addItemDto.equipamentoId} não encontrado`);
    }

    const valorUnitario = this.getValorPorPeriodo(
      equipamento,
      addItemDto.periodo
    );

    const contratoItem = this.contratoItemRepository.create({
      contrato,
      equipamento,
      quantidade: addItemDto.quantidade,
      valor_unitario: valorUnitario,
      periodo: addItemDto.periodo,
    });

    await this.atualizarValorContrato(contrato);

    return this.contratoItemRepository.save(contratoItem);
  }

  async addKit(contratoId: number, addKitDto: AddKitContratoDto): Promise<ContratoKit> {
    const contrato = await this.findOne(contratoId);
    const kit = await this.kitRepository.findOne({
      where: { id: addKitDto.kitId },
      relations: ['itens', 'itens.equipamento'],
    });

    if (!kit) {
      throw new NotFoundException(`Kit com ID ${addKitDto.kitId} não encontrado`);
    }

    const valorUnitario = this.getValorPorPeriodo(
      kit,
      addKitDto.periodo
    );

    const contratoKit = this.contratoKitRepository.create({
      contrato,
      kit,
      quantidade: addKitDto.quantidade,
      valor_unitario: valorUnitario,
      periodo: addKitDto.periodo,
    });

    await this.atualizarValorContrato(contrato);

    return this.contratoKitRepository.save(contratoKit);
  }

  private getValorPorPeriodo(
    item: Equipamento | Kit,
    periodo: 'diaria' | 'semanal' | 'mensal'
  ): number {
    switch (periodo) {
      case 'diaria':
        return item.valorDiaria;
      case 'semanal':
        return item.valorSemanal || item.valorDiaria * 5;
      case 'mensal':
        return item.valorMensal || item.valorDiaria * 20;
      default:
        return item.valorDiaria;
    }
  }

  private async atualizarValorContrato(contrato: Contrato): Promise<void> {
    const itens = await this.contratoItemRepository.find({
      where: { contrato: { id: contrato.id } },
    });

    const kits = await this.contratoKitRepository.find({
      where: { contrato: { id: contrato.id } },
    });

    const valorItens = itens.reduce((sum, item) => sum + (item.valor_unitario * item.quantidade), 0);
    const valorKits = kits.reduce((sum, kit) => sum + (kit.valor_unitario * kit.quantidade), 0);

    contrato.valorTotal = valorItens + valorKits;
    contrato.valorFinal = contrato.valorTotal - (contrato.desconto || 0);

    await this.contratoRepository.save(contrato);
  }

  async generateContratoPdf(contratoId: number): Promise<string> {
    const contrato = await this.findOne(contratoId);
    const filePath = `./contratos/contrato_${contratoId}.pdf`;
    
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));
    
    // Cabeçalho
    doc.fontSize(20).text('CONTRATO DE LOCAÇÃO DE EQUIPAMENTOS', { align: 'center' });
    doc.moveDown();
    
    // Dados do contrato
    doc.fontSize(12).text(`Contratante: ${contrato.cliente.nome}`);
    doc.text(`CPF/CNPJ: ${contrato.cliente.cpfCnpj}`);
    doc.moveDown();
    
    doc.text(`Período: ${contrato.dataInicio.toLocaleDateString()} a ${contrato.dataTermino.toLocaleDateString()}`);
    doc.text(`Valor Total: R$ ${contrato.valorTotal.toFixed(2)}`);
    doc.moveDown();
    
    // Itens do contrato
    doc.text('Itens Alugados:');
    contrato.itens.forEach(item => {
      doc.text(`- ${item.equipamento.nome} (Qtd: ${item.quantidade})`);
    });
    
    doc.end();
    
    return filePath;
  }
  
  async updateStatus(contratoId: number, statusId: number): Promise<Contrato> {
    const contrato = await this.findOne(contratoId);
    const status = await this.statusRepository.findOne({
      where: { status_id: statusId },
    });

    if (!status) {
      throw new NotFoundException(`Status com ID ${statusId} não encontrado`);
    }

    contrato.status = status;
    return this.contratoRepository.save(contrato);
  }
}