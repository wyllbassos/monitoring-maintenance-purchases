import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import ComprasManutencao from '../models/ComprasManutencao'

import CreateCompraManutencaoService from '../services/CreateCompraManutencaoService';
import DeleteCompraManutencaoService from '../services/DeleteCompraManutencaoService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const comprasManutencaoRouter = Router();

comprasManutencaoRouter.get('/', async (request: Request, response: Response) => {
  const comprasManutencaoRepository = getRepository(ComprasManutencao)

  const comprasManutencao = await comprasManutencaoRepository.find();

  return response.json(comprasManutencao);
});

comprasManutencaoRouter.post('/', async (request: Request, response: Response) => {
  const insertCompraManutencao: ComprasManutencao = request.body;

  const createCompraManutencao = new CreateCompraManutencaoService();

  const compraManutencao = await createCompraManutencao.execute(insertCompraManutencao);

  return response.json(compraManutencao);
});

comprasManutencaoRouter.delete('/:id', async (request: Request, response: Response) => {
    const { id } = request.params

    const deleteCompraManutencaoService = new DeleteCompraManutencaoService();

    await deleteCompraManutencaoService.execute({ id });

    return response.json();
  },
);

// comprasManutencaoRouter.post(
//   '/import',
//   async (request: Request, response: Response) => {
//     // TODO
//   },
// );

export default comprasManutencaoRouter;
