import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { KitItem } from '../../kits/entities/kit-item.entity';
import { ContratoItem } from '../../contratos/entities/contrato-item.entity';
import { EstoqueMovimentacao } from '../../estoque/entities/estoque-movimentacao.entity';
import { CategoriaEquipamento } from '../../categoria-equipamento/entities/categoria-equipamento.entity';

@Entity('equipamentos')
export class Equipamento {
  @PrimaryGeneratedColumn({ name: 'equipamento_id' })
  id: number;

  @ManyToOne(() => CategoriaEquipamento, categoria => categoria.equipamentos)
  categoria: CategoriaEquipamento;

  @Column({ length: 100 })
  nome: string;

  @Column('text', { nullable: true })
  descricao: string;

  @Column({ length: 50, nullable: true })
  modelo: string;

  @Column({ length: 50, nullable: true })
  fabricante: string;

  @Column({ name: 'numero_serie', length: 50, unique: true })
  numeroSerie: string;

  @Column({ name: 'valor_diaria', type: 'decimal', precision: 10, scale: 2 })
  valorDiaria: number;

  @Column({ name: 'valor_semanal', type: 'decimal', precision: 10, scale: 2, nullable: true })
  valorSemanal: number;

  @Column({ name: 'valor_mensal', type: 'decimal', precision: 10, scale: 2, nullable: true })
  valorMensal: number;

  @Column({ name: 'quantidade_total' })
  quantidadeTotal: number;

  @Column({ name: 'quantidade_disponivel' })
  quantidadeDisponivel: number;

  @Column({ default: true })
  ativo: boolean;

  @Column({ name: 'data_aquisicao', type: 'date', nullable: true })
  dataAquisicao: Date;

  @Column({ name: 'valor_aquisicao', type: 'decimal', precision: 10, scale: 2, nullable: true })
  valorAquisicao: number;

  @OneToMany(() => KitItem, kitItem => kitItem.equipamento)
  kitItens: KitItem[];

  @OneToMany(() => ContratoItem, contratoItem => contratoItem.equipamento)
  contratoItens: ContratoItem[];

  @OneToMany(() => EstoqueMovimentacao, movimentacao => movimentacao.equipamento)
  movimentacoes: EstoqueMovimentacao[];
}