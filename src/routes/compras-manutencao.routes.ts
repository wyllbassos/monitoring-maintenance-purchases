import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import ComprasManutencao from '../models/ComprasManutencao'

// import TransactionsRepository from '../repositories/TransactionsRepository';
 import CreateCompraManutencao from '../services/CreateCompraManutencao';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const comprasManutencaoRouter = Router();

comprasManutencaoRouter.get('/', async (request: Request, response: Response) => {
  const comprasManutencaoRepository = getRepository(ComprasManutencao)
  
  const comprasManutencao = await comprasManutencaoRepository.find();

  return response.json(comprasManutencao);
});

 comprasManutencaoRouter.post('/', async (request: Request, response: Response) => {
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
    area, } = request.body;

    const createCompraManutencao = new CreateCompraManutencao();

   const compraManutencao = await createCompraManutencao.execute({
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

  return response.json(compraManutencao);
});

// comprasManutencaoRouter.delete(
//   '/:id',
//   async (request: Request, response: Response) => {
//     // TODO
//   },
// );

// comprasManutencaoRouter.post(
//   '/import',
//   async (request: Request, response: Response) => {
//     // TODO
//   },
// );

export default comprasManutencaoRouter;
