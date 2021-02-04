import ComprasManutencao from '../../../../models/ComprasManutencao';
import CreateHistoricoAlteracoesService from '../../../historicoalteracoes/CreateHistoricoAlteracoesService';
import { CreateCompraManutencao } from '..';

export default async function updateCompraManutencao({
  compraManutencao,
  request,
}: {
  compraManutencao: ComprasManutencao;
  request: CreateCompraManutencao;
}): Promise<ComprasManutencao> {
  const arrAlteracoes: {
    campo: string;
    valor_antigo: string | undefined;
    valor_novo: string | undefined;
  }[] = [];

  const newCompraManutencao: ComprasManutencao = { ...compraManutencao };

  if (compraManutencao.status !== request.status) {
    arrAlteracoes.push({
      campo: 'status',
      valor_antigo: compraManutencao.status,
      valor_novo: request.status,
    });
    newCompraManutencao.status = request.status;
  }
  if (compraManutencao.produto !== request.produto) {
    arrAlteracoes.push({
      campo: 'produto',
      valor_antigo: compraManutencao.produto,
      valor_novo: request.produto,
    });
    newCompraManutencao.produto = request.produto;
  }
  if (compraManutencao.produto !== request.produto) {
    arrAlteracoes.push({
      campo: 'produto',
      valor_antigo: compraManutencao.produto,
      valor_novo: request.produto,
    });
    newCompraManutencao.produto = request.produto;
  }
  if (compraManutencao.descricao !== request.descricao) {
    arrAlteracoes.push({
      campo: 'descricao',
      valor_antigo: compraManutencao.descricao,
      valor_novo: request.descricao,
    });
    newCompraManutencao.descricao = request.descricao;
  }
  if (
    compraManutencao.quantidade.toString() !== request.quantidade.toString()
  ) {
    arrAlteracoes.push({
      campo: 'quantidade',
      valor_antigo: compraManutencao.quantidade.toString(),
      valor_novo: request.quantidade.toString(),
    });
    newCompraManutencao.quantidade = request.quantidade;
  }
  if (
    compraManutencao.emissao?.toISOString() !== request.emissao?.toISOString()
  ) {
    arrAlteracoes.push({
      campo: 'emissao',
      valor_antigo: compraManutencao.emissao.toISOString(),
      valor_novo: request.emissao.toISOString(),
    });
    newCompraManutencao.emissao = request.emissao;
  }
  if (compraManutencao.aplicacao !== request.aplicacao) {
    arrAlteracoes.push({
      campo: 'aplicacao',
      valor_antigo: compraManutencao.aplicacao,
      valor_novo: request.aplicacao,
    });
    newCompraManutencao.aplicacao = request.aplicacao;
  }
  if (compraManutencao.observacao !== request.observacao) {
    arrAlteracoes.push({
      campo: 'observacao',
      valor_antigo: compraManutencao.observacao,
      valor_novo: request.observacao,
    });
    newCompraManutencao.observacao = request.observacao;
  }
  if (compraManutencao.cotacao !== request.cotacao) {
    arrAlteracoes.push({
      campo: 'cotacao',
      valor_antigo: compraManutencao.cotacao,
      valor_novo: request.cotacao,
    });
    newCompraManutencao.cotacao = request.cotacao;
  }
  if (compraManutencao.pc !== request.pc) {
    arrAlteracoes.push({
      campo: 'pc',
      valor_antigo: compraManutencao.pc,
      valor_novo: request.pc,
    });
    newCompraManutencao.pc = request.pc;
  }
  request.dt_aprovacao_n1 =
    request.dt_aprovacao_n1 === '' ? null : request.dt_aprovacao_n1;
  if (
    compraManutencao.dt_aprovacao_n1?.toISOString() !==
    request.dt_aprovacao_n1?.toISOString()
  ) {
    arrAlteracoes.push({
      campo: 'dt_aprovacao_n1',
      valor_antigo: compraManutencao.dt_aprovacao_n1?.toISOString(),
      valor_novo: request.dt_aprovacao_n1?.toISOString(),
    });
    if (!compraManutencao.dt_aprovacao_n1) {
      newCompraManutencao.status_aprovacao = undefined;
    }
    newCompraManutencao.dt_aprovacao_n1 = request.dt_aprovacao_n1;
  }
  request.dt_aprovacao_n2 =
    request.dt_aprovacao_n2 === '' ? null : request.dt_aprovacao_n2;
  if (
    compraManutencao.dt_aprovacao_n2?.toISOString() !==
    request.dt_aprovacao_n2?.toISOString()
  ) {
    arrAlteracoes.push({
      campo: 'dt_aprovacao_n2',
      valor_antigo: compraManutencao.dt_aprovacao_n2?.toISOString(),
      valor_novo: request.dt_aprovacao_n2?.toISOString(),
    });
    newCompraManutencao.dt_aprovacao_n2 = request.dt_aprovacao_n2;
  }
  request.dt_aprovacao_n3 =
    request.dt_aprovacao_n3 === '' ? null : request.dt_aprovacao_n3;
  if (
    compraManutencao.dt_aprovacao_n3?.toISOString() !==
    request.dt_aprovacao_n3?.toISOString()
  ) {
    arrAlteracoes.push({
      campo: 'dt_aprovacao_n3',
      valor_antigo: compraManutencao.dt_aprovacao_n3?.toISOString(),
      valor_novo: request.dt_aprovacao_n3?.toISOString(),
    });
    newCompraManutencao.dt_aprovacao_n3 = request.dt_aprovacao_n3;
  }
  if (
    compraManutencao.quantidade_ja_entregue.toString() !==
    request.quantidade_ja_entregue.toString()
  ) {
    arrAlteracoes.push({
      campo: 'quantidade_ja_entregue',
      valor_antigo: compraManutencao.quantidade_ja_entregue.toString(),
      valor_novo: request.quantidade_ja_entregue.toString(),
    });
    newCompraManutencao.quantidade_ja_entregue = request.quantidade_ja_entregue;
  }
  if (compraManutencao.ja_emitiu_fornecedor !== request.ja_emitiu_fornecedor) {
    arrAlteracoes.push({
      campo: 'ja_emitiu_fornecedor',
      valor_antigo: compraManutencao.ja_emitiu_fornecedor,
      valor_novo: request.ja_emitiu_fornecedor,
    });
    newCompraManutencao.ja_emitiu_fornecedor = request.ja_emitiu_fornecedor;
  }

  if (
    compraManutencao.valor_total.toString() !== request.valor_total.toString()
  ) {
    arrAlteracoes.push({
      campo: 'valor_total',
      valor_antigo: compraManutencao.valor_total.toString(),
      valor_novo: request.valor_total.toString(),
    });
    newCompraManutencao.valor_total = request.valor_total;
  }

  if (compraManutencao.status_sc !== request.status_sc) {
    arrAlteracoes.push({
      campo: 'status_sc',
      valor_antigo: compraManutencao.status_sc,
      valor_novo: request.status_sc,
    });
    newCompraManutencao.status_sc = request.status_sc;
  }
  if (compraManutencao.status_pc !== request.status_pc) {
    arrAlteracoes.push({
      campo: 'status_pc',
      valor_antigo: compraManutencao.status_pc,
      valor_novo: request.status_pc,
    });
    newCompraManutencao.status_pc = request.status_pc;
  }
  request.previsao_entrega =
    request.previsao_entrega === '' ? null : request.previsao_entrega;
  if (
    compraManutencao.previsao_entrega?.toISOString() !==
    request.previsao_entrega?.toISOString()
  ) {
    arrAlteracoes.push({
      campo: 'previsao_entrega',
      valor_antigo: compraManutencao.previsao_entrega?.toISOString(),
      valor_novo: request.previsao_entrega?.toISOString(),
    });
    newCompraManutencao.previsao_entrega = request.previsao_entrega;
  }
  if (compraManutencao.pc_eliminado_residuo !== request.pc_eliminado_residuo) {
    arrAlteracoes.push({
      campo: 'pc_eliminado_residuo',
      valor_antigo: compraManutencao.pc_eliminado_residuo,
      valor_novo: request.pc_eliminado_residuo,
    });
    newCompraManutencao.pc_eliminado_residuo = request.pc_eliminado_residuo;
  }
  if (
    compraManutencao.motivo_eliminado_residuo !==
    request.motivo_eliminado_residuo
  ) {
    arrAlteracoes.push({
      campo: 'motivo_eliminado_residuo',
      valor_antigo: compraManutencao.motivo_eliminado_residuo,
      valor_novo: request.motivo_eliminado_residuo,
    });
    newCompraManutencao.motivo_eliminado_residuo =
      request.motivo_eliminado_residuo;
  }
  if (compraManutencao.sc_eliminado_residuo !== request.sc_eliminado_residuo) {
    arrAlteracoes.push({
      campo: 'sc_eliminado_residuo',
      valor_antigo: compraManutencao.sc_eliminado_residuo,
      valor_novo: request.sc_eliminado_residuo,
    });
    newCompraManutencao.sc_eliminado_residuo = request.sc_eliminado_residuo;
  }
  request.data_pc = request.data_pc === '' ? null : request.data_pc;
  if (
    compraManutencao.data_pc?.toISOString() !== request.data_pc?.toISOString()
  ) {
    arrAlteracoes.push({
      campo: 'data_pc',
      valor_antigo: compraManutencao.data_pc?.toISOString(),
      valor_novo: request.data_pc?.toISOString(),
    });
    newCompraManutencao.data_pc = request.data_pc;
  }
  if (compraManutencao.conta_pc !== request.conta_pc) {
    arrAlteracoes.push({
      campo: 'conta_pc',
      valor_antigo: compraManutencao.conta_pc,
      valor_novo: request.conta_pc,
    });
    newCompraManutencao.conta_pc = request.conta_pc;
  }
  if (compraManutencao.centro_custo_pc !== request.centro_custo_pc) {
    arrAlteracoes.push({
      campo: 'centro_custo_pc',
      valor_antigo: compraManutencao.centro_custo_pc,
      valor_novo: request.centro_custo_pc,
    });
    newCompraManutencao.centro_custo_pc = request.centro_custo_pc;
  }
  if (compraManutencao.requisitante !== request.requisitante) {
    arrAlteracoes.push({
      campo: 'requisitante',
      valor_antigo: compraManutencao.requisitante,
      valor_novo: request.requisitante,
    });
    newCompraManutencao.requisitante = request.requisitante;
  }
  if (compraManutencao.fornecedor !== request.fornecedor) {
    arrAlteracoes.push({
      campo: 'fornecedor',
      valor_antigo: compraManutencao.fornecedor,
      valor_novo: request.fornecedor,
    });
    newCompraManutencao.fornecedor = request.fornecedor;
  }
  if (arrAlteracoes.length > 0) {
    const createHistoricoAlteracoesService = new CreateHistoricoAlteracoesService();
    const arrAlteracoesTratado = arrAlteracoes.map(alteracao => ({
      ...alteracao,
      valor_antigo: alteracao.valor_antigo ? alteracao.valor_antigo : '',
      valor_novo: alteracao.valor_novo ? alteracao.valor_novo : '',
      tabela: 'compras_manutencao',
      tabela_alterada_id: compraManutencao.id,
    }));
    createHistoricoAlteracoesService.execute(arrAlteracoesTratado);
  }
  return newCompraManutencao;
}
