import { Router, Request, Response } from 'express';
import { FindOperator, getRepository, Like, In, Equal } from 'typeorm';
import multer from 'multer';

import AppError from '../errors/AppError';
import uploadConfig from '../config/upload';
import Solicitantes from '../models/Solicitantes';

import ComprasManutencao from '../models/ComprasManutencao';

import CreateCompraManutencaoService, {
  CreateCompraManutencao,
} from '../services/comprasmanutencao/CreateCompraManutencaoService';
import DeleteCompraManutencaoService from '../services/comprasmanutencao/DeleteCompraManutencaoService';
import ImportCompraManutencaoService from '../services/comprasmanutencao/ImportCompraManutencaoService';
import UpdateStatusAprovacaoComprasManutencao from '../services/comprasmanutencao/UpdateStatusAprovacaoComprasManutencao';

const comprasManutencaoRouter = Router();
const upload = multer(uploadConfig);

// function isComprasManutencao(object: any): object is string {
//   return 'id' === object;
// }

interface Filtro {
  sc?: FindOperator<string>;
  pc?: FindOperator<string>;
  status?: FindOperator<string>;
  //  emissao?: FindOperator<string>;
  produto?: FindOperator<string>;
  descricao?: FindOperator<string>;
  aplicacao?: FindOperator<string>;
  observacao?: FindOperator<string>;
  solicitante?: FindOperator<string>;
  requisitante?: FindOperator<string>;
  prioridade?: FindOperator<string>;
  solicitante_id?: FindOperator<string>;
}

//  const fieldsFilter = ['sc', 'pc', 'status', 'produto', 'descricao', 'aplicacao', 'observacao', 'solicitante', 'requisitante']

async function filtroGeralDinamico(
  arrayStringFilter: string[],
): Promise<Filtro> {
  //  const newSearch = search.split(" ").join('%');
  //  const arrCampos = ['sc', 'pc', 'produto', 'descricao', 'aplicacao', 'observacao'];
  //  console.log(arrSearch)

  const iFilterReturn = {} as Filtro;

  const arrayFilters: Filters[] = arrayStringFilter.map(tringFilter => {
    return JSON.parse(tringFilter) as Filters;
  });

  arrayFilters.forEach(filter => {
    const { field, search } = filter;

    if (
      field === 'sc' ||
      field === 'pc' ||
      field === 'status' ||
      field === 'produto' ||
      field === 'descricao' ||
      field === 'aplicacao' ||
      field === 'observacao' ||
      field === 'requisitante' ||
      field === 'prioridade'
    ) {
      const newSearch = search.split(' ').join('%');
      iFilterReturn[field] = Like(`%${newSearch.toUpperCase()}%`);
    }
  });

  const indexPrioridade = arrayFilters.findIndex(
    filter => filter.field === 'prioridade',
  );
  if (indexPrioridade >= 0) {
    if (arrayFilters[indexPrioridade].search !== '') {
      iFilterReturn.prioridade = Equal(arrayFilters[indexPrioridade].search);
    } else {
      delete iFilterReturn.prioridade;
    }
  }

  const indexSolicitante = arrayFilters.findIndex(
    filter => filter.field === 'solicitante',
  );
  if (indexSolicitante >= 0) {
    const { field, search } = arrayFilters[indexSolicitante];
    if (field === 'solicitante') {
      const solicitanteRepository = getRepository(Solicitantes);
      const solicitantes = await solicitanteRepository.find({
        where: {
          usuario: Like(`%${search.toLocaleLowerCase()}%`),
        },
      });
      if (solicitantes.length > 0) {
        const arrSolicitanteId = solicitantes.map(solicitante => {
          return solicitante.id;
        });
        iFilterReturn.solicitante_id = In(arrSolicitanteId);
      }
    }
  }

  return iFilterReturn;
}

interface QueryFilter {
  limit: string;
  skip: string;
  filters: string[];
}

interface Filters {
  search: string;
  field: string;
}

