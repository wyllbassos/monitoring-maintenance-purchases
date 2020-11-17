import { getRepository, Repository } from 'typeorm';

import AppError from '../../errors/AppError';

import ComprasManutencao from '../../models/ComprasManutencao';
import Solicitantes from './../../models/Solicitantes';
import TiposPagamento from './../../models/TiposPagamento';

import CreateSolicitanteService from '../solicitante/CreateSolicitanteService'
import CreateTipoPagamentoService from '../tipopagamento/CreateTipoPagamentoService'

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
      updateCompraManutencao({ compraManutencao, request });
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

function updateCompraManutencao(
  { compraManutencao, request }:
  {compraManutencao:ComprasManutencao, request:CreateCompraManutencao} ){
    compraManutencao.produto = request.produto
    compraManutencao.descricao = request.descricao
    compraManutencao.quantidade = request.quantidade
    compraManutencao.emissao = request.emissao
    compraManutencao.aplicacao = request.aplicacao
    compraManutencao.observacao = request.observacao
    compraManutencao.cotacao = request.cotacao
    compraManutencao.pc = request.pc
    compraManutencao.dt_aprovacao_n1 = request.dt_aprovacao_n1 === '' ? null : request.dt_aprovacao_n1
    compraManutencao.dt_aprovacao_n2 = request.dt_aprovacao_n2 === '' ? null : request.dt_aprovacao_n2
    compraManutencao.dt_aprovacao_n3 = request.dt_aprovacao_n3 === '' ? null : request.dt_aprovacao_n3
    compraManutencao.quantidade_ja_entregue = request.quantidade_ja_entregue
    compraManutencao.ja_emitiu_fornecedor = request.ja_emitiu_fornecedor
    compraManutencao.valor_total = request.valor_total
    compraManutencao.status_sc = request.status_sc
    compraManutencao.status_pc = request.status_pc
    compraManutencao.previsao_entrega = request.previsao_entrega === '' ? null : request.previsao_entrega
    compraManutencao.pc_eliminado_residuo = request.pc_eliminado_residuo
    compraManutencao.motivo_eliminado_residuo = request.motivo_eliminado_residuo
    compraManutencao.sc_eliminado_residuo = request.sc_eliminado_residuo
    compraManutencao.data_pc = request.data_pc === '' ? null : request.data_pc
    compraManutencao.conta_pc = request.conta_pc
    compraManutencao.centro_custo_pc = request.centro_custo_pc
    compraManutencao.requisitante = request.requisitante
    compraManutencao.fornecedor = request.fornecedor
}

export default CreateCompraManutencaoService;
