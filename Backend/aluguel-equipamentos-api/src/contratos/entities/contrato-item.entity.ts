import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Contrato } from './contrato.entity';
import { Equipamento } from '../../equipamentos/entities/equipamento.entity';

@Entity()
export class ContratoItem {
  @PrimaryGeneratedColumn()
  contrato_item_id: number;

  @ManyToOne(() => Contrato, contrato => contrato.itens, { onDelete: 'CASCADE' })
  contrato: Contrato;

  @ManyToOne(() => Equipamento, equipamento => equipamento.contratoItens)
  equipamento: Equipamento;

  @Column()
  quantidade: number;

  @Column('decimal', { precision: 10, scale: 2 })
  valor_unitario: number;

  @Column({ type: 'enum', enum: ['diaria', 'semanal', 'mensal'] })
  periodo: 'diaria' | 'semanal' | 'mensal';
}