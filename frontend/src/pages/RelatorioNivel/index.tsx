/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import { Container, ContainerTable } from './styles';

import api from '../../services/api';
import { Compra } from '../ComprasList/index';
import formatValue from '../../utils/formatValue';

interface HeaderProps {
  Nivel: string;
}

const RelatorioNivel: React.FC<HeaderProps> = ({ Nivel }: HeaderProps) => {
  const [comprasNivel2, setComprasNivel2] = useState<Compra[]>([]);
  useEffect(() => {
    async function loadCompras(): Promise<void> {
      const filters = [{ field: 'status', search: '05-PC-BLOQUEADO NVL2' }];
      const limit = 999999;
      const { data } = await api.get<{
        comprasManutencao: Compra[];
        total: number;
      }>(`/compras-manutencao/${Nivel}`, {
        params: { limit, filters },
      });
      const { comprasManutencao } = data;
      setComprasNivel2(comprasManutencao);
    }

    loadCompras();
  }, []);
  return (
    <Container>
      <Header size="small" selected={`/${Nivel}`} />
      {comprasNivel2.length > 0 ? (
        <ContainerTable>
          <table>
            <thead>
              <tr>
                <th>
                  <span>PC</span>
                  <div>Total</div>
                </th>
                <th>Aplicação</th>
                <th>Observação</th>
                <th>Descrição</th>
                <th>Qtd.</th>
                <th>Valor Item</th>
              </tr>
            </thead>
            <tbody>
              {comprasNivel2.map((compra, index) => {
                const { pc } = compra;
                const comprasPCAtual = comprasNivel2.filter(
                  compraFilter => compraFilter.pc === pc,
                );
                const { valor_total } = comprasPCAtual.reduce(
                  (total, compraReduce) => {
                    const atual = Number(compraReduce.valor_total);
                    const acumulado = Number(total.valor_total);
                    return { ...total, valor_total: acumulado + atual };
                  },
                );
                return (
                  <tr key={`${compra.sc}-${compra.item}`}>
                    {index === 0 || comprasNivel2[index - 1].pc !== pc ? (
                      <td rowSpan={comprasPCAtual.length}>
                        <span>{pc}</span>
                        <div>{formatValue(valor_total)}</div>
                      </td>
                    ) : (
                      <></>
                    )}
                    <td>{compra.aplicacao}</td>
                    <td>{compra.observacao}</td>
                    <td>{compra.descricao}</td>
                    <td>{compra.quantidade}</td>
                    <td>{formatValue(compra.valor_total)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ContainerTable>
      ) : (
        <div>Sem PC</div>
      )}
    </Container>
  );
};

export default RelatorioNivel;
