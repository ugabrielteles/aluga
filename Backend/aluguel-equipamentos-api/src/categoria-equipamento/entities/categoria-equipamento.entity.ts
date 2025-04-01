import { Equipamento } from 'src/equipamentos/entities/equipamento.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('categorias_equipamentos')
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