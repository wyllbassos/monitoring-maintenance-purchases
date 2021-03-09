import createDate from '../../../../utils/createDate';
import { CreateCompraManutencao } from '../../CreateCompraManutencaoService/index';

export default function parseToCreateComprasManutencao(
  data: CreateCompraManutencao[],
): CreateCompraManutencao[] {
  const comprasManutencao: CreateCompraManutencao[] = data.map(
    imortCompraManutencao => {
      const {
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
        tipo_pagamento,
        solicitante,
        requisitante,
        fornecedor,
        cod_aprovador_n1,
        cod_aprovador_n2,
        cod_aprovador_n3,
      } = imortCompraManutencao;
      const compraManutencao: CreateCompraManutencao = {
        sc,
        item,
        produto,
        descricao: String(descricao).toUpperCase(),
        quantidade: Number(String(quantidade).replace(',', '.')),
        emissao: createDate(String(emissao)) || new Date(),
        aplicacao: String(aplicacao).toUpperCase(),
        observacao: String(observacao).toUpperCase(),
        cotacao,
        pc,
        dt_aprovacao_n1: createDate(String(dt_aprovacao_n1)),
        dt_aprovacao_n2: createDate(String(dt_aprovacao_n2)),
        dt_aprovacao_n3: createDate(String(dt_aprovacao_n3)),
        quantidade_ja_entregue: Number(
          String(quantidade_ja_entregue).replace(',', '.'),
        ),
        ja_emitiu_fornecedor,
        valor_total: Number(String(valor_total).replace(',', '.')),
        status_sc,
        status_pc,
        previsao_entrega: createDate(String(previsao_entrega)),
        pc_eliminado_residuo,
        motivo_eliminado_residuo: String(
          motivo_eliminado_residuo,
        ).toUpperCase(),
        sc_eliminado_residuo,
        data_pc: createDate(String(data_pc)),
        conta_pc,
        centro_custo_pc,
        tipo_pagamento,
        solicitante,
        requisitante: String(requisitante).toUpperCase(),
        fornecedor: String(fornecedor).toUpperCase(),
        status: '',
        cod_aprovador_n1,
        cod_aprovador_n2,
        cod_aprovador_n3,
      };
      return compraManutencao;
    },
  );
  return comprasManutencao;
}
