import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import BaseColumnSchemaPart from './BaseColumnSchemaPart';

import TipoPagamento from '../models/TiposPagamento';
import Solicitante from '../models/Solicitantes';
import HistoricoAlteracoes from './HistoricoAlteracoes';

@Entity('compras_manutencao')
class ComprasManutencao extends BaseColumnSchemaPart{
  @Column()
  status: string;

  @Column()
  sc: string;

  @Column()
  item: string;

  @Column()
  produto: string;

  @Column()
  descricao: string;

  @Column('decimal')
  quantidade: number;

  @Column('date')
  emissao: Date;

  @Column()
  aplicacao: string;

  @Column()
  observacao: string;

  @Column()
  cotacao: string;

  @Column()
  pc: string;

  @Column('date')
  dt_aprovacao_n1: Date;

  @Column('date')
  dt_aprovacao_n2: Date;

  @Column('date')
  dt_aprovacao_n3: Date;

  @Column('decimal')
  quantidade_ja_entregue: number;

  @Column('enum')
  ja_emitiu_fornecedor: 'S' | null;

  @Column('decimal')
  valor_total: number;

  @Column('enum')
  status_sc: 'B' | 'L' | 'R';

  @Column('enum')
  status_pc: 'B' | 'L' | 'R' | null;

  @Column('date')
  previsao_entrega: Date;

  @Column('enum')
  pc_eliminado_residuo: 'S' | null;

  @Column()
  motivo_eliminado_residuo: string;

  @Column('enum')
  sc_eliminado_residuo: 'S' | null;

  @Column('date')
  data_pc: Date;

  @Column()
  conta_pc: string;

  @Column()
  centro_custo_pc: string;

  @Column()
  requisitante: string;

  @Column()
  fornecedor: string;

  @Column()
  solicitante_id: string;

  @Column()
  tipo_pagamento_id: string;

  @ManyToOne(() => Solicitante)
  @JoinColumn({ name: 'solicitante_id' })
  solicitante: Solicitante;

  @ManyToOne(() => TipoPagamento)
  @JoinColumn({ name: 'tipo_pagamento_id' })
  tipo_pagamento: TipoPagamento;

  @OneToMany(Tipe => HistoricoAlteracoes, HistoricoAlteracoes => HistoricoAlteracoes)
  @JoinColumn({ referencedColumnName: 'tabela_alterada_id' })
  historico_alteracoes: HistoricoAlteracoes[];
}

export default ComprasManutencao;
