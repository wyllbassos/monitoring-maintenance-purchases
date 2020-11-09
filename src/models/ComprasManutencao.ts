import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('compras_manutencao')
class ComprasManutencao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  ja_emitiu_fornecedor: 'S' | '';

  @Column('decimal')
  valor_total: number;

  @Column('enum')
  status_sc: 'B' | 'L' | 'R';

  @Column('enum')
  status_pc: 'B' | 'L' | 'R' | '';

  @Column('date')
  previsao_entrega: Date;

  @Column('enum')
  pc_eliminado_residuo: 'S' | '';

  @Column()
  motivo_eliminado_residuo: string;

  @Column('enum')
  sc_eliminado_residuo: 'S' | '';

  @Column('date')
  data_pc: Date;

  @Column()
  conta_pc: string;

  @Column()
  centro_custo_pc: string;

  @Column()
  solicitante: string;

  @Column()
  requisitante: string;

  @Column()
  fornecedor: string;

  @Column()
  forma_pagamento: string;

  @Column('enum')
  pagamento_antecipado: 'S' | '';

  @Column('enum')
  area: 'PCM' | 'ALMOX' | 'PRODUCAO' | 'OUTROS';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ComprasManutencao;
