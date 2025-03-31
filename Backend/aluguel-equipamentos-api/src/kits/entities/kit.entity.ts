import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { KitItem } from './kit-item.entity';
import { ContratoKit } from '../../contratos/entities/contrato-kit.entity';

@Entity('kits')
export class Kit {
  @PrimaryGeneratedColumn({ name: 'kit_id' })
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column('text', { nullable: true })
  descricao: string;

  @Column({ name: 'valor_diaria', type: 'decimal', precision: 10, scale: 2 })
  valorDiaria: number;

  @Column({ name: 'valor_semanal', type: 'decimal', precision: 10, scale: 2, nullable: true })
  valorSemanal: number;

  @Column({ name: 'valor_mensal', type: 'decimal', precision: 10, scale: 2, nullable: true })
  valorMensal: number;

  @Column({ default: true })
  ativo: boolean;

  @OneToMany(() => KitItem, kitItem => kitItem.kit)
  itens: KitItem[];

  @OneToMany(() => ContratoKit, contratoKit => contratoKit.kit)
  contratoKits: ContratoKit[];
}