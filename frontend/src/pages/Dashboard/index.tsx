import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container } from './styles';

import Table from './Table';

export interface Compra {
  status: string;
  sc: string;
  item: string;
  descricao: string;
  aplicacao: string;
  observacao: string;
  pc: string;
  previsao_entrega: string;
  valor_total: Date;
}

const Dashboard: React.FC = () => {
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
        <Table compras={compras} />
      </Container>
    </>
  );
};

export default Dashboard;