comprasManutencaoRouter.get(
  '/',
  async (request: Request, response: Response) => {
    //  const now = new Date().getTime();
    const comprasManutencaoRepository = getRepository(ComprasManutencao);

    const { limit, skip, filters }: QueryFilter = request.query as any;
    // const { field, search } = JSON.parse(filters[0]) as Filters;
    // const { field: field1, search: search1 } =
    //   filters && filters[1] ? (JSON.parse(filters[1]) as Filters) : ({} as any);

    const Filtro = filters ? await filtroGeralDinamico(filters) : {};

    // if(filters[1])
    //   Filtro.push(await filtroGeralDinamico(search1, field1));

    // console.log(Filtro[0])
    const [
      comprasManutencao,
      total,
    ] = await comprasManutencaoRepository.findAndCount({
      relations: ['tipo_pagamento', 'solicitante'],
      order: { sc: 'DESC', item: 'ASC' },
      take: !Number.isNaN(Number(limit)) ? Number(limit) : 10,
      skip: !Number.isNaN(Number(skip)) ? Number(skip) : 0,
      where: Filtro,
    });

    const lastUpdate = (
      await comprasManutencaoRepository.findOne({
        select: ['updated_at'],
        order: {
          updated_at: 'DESC',
        },
      })
    )?.updated_at;

    // comprasManutencaoRepository.createQueryBuilder('compras_manutencao')
    //   .where('')
    //  console.log(`GET RESPONSE ${limit} Registers in ${((new Date().getTime()) - now)/1000}s`)
    return response.json({ comprasManutencao, total, lastUpdate });
  },
);

comprasManutencaoRouter.get(
  '/:relatorio',
  async (request: Request, response: Response) => {
    //  const now = new Date().getTime();
    const comprasManutencaoRepository = getRepository(ComprasManutencao);

    const relatorio = request.params.relatorio as string;
    if (relatorio === 'nivel-2' || relatorio === 'nivel-1') {
      let status = '05-PC-BLOQUEADO NVL2';
      if (relatorio === 'nivel-1') {
        status = '04-PC-BLOQUEADO NVL1';
      }
      const [
        comprasManutencao,
      ] = await comprasManutencaoRepository.findAndCount({
        order: {
          status_aprovacao: 'ASC',
          pc: 'ASC',
          valor_total: 'DESC',
        },
        where: { status },
      });
      return response.json(comprasManutencao);
    }
    throw new AppError('Erro Parametros');
  },
);

comprasManutencaoRouter.post(
  '/',
  async (request: Request, response: Response) => {
    const insertCompraManutencao: CreateCompraManutencao = request.body;

    const createCompraManutencao = new CreateCompraManutencaoService();

    const dt_aprovacao_n1 = insertCompraManutencao.dt_aprovacao_n1
      ? new Date(insertCompraManutencao.dt_aprovacao_n1)
      : null;
    const dt_aprovacao_n2 = insertCompraManutencao.dt_aprovacao_n2
      ? new Date(insertCompraManutencao.dt_aprovacao_n2)
      : null;
    const dt_aprovacao_n3 = insertCompraManutencao.dt_aprovacao_n3
      ? new Date(insertCompraManutencao.dt_aprovacao_n3)
      : null;
    const previsao_entrega = insertCompraManutencao.previsao_entrega
      ? new Date(insertCompraManutencao.previsao_entrega)
      : null;
    const data_pc = insertCompraManutencao.data_pc
      ? new Date(insertCompraManutencao.data_pc)
      : null;

    const compraManutencao = await createCompraManutencao.execute({
      ...insertCompraManutencao,
      emissao: new Date(insertCompraManutencao.emissao),
      dt_aprovacao_n1,
      dt_aprovacao_n2,
      dt_aprovacao_n3,
      previsao_entrega,
      data_pc,
    });

    return response.json(compraManutencao);
  },
);

comprasManutencaoRouter.delete(
  '/:id',
  async (request: Request, response: Response) => {
    const { id } = request.params;

    const deleteCompraManutencaoService = new DeleteCompraManutencaoService();

    await deleteCompraManutencaoService.execute({ id });

    return response.json();
  },
);

comprasManutencaoRouter.post(
  '/import',
  upload.single('file'),
  async (request: Request, response: Response) => {
    const now = Date.now();
    const { nome_tabela } = request.body;
    const importCompraManutencaoService = new ImportCompraManutencaoService();
    const comprasManutencao = await importCompraManutencaoService.execute({
      importFilename: request.file.filename,
      nome_tabela,
    });
    console.log(`${(Date.now() - now) / 1000}s`);
    return response.json(comprasManutencao);
  },
);

comprasManutencaoRouter.patch(
  '/update-status-aprovacao/:pc',
  async (request: Request, response: Response) => {
    const { status_aprovacao } = request.body;
    const { pc } = request.params;

    const updateStatusAprovacaoComprasManutencao = new UpdateStatusAprovacaoComprasManutencao();
    const affected = await updateStatusAprovacaoComprasManutencao.execute({
      pc,
      status_aprovacao,
    });
    response.json(affected);
  },
);

export default comprasManutencaoRouter;
