import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import ComprasManutencao from '../models/ComprasManutencao'

import CreateCompraManutencaoService, { CreateCompraManutencao } from '../services/comprasmanutencao/CreateCompraManutencaoService';
import DeleteCompraManutencaoService from '../services/comprasmanutencao/DeleteCompraManutencaoService';
import ImportCompraManutencaoService from '../services/comprasmanutencao/ImportCompraManutencaoService';

import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

const comprasManutencaoRouter = Router();
const upload = multer(uploadConfig);

function isComprasManutencao(object: any): object is string {
  return 'id' === object;
}
const keys = ['id', 'sc']
comprasManutencaoRouter.get('/', async (request: Request, response: Response) => {
  const comprasManutencaoRepository = getRepository(ComprasManutencao)

  const comprasManutencao = await comprasManutencaoRepository.find({
    relations: ['tipo_pagamento', 'solicitante']
  });

  return response.json(comprasManutencao);
});

comprasManutencaoRouter.post('/', async (request: Request, response: Response) => {
  const insertCompraManutencao: CreateCompraManutencao = request.body;

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

comprasManutencaoRouter.post(
  '/import',
  upload.single('file'),
  async (request: Request, response: Response) => {
    const now = Date.now()
    const { nome_tabela } = request.body
    const importCompraManutencaoService = new ImportCompraManutencaoService();
    const comprasManutencao = await importCompraManutencaoService.execute({
      importFilename: request.file.filename,
      nome_tabela,
    });
    console.log((Date.now() - now) / 1000 + 's')
    return response.json(comprasManutencao);
  },
);

export default comprasManutencaoRouter;
