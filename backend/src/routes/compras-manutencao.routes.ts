import { Router, Request, Response } from 'express';
import { FindOperator, getRepository, Like, Raw } from 'typeorm';
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

interface IFiltro {
  sc?: FindOperator<string>[];
  pc?: FindOperator<string>[];
  produto?: FindOperator<string>[];
  descricao?: FindOperator<string>[];
  aplicacao?: FindOperator<string>[];
  observacao?: FindOperator<string>[];
}

function filtroGeralDinamico(search: string, field: string): IFiltro {
  const newSearch = search.split(" ").join('%');
  const arrCampos = ['sc', 'pc', 'produto', 'descricao', 'aplicacao', 'observacao'];
  //console.log(arrSearch)
  
  const ret:IFiltro = {[field]: Like(`%${newSearch}%`)};

  return ret;
}

function filter(alias: string | undefined): string {

}

function montFilterString(filed, search){

}

comprasManutencaoRouter.get('/', async (request: Request, response: Response) => {
  // const now = new Date().getTime();
  const { limit, skip, search, field } = request.query;
  const comprasManutencaoRepository = getRepository(ComprasManutencao)

  

  const [comprasManutencao, total] = await comprasManutencaoRepository.findAndCount({
    relations: ['tipo_pagamento', 'solicitante'],
    order: {sc: "DESC", item: "ASC"},
    take: !Number.isNaN(Number(limit)) ? Number(limit) : 10,
    skip: !Number.isNaN(Number(skip)) ? Number(skip) : 0,
    where: search ? filtroGeralDinamico(search, field) : {},
  });

  // console.log(`GET RESPONSE ${limit} Registers in ${((new Date().getTime()) - now)/1000}s`)
  return response.json({comprasManutencao, total});
});

comprasManutencaoRouter.post('/', async (request: Request, response: Response) => {
  const insertCompraManutencao: CreateCompraManutencao = request.body;

  const createCompraManutencao = new CreateCompraManutencaoService();

  const dt_aprovacao_n1 = !!insertCompraManutencao.dt_aprovacao_n1 ? new Date(insertCompraManutencao.dt_aprovacao_n1) : null
  const dt_aprovacao_n2 = !!insertCompraManutencao.dt_aprovacao_n2 ? new Date(insertCompraManutencao.dt_aprovacao_n2) : null
  const dt_aprovacao_n3 = !!insertCompraManutencao.dt_aprovacao_n3 ? new Date(insertCompraManutencao.dt_aprovacao_n3) : null
  const previsao_entrega = !!insertCompraManutencao.previsao_entrega ? new Date(insertCompraManutencao.previsao_entrega) : null
  const data_pc = !!insertCompraManutencao.data_pc ? new Date(insertCompraManutencao.data_pc) : null

  const compraManutencao = await createCompraManutencao.execute({
    ...insertCompraManutencao,
    emissao: new Date(insertCompraManutencao.emissao),
    dt_aprovacao_n1,
    dt_aprovacao_n2,
    dt_aprovacao_n3,
    previsao_entrega,
    data_pc
  });

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
