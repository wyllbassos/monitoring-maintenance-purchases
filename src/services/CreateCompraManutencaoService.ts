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
  ja_emitiu_fornecedor: 'S' | null;
  valor_total: number;
  status_sc: 'B' | 'L' | 'R';
  status_pc: 'B' | 'L' | 'R' | null;
  previsao_entrega: Date;
  pc_eliminado_residuo: 'S' | null;
  motivo_eliminado_residuo: string;
  sc_eliminado_residuo: 'S' | null;
  data_pc: Date;
  conta_pc: string;
  centro_custo_pc: string;
  solicitante: string;
  requisitante: string;
  fornecedor: string;
  forma_pagamento: string;
  pagamento_antecipado: 'S' | null;
  area: 'PCM' | 'ALMOX' | 'PRODUCAO' | 'OUTROS';
}

class CreateCompraManutencaoService {
  public async execute(request: Request): Promise<ComprasManutencao> {
    const comprasManutencaoRepository = getRepository(ComprasManutencao);    

    checkFiels(request);

    const compraManutencao = comprasManutencaoRepository.create(request);

    await comprasManutencaoRepository.save(compraManutencao);

    return compraManutencao;
  }
}

function checkFiels(request: Request) {
  if(!request.status){
    throw new AppError(`The status field cannot be null`);
  }
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
  if(['B', 'L', 'R'].indexOf(request.status_sc) === -1){
    throw new AppError(`The status_sc field must be 'B', 'L', 'R'`);
  }
  if(request.status_pc !== undefined && request.status_pc !== null && ['B', 'L', 'R'].indexOf(request.status_pc) === -1){
    throw new AppError(`The status_pc field must be 'B', 'L', 'R'`);
  }
  if(request.pc_eliminado_residuo !== undefined && request.pc_eliminado_residuo !== null && request.pc_eliminado_residuo !== "S"){
    throw new AppError(`The pc_eliminado_residuo field must be 'S'`);
  }
  if(request.sc_eliminado_residuo !== undefined && request.sc_eliminado_residuo !== null && request.sc_eliminado_residuo !== "S"){
    throw new AppError(`The sc_eliminado_residuo field must be 'S'`);
  }
  if(!request.solicitante){
    throw new AppError(`The solicitante field cannot be null`);
  }
  if(request.pagamento_antecipado !== undefined && request.pagamento_antecipado !== null && request.pagamento_antecipado !== "S"){
    throw new AppError(`The pagamento_antecipado field must be 'S'`);
  }
  if(!request.area){
    throw new AppError(`The area field cannot be null`);
  }
  if(request.area !== null && ['B', 'L', 'R'].indexOf(request.area) === -1){
    throw new AppError(`The area field must be 'PCM', 'ALMOX', 'PRODUCAO', 'OUTROS'`);
  }
}

export default CreateCompraManutencaoService;
