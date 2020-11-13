import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
// import Category from './Category';
import ComprasManutencao from './ComprasManutencao';
import BaseColumnSchemaPart from './BaseColumnSchemaPart';

@Entity('hitorico_alteracoes')
class HistoricoAlteracoes extends BaseColumnSchemaPart {
  @Column()
  tabela_alterada_id: string;

  @Column()
  tabela: string;
  
  @Column()
  campo: string;

  @Column()
  valor_antigo: string;

  @Column()
  valor_novo: string;

  @ManyToOne(() => ComprasManutencao)
  @JoinColumn({ name: 'tabela_alterada_id' })
  compras_manutencao: ComprasManutencao;
}

export default HistoricoAlteracoes;
