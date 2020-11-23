/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

import formatValue from '../../../utils/formatValue';

import { TableContainer, List, Item } from './styles';

import { Compra } from '../index';

interface TableProps {
  compras: Compra[];
}

const Table: React.FC<TableProps> = (props: TableProps) => {
  const { compras } = props;

  return (
      <>
    <Item className='cabecalho'>
    <div>
        <h1>SC - Item</h1>
        <strong>Status</strong>
        <h2>Emissão SC</h2>
        <span>Quantidade</span>
    </div>
    <div>
        <h1>PC</h1>
        <strong>Valor Total</strong>
        <h2>Emissão PC</h2>
        <span>Previsão Entrega</span>
    </div>
    <div>
        <h1>Produto</h1>
        <strong>Aplicação</strong>
        <p>Observação</p>
    </div>
    </Item>
    <List>
        {compras.map(compra => {
            const {
                status,
                sc,
                item,
                produto,
                emissao,
                quantidade,
                descricao,
                pc,
                aplicacao,
                observacao,
                previsao_entrega,
                valor_total,
                data_pc
              } = compra;
              return (
                <Item>
                    <div>
                        <h1>{`${sc} - ${item}`}</h1>
                        <strong>{status}</strong>
                        <h2>{emissao}</h2>
                        <span>{quantidade}</span>
                    </div>
                    <div>
                        <h1>{pc}</h1>
                        <strong>{valor_total}</strong>
                        <h2>{data_pc}</h2>
                        <span>{previsao_entrega}</span>
                    </div>
                    <div>
                        <h1>{`${produto} - ${descricao}`}</h1>
                        <strong>{aplicacao}</strong>
                        <p>{observacao}</p>
                    </div>
                </Item>
              )
        })}
    </List>
    </>
  )
    /*<TableContainer>
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
        </TableContainer>*/
};

export default Table;
