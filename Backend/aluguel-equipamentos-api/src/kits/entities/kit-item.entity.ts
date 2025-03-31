import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Kit } from './kit.entity';
import { Equipamento } from '../../equipamentos/entities/equipamento.entity';

@Entity()
export class KitItem {
  @PrimaryGeneratedColumn()
  kit_item_id: number;

  @ManyToOne(() => Kit, kit => kit.itens, { onDelete: 'CASCADE' })
  kit: Kit;

  @ManyToOne(() => Equipamento, equipamento => equipamento.kitItens)
  equipamento: Equipamento;

  @Column()
  quantidade: number;
}