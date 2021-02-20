import { Request, Response } from 'express';
import { getRepository, FindOperator, Like, Equal, In } from 'typeorm';
import Solicitantes from '../models/Solicitantes';
import ComprasManutencao from '../models/ComprasManutencao';

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

interface QueryFilter {
  limit: string;
  skip: string;
  filters: string[];
}

interface Filters {
  search: string;
  field: string;
}

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

class ComprasManutencaoFilterController {
  public async show(request: Request, response: Response): Promise<Response> {
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
  }
}

export default ComprasManutencaoFilterController;
