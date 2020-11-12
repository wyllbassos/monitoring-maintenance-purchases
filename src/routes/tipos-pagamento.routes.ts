import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import TipoPagamento from '../models/TiposPagamento'

import CreateTipoPagamentoService from '../services/tipopagamento/CreateTipoPagamentoService';
// import DeleteCompraManutencaoService from '../services/DeleteCompraManutencaoService';


const tiposPagamentoRouter = Router();

tiposPagamentoRouter.get('/', async (request: Request, response: Response) => {
  const tiposPagamentoRepository = getRepository(TipoPagamento)

  const tipoPagamento = await tiposPagamentoRepository.find({ 
    relations: ['compras_manutencao'],
  });

  return response.json(tipoPagamento);
});

tiposPagamentoRouter.post('/', async (request: Request, response: Response) => {
  const insertTipoPagamento: TipoPagamento = request.body;

  const createTipoPagamentoService = new CreateTipoPagamentoService();

  const solicitante = await createTipoPagamentoService.execute(insertTipoPagamento);

  return response.json(solicitante);
});

// tiposPagamentoRouter.delete('/:id', async (request: Request, response: Response) => {
//     const { id } = request.params

//     const deleteCompraManutencaoService = new DeleteCompraManutencaoService();

//     await deleteCompraManutencaoService.execute({ id });

//     return response.json();
//   },
// );

// tiposPagamentoRouter.post(
//   '/import',
//   async (request: Request, response: Response) => {
//     // TODO
//   },
// );

export default tiposPagamentoRouter;
