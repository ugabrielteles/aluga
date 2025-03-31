import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Contrato } from './contrato.entity';
import { Kit } from '../../kits/entities/kit.entity';

@Entity()
export class ContratoKit {
  @PrimaryGeneratedColumn()
  contrato_kit_id: number;

  @ManyToOne(() => Contrato, contrato => contrato.kits, { onDelete: 'CASCADE' })
  contrato: Contrato;

  @ManyToOne(() => Kit, kit => kit.contratoKits)
  kit: Kit;

  @Column()
  quantidade: number;

  @Column('decimal', { precision: 10, scale: 2 })
  valor_unitario: number;

  @Column({ type: 'enum', enum: ['diaria', 'semanal', 'mensal'] })
  periodo: 'diaria' | 'semanal' | 'mensal';
}