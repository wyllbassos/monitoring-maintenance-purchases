/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

import formatValue from '../../utils/formatValue';

import { TableContainer } from './styles';

import { Compra } from '.';

interface TableProps {
  compras: Compra[];
}

const Table: React.FC<TableProps> = (props: TableProps) => {
  const { compras } = props;

  return (
    <TableContainer>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>SC</th>
            <th>Item</th>
            <th>Descrição</th>
            <th>Aplicação</th>
            <th>Observação</th>
            <th>PC</th>
            <th>Total</th>
            <th>Previsao de Entrega</th>
          </tr>
        </thead>

        <tbody>
          {compras.map(compra => {
            const {
              status,
              sc,
              item,
              descricao,
              pc,
              aplicacao,
              observacao,
              previsao_entrega,
              valor_total
            } = compra;
            const formatedPrevisaoEntrega = new Date(previsao_entrega).toLocaleDateString();
            return (
              <tr key={sc+item}>
                <td className="title">{status}</td>
                <td>{sc}</td>
                <td>{item}</td>
                <td>{descricao}</td>
                <td>{aplicacao}</td>
                <td>{observacao}</td>
                <td>{pc}</td>
                <td>{valor_total}</td>
                <td>{formatedPrevisaoEntrega}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableContainer>
  );
};

export default Table;
