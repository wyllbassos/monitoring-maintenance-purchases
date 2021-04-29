import { Entity, Column, JoinColumn, OneToMany } from 'typeorm';
// import Category from './Category';
import ComprasManutencao from './ComprasManutencao';
import BaseColumnSchemaPart from './BaseColumnSchemaPart';

@Entity('solicitantes')
class Solicitantes extends BaseColumnSchemaPart {
  @Column()
  usuario: string;

  @Column()
  area: 'PCM' | 'ALMOX' | 'PRODUCAO' | 'PROJETOS' | 'OUTROS';

  @OneToMany(
    _ => ComprasManutencao,
    comprasManutencao => comprasManutencao.solicitante,
  )
  @JoinColumn({ referencedColumnName: 'solicitante_id' })
  compras_manutencao: ComprasManutencao[];
}

export default Solicitantes;
