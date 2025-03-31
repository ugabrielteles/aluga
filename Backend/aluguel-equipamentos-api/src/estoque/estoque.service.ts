import { 
    Injectable, 
    NotFoundException,
    BadRequestException
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, Between, Like } from 'typeorm';
  import { EstoqueMovimentacao } from './entities/estoque-movimentacao.entity';
  import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto';
  import { FilterMovimentacoesDto } from './dto/filter-movimentacoes.dto';
  import { Equipamento } from '../equipamentos/entities/equipamento.entity';
  import { Usuario } from '../auth/entities/usuario.entity';
  import { EquipamentosService } from '../equipamentos/equipamentos.service';
  
  @Injectable()
  export class EstoqueService {
    constructor(
      @InjectRepository(EstoqueMovimentacao)
      private movimentacaoRepository: Repository<EstoqueMovimentacao>,
      @InjectRepository(Equipamento)
      private equipamentoRepository: Repository<Equipamento>,
      private equipamentosService: EquipamentosService,
    ) {}
  
    async create(
      createMovimentacaoDto: CreateMovimentacaoDto,
      usuario: Usuario
    ): Promise<EstoqueMovimentacao> {
      const equipamento = await this.equipamentoRepository.findOne({
        where: { id: createMovimentacaoDto.equipamentoId },
      });
  
      if (!equipamento) {
        throw new NotFoundException(
          `Equipamento com ID ${createMovimentacaoDto.equipamentoId} não encontrado`
        );
      }
  
      // Verifica se é uma saída e se há estoque suficiente
      if (createMovimentacaoDto.tipo === 'saida') {
        const saldo = await this.getSaldo(createMovimentacaoDto.equipamentoId);
        if (saldo.disponivel < createMovimentacaoDto.quantidade) {
          throw new BadRequestException(
            `Quantidade indisponível para saída. Saldo atual: ${saldo.disponivel}`
          );
        }
      }
  
      const movimentacao = this.movimentacaoRepository.create({
        ...createMovimentacaoDto,
        equipamento,
        usuario,
      });
  
      const movimentacaoSalva = await this.movimentacaoRepository.save(movimentacao);
  
      // Atualiza o saldo do equipamento
      await this.atualizarSaldoEquipamento(createMovimentacaoDto.equipamentoId);
  
      return movimentacaoSalva;
    }
  
    async findAll(
      filterMovimentacoesDto: FilterMovimentacoesDto
    ): Promise<EstoqueMovimentacao[]> {
      const { tipo, origem, dataInicio, dataFim, equipamentoId, usuarioId } = filterMovimentacoesDto;
  
      const where: any = {};
  
      if (tipo) {
        where.tipo = tipo;
      }
  
      if (origem) {
        where.origem = origem;
      }
  
      if (equipamentoId) {
        where.equipamento = { id: equipamentoId };
      }
  
      if (usuarioId) {
        where.usuario = { id: usuarioId };
      }
  
      if (dataInicio && dataFim) {
        where.dataMovimentacao = Between(new Date(dataInicio), new Date(dataFim));
      } else if (dataInicio) {
        where.dataMovimentacao = Between(new Date(dataInicio), new Date());
      }
  
      return this.movimentacaoRepository.find({
        where,
        relations: ['equipamento', 'usuario'],
        order: { dataMovimentacao: 'DESC' },
      });
    }
  
    async findByEquipamento(
      equipamentoId: number,
      filterMovimentacoesDto: FilterMovimentacoesDto
    ): Promise<EstoqueMovimentacao[]> {
      await this.equipamentosService.findOne(equipamentoId); // Verifica se equipamento existe
      return this.findAll({
        ...filterMovimentacoesDto,
        equipamentoId,
      });
    }
  
    async getSaldo(equipamentoId: number): Promise<{ disponivel: number, total: number }> {
      const equipamento = await this.equipamentosService.findOne(equipamentoId);
      return {
        disponivel: equipamento.quantidadeDisponivel,
        total: equipamento.quantidadeTotal,
      };
    }
  
    private async atualizarSaldoEquipamento(equipamentoId: number): Promise<void> {
      const equipamento = await this.equipamentosService.findOne(equipamentoId);
      
      // Calcula entradas
      const { sum: entradas } = await this.movimentacaoRepository
        .createQueryBuilder('movimentacao')
        .select('SUM(movimentacao.quantidade)', 'sum')
        .where('movimentacao.equipamentoId = :equipamentoId', { equipamentoId })
        .andWhere('movimentacao.tipo = :tipo', { tipo: 'entrada' })
        .getRawOne();
  
      // Calcula saídas
      const { sum: saidas } = await this.movimentacaoRepository
        .createQueryBuilder('movimentacao')
        .select('SUM(movimentacao.quantidade)', 'sum')
        .where('movimentacao.equipamentoId = :equipamentoId', { equipamentoId })
        .andWhere('movimentacao.tipo = :tipo', { tipo: 'saida' })
        .getRawOne();
  
      const saldoEntradas = entradas ? parseFloat(entradas) : 0;
      const saldoSaidas = saidas ? parseFloat(saidas) : 0;
      const saldoDisponivel = saldoEntradas - saldoSaidas;
  
      // Atualiza o equipamento
      await this.equipamentoRepository.update(equipamentoId, {
        quantidadeDisponivel: saldoDisponivel,
        quantidadeTotal: saldoEntradas,
      });
    }
  
    async registrarEntrada(
      equipamentoId: number,
      quantidade: number,
      origem: 'compra' | 'devolucao',
      usuario: Usuario,
      observacoes?: string
    ): Promise<EstoqueMovimentacao> {
      return this.create({
        equipamentoId,
        quantidade,
        tipo: 'entrada',
        origem,
        observacoes,
      }, usuario);
    }
  
    async registrarSaida(
      equipamentoId: number,
      quantidade: number,
      origem: 'aluguel' | 'avaria' | 'perda',
      usuario: Usuario,
      referenciaId?: number,
      observacoes?: string
    ): Promise<EstoqueMovimentacao> {
      return this.create({
        equipamentoId,
        quantidade,
        tipo: 'saida',
        origem,
        referenciaId,
        observacoes,
      }, usuario);
    }
  }