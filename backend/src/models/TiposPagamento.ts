import { Entity, Column, JoinColumn, OneToMany } from 'typeorm';
// import Category from './Category';
import ComprasManutencao from './ComprasManutencao';
import BaseColumnSchemaPart from './BaseColumnSchemaPart';

@Entity('tipos_pagamento')
class TiposPagamento extends BaseColumnSchemaPart {
  @Column()
  codigo: string;

  @Column()
  descricao: string;

  @OneToMany(
    Tipe => ComprasManutencao,
    ComprasManutencao => ComprasManutencao.tipo_pagamento,
  )
  @JoinColumn({ referencedColumnName: 'tipo_pagamento_id' })
  compras_manutencao: ComprasManutencao[];
}

export default TiposPagamento;
