import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Contrato } from '../../contratos/entities/contrato.entity';
import { EstoqueMovimentacao } from '../../estoque/entities/estoque-movimentacao.entity';
import { ContratoTemplate } from '../../templates/entities/contrato-template.entity';
import { Log } from '../../logs/entities/log.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'usuario_id' })
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ name: 'senha_hash', length: 255 })
  senhaHash: string;

  @Column({ type: 'enum', enum: ['admin', 'gerente', 'operador', 'tecnico'] })
  cargo: string;

  @Column({ default: true })
  ativo: boolean;

  @Column({ name: 'data_cadastro', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dataCadastro: Date;

  @Column({ name: 'ultimo_login', type: 'datetime', nullable: true })
  ultimoLogin: Date;

  @OneToMany(() => Contrato, contrato => contrato.usuario)
  contratos: Contrato[];

  @OneToMany(() => EstoqueMovimentacao, movimentacao => movimentacao.usuario)
  movimentacoes: EstoqueMovimentacao[];

  @OneToMany(() => ContratoTemplate, template => template.usuario)
  templates: ContratoTemplate[];

  @OneToMany(() => Log, log => log.usuario)
  logs: Log[];
}