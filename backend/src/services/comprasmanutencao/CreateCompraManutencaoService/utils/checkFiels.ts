import AppError from '../../../../errors/AppError';
import { CreateCompraManutencao } from '../';

export default function checkFiels(request: CreateCompraManutencao): void {
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
    if(request.requisitante === null){
      request.requisitante = '';
    }
  }