import { getRepository, Repository } from 'typeorm';

import AppError from '../../errors/AppError';

import ComprasManutencao from '../../models/ComprasManutencao';
import Solicitantes from './../../models/Solicitantes';
import TiposPagamento from './../../models/TiposPagamento';

import CreateSolicitanteService from '../solicitante/CreateSolicitanteService';
import CreateTipoPagamentoService from '../tipopagamento/CreateTipoPagamentoService';
import CreateHistoricoAlteracoesService, { CreateHistoricoAlteracoes } from './../historicoalteracoes/CreateHistoricoAlteracoesService';

export interface CreateCompraManutencao {
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
  dt_aprovacao_n1: Date | null |  '';
  dt_aprovacao_n2: Date | null |  '';
  dt_aprovacao_n3: Date | null |  '';
  quantidade_ja_entregue: number;
  ja_emitiu_fornecedor: string;
  valor_total: number;
  status_sc: 'B' | 'L' | 'R';
  status_pc: string;
  previsao_entrega: Date | null |  '';
  pc_eliminado_residuo: string;
  motivo_eliminado_residuo: string;
  sc_eliminado_residuo: string;
  data_pc: Date | null |  '';
  conta_pc: string;
  centro_custo_pc: string;
  tipo_pagamento: string;
  solicitante: string;
  requisitante: string;
  fornecedor: string;
}

class CreateCompraManutencaoService {
  public async execute(request: CreateCompraManutencao): Promise<ComprasManutencao> {
    const { sc, item } = request;
    const comprasManutencaoRepository = getRepository(ComprasManutencao);    
    const solicitantesRepository = getRepository(Solicitantes);    
    const tiposPagamentoRepository = getRepository(TiposPagamento);    
    
    checkFiels(request);

    const createSolicitanteService = new CreateSolicitanteService()
    const createTipoPagamentoService = new CreateTipoPagamentoService()

    let solicitante = await solicitantesRepository.findOne({ where: { usuario: request.solicitante } })
    let tipo_pagamento = await tiposPagamentoRepository.findOne({ where: { codigo: request.tipo_pagamento } })

    if(!solicitante){
      solicitante = await createSolicitanteService.execute({ usuario: request.solicitante, area: "OUTROS" })
    }
    if(!tipo_pagamento && request.tipo_pagamento !== ''){
      tipo_pagamento = await createTipoPagamentoService.execute({ codigo: request.tipo_pagamento, descricao: "-" })
    } else if (request.tipo_pagamento !== ''){
      tipo_pagamento = undefined;
    }
    
    
    let compraManutencao = await comprasManutencaoRepository.findOne({ where: { sc, item } })

    if (compraManutencao){
      
      await updateCompraManutencao({ compraManutencao, request });
      
      comprasManutencaoRepository.save(compraManutencao);
      
      return compraManutencao;
    }

    compraManutencao = comprasManutencaoRepository.create({
      ...request,
      solicitante: undefined,
      tipo_pagamento: undefined,
      solicitante_id: solicitante.id,
      tipo_pagamento_id: tipo_pagamento ? tipo_pagamento.id : undefined,
    });

    compraManutencao.solicitante = solicitante;
    compraManutencao.tipo_pagamento = tipo_pagamento ? tipo_pagamento : null;


    // definir regras de negocio para setar os campos status & pagamento_antecipado & area.
    compraManutencao.status = "Teste";
    
    await comprasManutencaoRepository.save(compraManutencao);
    
    return compraManutencao;
  }
}

