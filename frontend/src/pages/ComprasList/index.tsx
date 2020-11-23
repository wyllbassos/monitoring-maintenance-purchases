import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container } from './styles';

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
  valor_total: Date;
}

const ComprasList: React.FC = () => {
  const [compras, setCompras] = useState<Compra[]>([]);

  useEffect(() => {
    async function loadCompras(): Promise<void> {
      const response = await api.get<Compra[]>('/compras-manutencao');
      console.log(response.data.slice(0, 10))
      setCompras(response.data.slice(0, 10));
    }

    loadCompras();
  }, []);

  return (
    <>
      <Header size="small" selected="/" />
      <Container>
        <List compras={compras} />
      </Container>
    </>
  );
};

export default ComprasList;
