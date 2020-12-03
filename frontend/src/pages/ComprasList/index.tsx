import React, { useState, useEffect, useCallback } from 'react';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container, Paginacao, Filtros } from './styles';

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
}

interface Filter {
  search: string;
  field: string;
}

const ComprasList: React.FC = () => {
  const [compras, setCompras] = useState<Compra[] | null>(null);
  const [limit, setLimit] = useState(3);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [skip, setSkip] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [search, setSearch] = useState('');
  //const [field, setField] = useState('sc');
  const [filters, setFilters] = useState<Filter[]>([{ field: 'sc', search: '' }]);

  useEffect(() => {
    async function loadCompras(): Promise<void> {
      const { data } = await api.get<{comprasManutencao: Compra[], total: number}>(
        '/compras-manutencao', {params: { limit, skip, filters }}
      );
      
      const { comprasManutencao, total } = data;
      setTotalRegistros(total);
      setTotalPaginas(Math.ceil(total / limit));
      setCompras(comprasManutencao);
    }

    loadCompras();
  }, [limit, skip, search, filters]);

  const handleNextPage = useCallback(() => {
    const newPage = pagina + 1;
    if(newPage > totalPaginas) return;
    setPagina(newPage);
    setSkip( pagina * limit);
  }, [pagina, limit, totalPaginas]);

  const handlePreviusPage = useCallback(() => {
    const newPage = pagina - 1;
    if(newPage <= 0) return;
    setPagina(newPage);
    setSkip((newPage-1) * limit );
  }, [pagina, limit]);


  const handleChangePage = useCallback((newPage: number) => {
    if(newPage <= 0){
      setPagina(1);
      setSkip(0);
    }
    else if(newPage >= totalPaginas){
      setPagina(totalPaginas);
      setSkip((totalPaginas-1) * limit);
    }
    else {
      setPagina(newPage);
      setSkip((newPage-1) * limit);
    }

  }, [totalPaginas, limit]);



  const handleSetLimit = useCallback(e => {
    const newLimit = Number(e.target.value);
    if (!(pagina === 1)){
      const newPage = (limit * pagina) / newLimit;
      //console.log(newPage)
      //if (newPage <= 1)
      setPagina(Math.ceil(newPage));
    }
    setLimit(newLimit);
  }, [limit, pagina]);

  const handleChangeField = useCallback(e => {
    const newFilters = [...filters];
    newFilters[filters.length - 1].field = e.target.value
    setFilters(newFilters);
  }, [filters]);

  const handleChangeSearch = useCallback(e => {
    handleChangePage(0);
    const newFilters = [...filters];
    newFilters[filters.length - 1].search = e.target.value.toLocaleUpperCase()
    setFilters(newFilters);
  }, [handleChangePage, filters]);

  const handleAddFilter = useCallback(e => {
    //const newFilters = [...filters];
    //newFilters.push({ field: 'sc', search: '' });
    //setFilters(newFilters);
  }, [filters]);

  return (
    <>
      <Header size="small" selected="/" />
      <Filtros>
          <label>Pesquisar</label>
          <select value={ filters[filters.length - 1].field } onChange={handleChangeField}>
            <option value="sc">SC</option>
            <option value="pc">PC</option>
            <option value="status">STATUS</option>
            <option value="emissao">DATA SC</option>
            <option value="produto">PRODUTO</option>
            <option value="descricao">DESCRIÇÃO</option>
            <option value="aplicacao">APLICAÇÃO</option>
            <option value="observacao">OBSERVAÇÃO</option>
          </select>
          <input type="text" value={ filters[filters.length - 1].search } onChange={handleChangeSearch} />
          <button onClick={handleAddFilter}>Aplicar</button>
        </Filtros>
      <Container>
        {compras !== null ? 
          <List compras={compras} /> :
          <ul><li>Carregando</li></ul>
        }
      </Container>
      <Paginacao>
        <label>{`Total: ${totalRegistros}`}</label>
        <label>
          Mostrar:
          <select value={limit} onChange={handleSetLimit}>
            <option value="3">3</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </select>
        </label>
        {/*
          <button onClick={e => handlePreviusPage()}>{'<'}</button>
        */}
        <label>{`Pagina: `}</label>
        <input type="number" value={pagina} onChange={e => handleChangePage(Number(e.target.value))} />
        <label>{` de ${totalPaginas}`}</label>
        {/*
        <button onClick={e => handleNextPage()}>{'>'}</button>
        */}
      </Paginacao>
    </>
  );
};

export default ComprasList;