function checkFiels(request: CreateCompraManutencao) {
  if(!request.sc){
    throw new AppError(`The sc field cannot be null`);
  }
  if(!request.item){
    throw new AppError(`The item field cannot be null`);
  }
  if(!request.produto){
    throw new AppError(`The produto field cannot be null`);
  }
  if(!request.descricao){
    throw new AppError(`The descricao field cannot be null`);
  }
  if(!request.quantidade){
    throw new AppError(`The quantidade field cannot be null`);
  }
  if(!request.emissao){
    throw new AppError(`The emissao field cannot be null`);
  }
  if(!request.status_sc){
    throw new AppError(`The status_sc field cannot be null`);
  }
  if(['B', 'L', 'R'].indexOf(request.status_sc) < 0){
    throw new AppError(`The status_sc field must be 'B', 'L', 'R'`);
  }
  if(request.status_pc === null){
    request.status_pc = '';
  }
  if(['', 'B', 'L', 'R'].indexOf(request.status_pc) < 0){
    throw new AppError(`The status_pc field must be '', 'B', 'L', 'R'`);
  }
  if(request.pc_eliminado_residuo === null){
    request.pc_eliminado_residuo = '';
  }
  if(['', 'S'].indexOf(request.pc_eliminado_residuo) < 0 ){
    throw new AppError(`The pc_eliminado_residuo field must be '', 'S'`);
  }
  if(request.sc_eliminado_residuo === null){
    request.sc_eliminado_residuo = '';
  }
  if(['', 'S'].indexOf(request.sc_eliminado_residuo) < 0 ){
    throw new AppError(`The sc_eliminado_residuo field must be '', 'S'`);
  }
  if(request.ja_emitiu_fornecedor === null){
    request.ja_emitiu_fornecedor = '';
  }
  if(['', 'S'].indexOf(request.ja_emitiu_fornecedor) < 0 ){
    throw new AppError(`The ja_emitiu_fornecedor field must be '', 'S'`);
  }
  if(!request.solicitante){
    throw new AppError(`The solicitante field cannot be null`);
  }

  if(request.dt_aprovacao_n1 === ''){
    request.dt_aprovacao_n1 = null;
  }
  if(request.dt_aprovacao_n2 === ''){
    request.dt_aprovacao_n2 = null;
  }
  if(request.dt_aprovacao_n3 === ''){
    request.dt_aprovacao_n3 = null;
  }
  if(request.previsao_entrega === ''){
    request.previsao_entrega = null;
  }
  if(request.data_pc === ''){
    request.data_pc = null;
  }
}

