/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect, useCallback } from 'react';

import Header from '../../components/Header';

import { Container, ContainerTable } from './styles';

import api from '../../services/api';
import { Compra } from '../ComprasList/index';
import Table from './Table';

interface Props {
  Nivel: string;
}

interface UpdateStatusAaprovacao {
  pc: string;
  status_aprovacao: string;
}

const RelatorioNivel: React.FC<Props> = ({ Nivel }: Props) => {
  const [comprasRelatorio, setComprasRelatorio] = useState<Compra[]>([]);

  useEffect(() => {
    async function loadCompras(): Promise<void> {
      const { data } = await api.get<Compra[]>(`/compras-manutencao/${Nivel}`);
      setComprasRelatorio(data);
    }
    loadCompras();
  }, [Nivel]);

  return (
    <Container>
      <Header size="small" selected={`/${Nivel}`} />
      {comprasRelatorio.length > 0 ? (
        <ContainerTable>
          <Table compras={comprasRelatorio} setCompras={setComprasRelatorio} />
        </ContainerTable>
      ) : (
        <div>Sem PC</div>
      )}
    </Container>
  );
};

export default RelatorioNivel;
