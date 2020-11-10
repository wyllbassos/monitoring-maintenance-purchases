import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
// import Category from './Category';

@Entity('solicitantes')
class Solicitantes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  usuario: string;

  @Column('enum')
  area: 'PCM' | 'ALMOX' | 'PRODUCAO' | 'PROJETOS';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Solicitantes;
