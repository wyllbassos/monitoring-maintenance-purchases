import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Solicitantes from '../models/Solicitantes'

import CreateSolicitanteService from '../services/solicitante/CreateSolicitanteService';
// import DeleteCompraManutencaoService from '../services/DeleteCompraManutencaoService';


const solicitantesRouter = Router();

solicitantesRouter.get('/', async (request: Request, response: Response) => {
  const solicitantesRepository = getRepository(Solicitantes)

  const solicitantes = await solicitantesRepository.find({relations: ['compras_manutencao']});

  return response.json(solicitantes);
});

solicitantesRouter.post('/', async (request: Request, response: Response) => {
  const insertSolicitante: Solicitantes = request.body;

  const createSolicitantesService = new CreateSolicitanteService();

  const solicitante = await createSolicitantesService.execute(insertSolicitante);

  return response.json(solicitante);
});

// solicitantesRouter.delete('/:id', async (request: Request, response: Response) => {
//     const { id } = request.params

//     const deleteCompraManutencaoService = new DeleteCompraManutencaoService();

//     await deleteCompraManutencaoService.execute({ id });

//     return response.json();
//   },
// );

// solicitantesRouter.post(
//   '/import',
//   async (request: Request, response: Response) => {
//     // TODO
//   },
// );

export default solicitantesRouter;
