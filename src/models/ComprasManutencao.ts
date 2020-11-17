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
  dt_aprovacao_n1: Date | null;

  @Column('date')
  dt_aprovacao_n2: Date | null;

  @Column('date')
  dt_aprovacao_n3: Date | null;

  @Column('decimal')
  quantidade_ja_entregue: number;

  @Column()
  ja_emitiu_fornecedor: string;

  @Column('decimal')
  valor_total: number;

  @Column('enum')
  status_sc: 'B' | 'L' | 'R';

  @Column()
  status_pc: string;

  @Column('date')
  previsao_entrega: Date | null;

  @Column()
  pc_eliminado_residuo: string;

  @Column()
  motivo_eliminado_residuo: string;

  @Column()
  sc_eliminado_residuo: string;

  @Column('date')
  data_pc: Date | null;

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

  @Column('uuid')
  tipo_pagamento_id: string | null;

  @ManyToOne(() => Solicitante)
  @JoinColumn({ name: 'solicitante_id' })
  solicitante: Solicitante;

  @ManyToOne(() => TipoPagamento)
  @JoinColumn({ name: 'tipo_pagamento_id' })
  tipo_pagamento: TipoPagamento | null;

  @OneToMany(Tipe => HistoricoAlteracoes, HistoricoAlteracoes => HistoricoAlteracoes)
  @JoinColumn({ referencedColumnName: 'tabela_alterada_id' })
  historico_alteracoes: HistoricoAlteracoes[];
}

export default ComprasManutencao;
