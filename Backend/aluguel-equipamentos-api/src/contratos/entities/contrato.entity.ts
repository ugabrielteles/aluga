import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Usuario } from '../../auth/entities/usuario.entity';
import { StatusContrato } from './status-contrato.entity';
import { ContratoItem } from './contrato-item.entity';
import { ContratoKit } from './contrato-kit.entity';

@Entity('contratos')
export class Contrato {
  @PrimaryGeneratedColumn({ name: 'contrato_id' })
  id: number;

  @ManyToOne(() => Cliente, cliente => cliente.contratos)
  cliente: Cliente;

  @ManyToOne(() => Usuario, usuario => usuario.contratos)
  usuario: Usuario;

  @ManyToOne(() => StatusContrato, status => status.contratos)
  status: StatusContrato;

  @Column({ name: 'data_contrato', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dataContrato: Date;

  @Column({ name: 'data_inicio', type: 'date' })
  dataInicio: Date;

  @Column({ name: 'data_termino', type: 'date' })
  dataTermino: Date;

  @Column({ name: 'valor_total', type: 'decimal', precision: 12, scale: 2 })
  valorTotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  desconto: number;

  @Column({ name: 'valor_final', type: 'decimal', precision: 12, scale: 2 })
  valorFinal: number;

  @Column('text', { nullable: true })
  observacoes: string;

  @Column({ name: 'arquivo_contrato', length: 255, nullable: true })
  arquivoContrato: string;

  @OneToMany(() => ContratoItem, contratoItem => contratoItem.contrato)
  itens: ContratoItem[];

  @OneToMany(() => ContratoKit, contratoKit => contratoKit.contrato)
  kits: ContratoKit[];
}