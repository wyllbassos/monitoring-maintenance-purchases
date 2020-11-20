import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import HistoricoAlteracoes from '../models/HistoricoAlteracoes'

const historicoAlteracoesRouter = Router();

historicoAlteracoesRouter.get('/', async (request: Request, response: Response) => {
  const historicoAlteracoesRepository = getRepository(HistoricoAlteracoes)

  const historicoAlteracoes = await historicoAlteracoesRepository.find();

  return response.json(historicoAlteracoes);
});

export default historicoAlteracoesRouter;
