import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Contrato } from '../../contratos/entities/contrato.entity';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn({ name: 'cliente_id' })
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ type: 'enum', enum: ['pessoa_fisica', 'pessoa_juridica'] })
  tipo: string;

  @Column({ name: 'cpf_cnpj', length: 20, unique: true })
  cpfCnpj: string;

  @Column({ name: 'rg_ie', length: 20, nullable: true })
  rgIe: string;

  @Column({ length: 200, nullable: true })
  endereco: string;

  @Column({ length: 50, nullable: true })
  cidade: string;

  @Column({ length: 2, nullable: true })
  estado: string;

  @Column({ length: 10, nullable: true })
  cep: string;

  @Column({ length: 20, nullable: true })
  telefone: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column('text', { nullable: true })
  observacoes: string;

  @Column({ name: 'data_cadastro', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dataCadastro: Date;

  @Column({ default: true })
  ativo: boolean;

  @OneToMany(() => Contrato, contrato => contrato.cliente)
  contratos: Contrato[];
}