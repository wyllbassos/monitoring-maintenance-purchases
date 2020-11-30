import React, { useState, useEffect, useCallback } from 'react';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container, ContainerFiltros } from './styles';

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

const ComprasList: React.FC = () => {
  const [compras, setCompras] = useState<Compra[] | null>(null);
  const [limit, setLimit] = useState(3);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [skip, setSkip] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadCompras(): Promise<void> {
      const { data } = await api.get<{comprasManutencao: Compra[], total: number}>(
        '/compras-manutencao', {params: { limit, skip, search }}
      );
      
      const { comprasManutencao, total } = data;
      setTotalRegistros(total);
      setTotalPaginas(Math.ceil(total / limit));
      setCompras(comprasManutencao);
    }

    loadCompras();
  }, [limit, skip, search]);

  const handleNextPage = useCallback(() => {
    const newPage = pagina + 1;
    if(newPage > totalPaginas) return;
    setSkip( pagina * limit)
    setPagina(newPage);
  }, [pagina, limit, totalPaginas]);

  const handlePreviusPage = useCallback(() => {
    const newPage = pagina - 1;
    if(newPage <= 0) return;
    setSkip((newPage-1) * limit );
    setPagina(newPage);
  }, [pagina, limit]);

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

  return (
    <>
      <Header size="small" selected="/" />
      <Container>
        <div>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
          <button>Pesquisa</button>
        </div>
        {compras !== null ? 
          <List compras={compras} /> :
          <ul><li>Carregando</li></ul>
        }
      </Container>
      <ContainerFiltros>
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
        <button onClick={e => handlePreviusPage()}>{'<'}</button>
        <label>{`Pagina: ${pagina} de ${totalPaginas}`}</label>
        <button onClick={e => handleNextPage()}>{'>'}</button>
      </ContainerFiltros>
    </>
  );
};

export default ComprasList;
