/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect, useCallback } from 'react';

import Header from '../../components/Header';

import { Container, ContainerTable } from './styles';

import api from '../../services/api';
import Table from './Table';
import { Compra } from '../../pages/Prioridades/index';

interface Props {
  Nivel: string;
}

interface UpdateStatusAaprovacao {
  pc: string;
  status_aprovacao: string;
}

export interface RelatorioPC {
  pc: string;
  valor_total: number;
  status_aprovacao: string | null;
  itens: Compra[];
}

const RelatorioNivelV2: React.FC<Props> = ({ Nivel }: Props) => {
  const [relatorioPC, setRelatorioPC] = useState<RelatorioPC[]>([]);

  useEffect(() => {
    async function loadCompras(): Promise<void> {
      const { data } = await api.get<Compra[]>(`/compras-manutencao/${Nivel}`);

      const newComprasRelatorioV2: RelatorioPC[] = [];

      data.forEach(compra => {
        const indexNewCompra = newComprasRelatorioV2.findIndex(
          newCompra => newCompra.pc === compra.pc,
        );

        if (indexNewCompra === -1) {
          newComprasRelatorioV2.push({
            pc: compra.pc,
            valor_total: compra.valor_total,
            status_aprovacao: compra.status_aprovacao,
            itens: [compra],
          });
        } else {
          newComprasRelatorioV2[indexNewCompra].valor_total +=
            compra.valor_total;
          newComprasRelatorioV2[indexNewCompra].itens.push(compra);
        }
      });
      setRelatorioPC(newComprasRelatorioV2);
    }
    loadCompras();
  }, [Nivel]);

  return (
    <Container>
      <Header size="small" selected={`/${Nivel}`} />
      {relatorioPC.length > 0 ? (
        <ContainerTable>
          <div></div>
          <Table relatorioPC={relatorioPC} setRelatorioPC={setRelatorioPC} />
          <div></div>
        </ContainerTable>
      ) : (
        <div>Sem PC</div>
      )}
    </Container>
  );
};

export default RelatorioNivelV2;