async function updateCompraManutencao (
  { compraManutencao, request }:
  {compraManutencao:ComprasManutencao, request:CreateCompraManutencao} ){
    let arrAlteracoes: {
      campo: string;
      valor_antigo: string | undefined;
      valor_novo: string | undefined
    } [] = [];

    if (compraManutencao.produto !== request.produto) {
      arrAlteracoes.push({
        campo: 'produto',
        valor_antigo: compraManutencao.produto,
        valor_novo: request.produto,
      })
      compraManutencao.produto = request.produto
    }
    if (compraManutencao.descricao !== request.descricao) {
        arrAlteracoes.push({
          campo: 'descricao',
          valor_antigo: compraManutencao.descricao,
          valor_novo: request.descricao,
        })
        compraManutencao.descricao = request.descricao
    }
    if (compraManutencao.quantidade.toString() !== request.quantidade.toString()) {
        arrAlteracoes.push({
          campo: 'quantidade',
          valor_antigo: compraManutencao.quantidade.toString(),
          valor_novo: request.quantidade.toString(),
        })
        compraManutencao.quantidade = request.quantidade
    }
    if (compraManutencao.emissao?.toISOString() !== request.emissao?.toISOString()) {
        arrAlteracoes.push({
          campo: 'emissao',
          valor_antigo: compraManutencao.emissao.toISOString(),
          valor_novo: request.emissao.toISOString(),
        })
        compraManutencao.emissao = request.emissao;
    }
    if (compraManutencao.aplicacao !== request.aplicacao) {
        arrAlteracoes.push({
          campo: 'aplicacao',
          valor_antigo: compraManutencao.aplicacao,
          valor_novo: request.aplicacao,
        })
        compraManutencao.aplicacao = request.aplicacao
    }
    if (compraManutencao.observacao !== request.observacao) {
        arrAlteracoes.push({
          campo: 'observacao',
          valor_antigo: compraManutencao.observacao,
          valor_novo: request.observacao,
        })
        compraManutencao.observacao = request.observacao
    }
    if (compraManutencao.cotacao !== request.cotacao) {
        arrAlteracoes.push({
          campo: 'cotacao',
          valor_antigo: compraManutencao.cotacao,
          valor_novo: request.cotacao,
        })
        compraManutencao.cotacao = request.cotacao
    }
    if (compraManutencao.pc !== request.pc) {
        arrAlteracoes.push({
          campo: 'pc',
          valor_antigo: compraManutencao.pc,
          valor_novo: request.pc,
        })
        compraManutencao.pc = request.pc
    }
    request.dt_aprovacao_n1 = request.dt_aprovacao_n1 === "" ? null : request.dt_aprovacao_n1;
    if (compraManutencao.dt_aprovacao_n1?.toISOString() !== request.dt_aprovacao_n1?.toISOString()) {
        arrAlteracoes.push({
          campo: 'dt_aprovacao_n1',
          valor_antigo: compraManutencao.dt_aprovacao_n1?.toISOString(),
          valor_novo: request.dt_aprovacao_n1?.toISOString(),
        })
        compraManutencao.dt_aprovacao_n1 = request.dt_aprovacao_n1
    }
    request.dt_aprovacao_n2 = request.dt_aprovacao_n2 === "" ? null : request.dt_aprovacao_n2;
    if (compraManutencao.dt_aprovacao_n2?.toISOString() !== request.dt_aprovacao_n2?.toISOString()) {
        arrAlteracoes.push({
          campo: 'dt_aprovacao_n2',
          valor_antigo: compraManutencao.dt_aprovacao_n2?.toISOString(),
          valor_novo: request.dt_aprovacao_n2?.toISOString(),
        })
        compraManutencao.dt_aprovacao_n2 = request.dt_aprovacao_n2
    }
    request.dt_aprovacao_n3 = request.dt_aprovacao_n3 === "" ? null : request.dt_aprovacao_n3;
    if (compraManutencao.dt_aprovacao_n3?.toISOString() !== request.dt_aprovacao_n3?.toISOString()) {
        arrAlteracoes.push({
          campo: 'dt_aprovacao_n3',
          valor_antigo: compraManutencao.dt_aprovacao_n3?.toISOString(),
          valor_novo: request.dt_aprovacao_n3?.toISOString(),
        })
        compraManutencao.dt_aprovacao_n3 = request.dt_aprovacao_n3;
    }
    if (compraManutencao.quantidade_ja_entregue.toString() !== request.quantidade_ja_entregue.toString()) {
        arrAlteracoes.push({
          campo: 'quantidade_ja_entregue',
          valor_antigo: compraManutencao.quantidade_ja_entregue.toString(),
          valor_novo: request.quantidade_ja_entregue.toString(),
        })
        compraManutencao.quantidade_ja_entregue = request.quantidade_ja_entregue
    }
    if (compraManutencao.ja_emitiu_fornecedor !== request.ja_emitiu_fornecedor) {
        arrAlteracoes.push({
          campo: 'ja_emitiu_fornecedor',
          valor_antigo: compraManutencao.ja_emitiu_fornecedor,
          valor_novo: request.ja_emitiu_fornecedor,
        })
        compraManutencao.ja_emitiu_fornecedor = request.ja_emitiu_fornecedor
    }

    if (compraManutencao.valor_total.toString() !== request.valor_total.toString()) {
        arrAlteracoes.push({
          campo: 'valor_total',
          valor_antigo: compraManutencao.valor_total.toString(),
          valor_novo: request.valor_total.toString(),
        })
        compraManutencao.valor_total = request.valor_total
    }
    
    if (compraManutencao.status_sc !== request.status_sc) {
        arrAlteracoes.push({
          campo: 'status_sc',
          valor_antigo: compraManutencao.status_sc,
          valor_novo: request.status_sc,
        })
        compraManutencao.status_sc = request.status_sc
    }
    if (compraManutencao.status_pc !== request.status_pc) {
        arrAlteracoes.push({
          campo: 'status_pc',
          valor_antigo: compraManutencao.status_pc,
          valor_novo: request.status_pc,
        })
        compraManutencao.status_pc = request.status_pc
    }
    request.previsao_entrega = request.previsao_entrega === "" ? null : request.previsao_entrega;
    if (compraManutencao.previsao_entrega?.toISOString() !== request.previsao_entrega?.toISOString()) {
        arrAlteracoes.push({
          campo: 'previsao_entrega',
          valor_antigo: compraManutencao.previsao_entrega?.toISOString(),
          valor_novo: request.previsao_entrega?.toISOString(),
        })
        compraManutencao.previsao_entrega = request.previsao_entrega
    }
    if (compraManutencao.pc_eliminado_residuo !== request.pc_eliminado_residuo) {
        arrAlteracoes.push({
          campo: 'pc_eliminado_residuo',
          valor_antigo: compraManutencao.pc_eliminado_residuo,
          valor_novo: request.pc_eliminado_residuo,
        })
        compraManutencao.pc_eliminado_residuo = request.pc_eliminado_residuo
    }
    if (compraManutencao.motivo_eliminado_residuo !== request.motivo_eliminado_residuo) {
        arrAlteracoes.push({
          campo: 'motivo_eliminado_residuo',
          valor_antigo: compraManutencao.motivo_eliminado_residuo,
          valor_novo: request.motivo_eliminado_residuo,
        })
        compraManutencao.motivo_eliminado_residuo = request.motivo_eliminado_residuo
    }
    if (compraManutencao.sc_eliminado_residuo !== request.sc_eliminado_residuo) {
        arrAlteracoes.push({
          campo: 'sc_eliminado_residuo',
          valor_antigo: compraManutencao.sc_eliminado_residuo,
          valor_novo: request.sc_eliminado_residuo,
        })
        compraManutencao.sc_eliminado_residuo = request.sc_eliminado_residuo
    }
    request.data_pc = request.data_pc === "" ? null : request.data_pc
    if (compraManutencao.data_pc?.toISOString() !== request.data_pc?.toISOString()) {
        arrAlteracoes.push({
          campo: 'data_pc',
          valor_antigo: compraManutencao.data_pc?.toISOString(),
          valor_novo: request.data_pc?.toISOString(),
        })
        compraManutencao.data_pc = request.data_pc;
    }
    if (compraManutencao.conta_pc !== request.conta_pc) {
        arrAlteracoes.push({
          campo: 'conta_pc',
          valor_antigo: compraManutencao.conta_pc,
          valor_novo: request.conta_pc,
        })
        compraManutencao.conta_pc = request.conta_pc
    }
    if (compraManutencao.centro_custo_pc !== request.centro_custo_pc) {
        arrAlteracoes.push({
          campo: 'centro_custo_pc',
          valor_antigo: compraManutencao.centro_custo_pc,
          valor_novo: request.centro_custo_pc,
        })
        compraManutencao.centro_custo_pc = request.centro_custo_pc
    }
    if (compraManutencao.requisitante !== request.requisitante) {
        arrAlteracoes.push({
          campo: 'requisitante',
          valor_antigo: compraManutencao.requisitante,
          valor_novo: request.requisitante,
        })
        compraManutencao.requisitante = request.requisitante
    }
    if (compraManutencao.fornecedor !== request.fornecedor) {
        arrAlteracoes.push({
          campo: 'fornecedor',
          valor_antigo: compraManutencao.fornecedor,
          valor_novo: request.fornecedor,
        })
        compraManutencao.fornecedor = request.fornecedor
    }
    if(arrAlteracoes.length > 0){
      const createHistoricoAlteracoesService = new CreateHistoricoAlteracoesService();
      const arrAlteracoesTratado = arrAlteracoes.map(alteracao => ({
        ...alteracao,
        valor_antigo: alteracao.valor_antigo ? alteracao.valor_antigo : '',
        valor_novo: alteracao.valor_novo ? alteracao.valor_novo : '',
        tabela: "compras_manutencao",
        tabela_alterada_id: compraManutencao.id,
      }))
      createHistoricoAlteracoesService.execute(arrAlteracoesTratado)
    }
}

export default CreateCompraManutencaoService;
