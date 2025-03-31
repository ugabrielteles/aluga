import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Contrato } from './contrato.entity';

@Entity()
export class StatusContrato {
  @PrimaryGeneratedColumn()
  status_id: number;

  @Column({ length: 30 })
  nome: string;

  @Column('text', { nullable: true })
  descricao: string;

  @OneToMany(() => Contrato, contrato => contrato.status)
  contratos: Contrato[];
}