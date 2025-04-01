import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('categorias_equipamentos')
export class Categoria {
  @PrimaryGeneratedColumn({ name: 'categoria_id' })
  id: number;

  @Column({ length: 50, nullable: false })
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao?: string;
}