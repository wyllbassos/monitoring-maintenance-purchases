import React, { useState, useEffect } from 'react';

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
  const [exibir, setExibir] = useState(10);

  useEffect(() => {
    async function loadCompras(): Promise<void> {
      const response = await api.get<Compra[]>('/compras-manutencao');
      //setCompras(response.data.slice(0, 10));
      setCompras(response.data.slice(0, exibir));
    }

    loadCompras();
  }, [exibir]);

  return (
    <>
      <Header size="small" selected="/" />
      <ContainerFiltros>
        <select value={exibir} onChange={e => setExibir(Number(e.target.value)) }>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="200">500</option>
          <option value="1000">1000</option>
        </select>
        
      </ContainerFiltros>
      <Container>
        {compras !== null ? 
          <List compras={compras} /> :
          <ul><li>Carregando</li></ul>
        }
      </Container>
    </>
  );
};

export default ComprasList;
