import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Equipamento } from './equipamento.entity';

@Entity()
export class CategoriaEquipamento {
  @PrimaryGeneratedColumn()
  categoria_id: number;

  @Column({ length: 50 })
  nome: string;

  @Column('text', { nullable: true })
  descricao: string;

  @OneToMany(() => Equipamento, equipamento => equipamento.categoria)
  equipamentos: Equipamento[];
}