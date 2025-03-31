import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '../../auth/entities/usuario.entity';

@Entity('contrato_templates')
export class ContratoTemplate {
  @PrimaryGeneratedColumn({ name: 'template_id' })
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column('text')
  conteudo: string;

  @Column({ default: false })
  padrao: boolean;

  @Column({ name: 'data_criacao', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dataCriacao: Date;

  @ManyToOne(() => Usuario, usuario => usuario.templates)
  usuario: Usuario;
}