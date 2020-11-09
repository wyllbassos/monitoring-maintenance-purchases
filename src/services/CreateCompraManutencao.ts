import { getRepository, Repository } from 'typeorm';

import AppError from '../errors/AppError';

import ComprasManutencao from '../models/ComprasManutencao';

interface Request {
  status: string;
  sc: string;
  item: string;
  produto: string;
  descricao: string;
  quantidade: number;
  emissao: Date;
  aplicacao: string;
  observacao: string;
  cotacao: string;
  pc: string;
  dt_aprovacao_n1: Date;
  dt_aprovacao_n2: Date;
  dt_aprovacao_n3: Date;
  quantidade_ja_entregue: number;
  ja_emitiu_fornecedor: 'S' | '';
  valor_total: number;
  status_sc: 'B' | 'L' | 'R';
  status_pc: 'B' | 'L' | 'R' | '';
  previsao_entrega: Date;
  pc_eliminado_residuo: 'S' | '';
  motivo_eliminado_residuo: string;
  sc_eliminado_residuo: 'S' | '';
  data_pc: Date;
  conta_pc: string;
  centro_custo_pc: string;
  solicitante: string;
  requisitante: string;
  fornecedor: string;
  forma_pagamento: string;
  pagamento_antecipado: 'S' | '';
  area: 'PCM' | 'ALMOX' | 'PRODUCAO' | 'OUTROS';
}


class CreateTransactionService {
  public async execute(request: Request): Promise<ComprasManutencao> {
    const comprasManutencaoRepository = getRepository(ComprasManutencao);

    const {
      status,
      sc,
      item,
      produto,
      descricao,
      quantidade,
      emissao,
      aplicacao,
      observacao,
      cotacao,
      pc,
      dt_aprovacao_n1,
      dt_aprovacao_n2,
      dt_aprovacao_n3,
      quantidade_ja_entregue,
      ja_emitiu_fornecedor,
      valor_total,
      status_sc,
      status_pc,
      previsao_entrega,
      pc_eliminado_residuo,
      motivo_eliminado_residuo,
      sc_eliminado_residuo,
      data_pc,
      conta_pc,
      centro_custo_pc,
      solicitante,
      requisitante,
      fornecedor,
      forma_pagamento,
      pagamento_antecipado,
      area,
    } = request;

    const compraManutencao = comprasManutencaoRepository.create({
      status,
      sc,
      item,
      produto,
      descricao,
      quantidade,
      emissao,
      aplicacao,
      observacao,
      cotacao,
      pc,
      dt_aprovacao_n1,
      dt_aprovacao_n2,
      dt_aprovacao_n3,
      quantidade_ja_entregue,
      ja_emitiu_fornecedor,
      valor_total,
      status_sc,
      status_pc,
      previsao_entrega,
      pc_eliminado_residuo,
      motivo_eliminado_residuo,
      sc_eliminado_residuo,
      data_pc,
      conta_pc,
      centro_custo_pc,
      solicitante,
      requisitante,
      fornecedor,
      forma_pagamento,
      pagamento_antecipado,
      area,
    });

    await comprasManutencaoRepository.save(compraManutencao);

    return compraManutencao;
  }
}

export default CreateTransactionService;
