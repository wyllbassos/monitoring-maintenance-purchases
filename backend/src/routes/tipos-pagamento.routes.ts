import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import TipoPagamento from '../models/TiposPagamento';

import CreateTipoPagamentoService from '../services/tipopagamento/CreateTipoPagamentoService';

const tiposPagamentoRouter = Router();

tiposPagamentoRouter.get('/', async (request: Request, response: Response) => {
  const tiposPagamentoRepository = getRepository(TipoPagamento);

  const tipoPagamento = await tiposPagamentoRepository.find({
    relations: ['compras_manutencao'],
  });

  return response.json(tipoPagamento);
});

tiposPagamentoRouter.post('/', async (request: Request, response: Response) => {
  const insertTipoPagamento: TipoPagamento = request.body;

  const createTipoPagamentoService = new CreateTipoPagamentoService();

  const solicitante = await createTipoPagamentoService.execute(
    insertTipoPagamento,
  );

  return response.json(solicitante);
});

export default tiposPagamentoRouter;
