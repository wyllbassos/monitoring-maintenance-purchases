import React, { useState, useEffect, useCallback } from 'react';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container, Paginacao, Filtros, ContainerList } from './styles';

import List from './List';

export interface Compra {
  status: string;
  sc: string;
  item: string;
  produto: string;
  quantidade: number;
  emissao: string;
  descricao: string;
  aplicacao: string;
  observacao: string;
  pc: string;
  data_pc: string;
  previsao_entrega: string;
  valor_total: number;
  status_aprovacao: string | null;
  conta_pc: string;
  centro_custo_pc: string;
  solicitante: {
    usuario: string;
  };
}

interface Filter {
  search: string;
  field: string;
}

const fieldsFilter = [
  'sc',
  'pc',
  'status',
  'produto',
  'descricao',
  'aplicacao',
  'observacao',
  'solicitante',
  'requisitante',
  'prioridade',
];

const ComprasList: React.FC = () => {
  const [compras, setCompras] = useState<Compra[] | null>(null);
  const [limit, setLimit] = useState(3);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [skip, setSkip] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [search, setSearch] = useState('');
  const [field, setField] = useState('sc');
  const [updateAt, setUpdateAt] = useState<Date | undefined>(undefined);
  const [filters, setFilters] = useState<Filter[]>(
    fieldsFilter.map(fieldFilter => {
      return { field: fieldFilter, search: '' };
    }),
  );

  useEffect(() => {
    async function loadCompras(): Promise<void> {
      const { data } = await api.get<{
        comprasManutencao: Compra[];
        total: number;
        lastUpdate: Date | undefined;
      }>('/compras-manutencao/filter', {
        params: { limit, skip, filters },
      });

      const { comprasManutencao, total, lastUpdate } = data;
      setUpdateAt(lastUpdate);
      setTotalRegistros(total);
      setTotalPaginas(Math.ceil(total / limit));
      setCompras(comprasManutencao);
    }

    loadCompras();
    // console.log(filters)
  }, [limit, skip, filters, search, field]);

  const handleNextPage = useCallback(() => {
    const newPage = pagina + 1;
    if (newPage > totalPaginas) return;
    setPagina(newPage);
    setSkip(pagina * limit);
  }, [pagina, limit, totalPaginas]);

  const handlePreviusPage = useCallback(() => {
    const newPage = pagina - 1;
    if (newPage <= 0) return;
    setPagina(newPage);
    setSkip((newPage - 1) * limit);
  }, [pagina, limit]);

  const handleChangePage = useCallback(
    (newPage: number) => {
      if (newPage <= 0) {
        setPagina(1);
        setSkip(0);
      } else if (newPage >= totalPaginas) {
        setPagina(totalPaginas);
        setSkip((totalPaginas - 1) * limit);
      } else {
        setPagina(newPage);
        setSkip((newPage - 1) * limit);
      }
    },
    [totalPaginas, limit],
  );

  const handleSetLimit = useCallback(
    e => {
      const newLimit = Number(e.target.value);
      if (!(pagina === 1)) {
        const newPage = (limit * pagina) / newLimit;
        // console.log(newPage)
        // if (newPage <= 1)
        setPagina(Math.ceil(newPage));
      }
      setLimit(newLimit);
    },
    [limit, pagina],
  );

  const handleChangeField = useCallback(
    e => {
      const newField = e.target.value as string;
      // const newFilters = [...filters];
      const indexFilter = filters.findIndex(
        filter => filter.field === newField,
      );
      // if (filters[indexFilter].search !== '')
      //   setSearch(filters[indexFilter].search);
      // setField(newField);
      // setFilters(newFilters);
      // newFilters[indexFilter].
      setField(newField);
      setSearch(filters[indexFilter].search);
    },
    [filters, setSearch, setField],
  );

  const handleChangeSearch = useCallback(
    e => {
      const newSearch = e.target.value.toLocaleUpperCase();
      const newFilters = [...filters];
      const indexFilter = filters.findIndex(filter => filter.field === field);
      newFilters[indexFilter].search = newSearch;
      // handleChangePage(0);
      // setSearch(newSearch.toLocaleUpperCase());
      // setFilters(newFilters);]
      // const newSearch = e.target.value;
      handleChangePage(0);
      setFilters(newFilters);
      setSearch(newSearch.toLocaleUpperCase());
    },
    [handleChangePage, setSearch, field, filters],
  );

  const handleClearFilter = useCallback(
    e => {
      const newFilters = fieldsFilter.map(fieldFilter => {
        return { field: fieldFilter, search: '' };
      });
      setField('sc');
      setSearch('');
      setFilters(newFilters);
    },
    [setField, setSearch, setFilters],
  );

  const handleSaveFilter = useCallback(
    e => {
      const newFilters = [...filters];
      const indexFilter = filters.findIndex(filter => filter.field === field);
      newFilters[indexFilter].search = search.toLocaleUpperCase();
      setFilters(newFilters);
    },
    [filters, field, search, setFilters],
  );

  return (
    <>
      <Header size="small" selected="/" updateAt={updateAt} />
      <Filtros>
        <span>Pesquisar</span>
        <select value={field} onChange={handleChangeField}>
          {fieldsFilter.map(fieldFilter => (
            <option key={fieldFilter} value={fieldFilter}>
              {fieldFilter === 'produto' ? 'CODIGO' : fieldFilter.toUpperCase()}
            </option>
          ))}
        </select>
        <input type="text" value={search} onChange={handleChangeSearch} />
        <button onClick={handleClearFilter} type="button">
          Limpar
        </button>
      </Filtros>

      <Container>
        <div>
          <span>Filtros:</span>
          {filters.map(filter =>
            filter.search === '' ? (
              ''
            ) : (
              <div key={`${filter.field} ${filter.search}`}>
                <span>{`${filter.field}: `}</span>
                <span>{`${filter.search}`}</span>
              </div>
            ),
          )}
        </div>
        {compras !== null ? (
          <List compras={compras} />
        ) : (
          <ul>
            <li>Carregando</li>
          </ul>
        )}
      </Container>

      <Paginacao>
        <span>{`Total: ${totalRegistros}`}</span>
        <div>
          <span>Mostrar:</span>
          <select value={limit} onChange={handleSetLimit}>
            <option value="3">3</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </select>
        </div>
        {/*
          <button onClick={e => handlePreviusPage()}>{'<'}</button>
        */}
        <span>{`Pagina: `}</span>
        <input
          type="number"
          value={pagina}
          onChange={e => handleChangePage(Number(e.target.value))}
        />
        <span>{` de ${totalPaginas}`}</span>
        {/*
        <button onClick={e => handleNextPage()}>{'>'}</button>
        */}
      </Paginacao>
    </>
  );
};

export default ComprasList;
