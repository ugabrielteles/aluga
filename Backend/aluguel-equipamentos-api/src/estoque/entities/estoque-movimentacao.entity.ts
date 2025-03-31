import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Equipamento } from '../../equipamentos/entities/equipamento.entity';
import { Usuario } from '../../auth/entities/usuario.entity';

@Entity('estoque_movimentacao')
export class EstoqueMovimentacao {
  @PrimaryGeneratedColumn({ name: 'movimentacao_id' })
  id: number;

  @ManyToOne(() => Equipamento, equipamento => equipamento.movimentacoes)
  equipamento: Equipamento;

  @Column()
  quantidade: number;

  @Column({ type: 'enum', enum: ['entrada', 'saida'] })
  tipo: string;

  @Column({ type: 'enum', enum: ['compra', 'devolucao', 'aluguel', 'avaria', 'perda'] })
  origem: string;

  @Column({ name: 'referencia_id', nullable: true })
  referenciaId: number;

  @ManyToOne(() => Usuario, usuario => usuario.movimentacoes)
  usuario: Usuario;

  @Column({ name: 'data_movimentacao', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dataMovimentacao: Date;

  @Column('text', { nullable: true })
  observacoes: string;
}