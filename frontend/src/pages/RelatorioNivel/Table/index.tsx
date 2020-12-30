/* eslint-disable @typescript-eslint/camelcase */
import React, { useCallback } from 'react';

import { Container } from './styles';

import api from '../../../services/api';
import { Compra } from '../../ComprasList/index';
import formatValue from '../../../utils/formatValue';
import Thead from './Thead';

interface Props {
  compras: Compra[];
  setCompras: React.Dispatch<React.SetStateAction<Compra[]>>;
}

interface UpdateStatusAaprovacao {
  pc: string;
  status_aprovacao: string;
}

const Table: React.FC<Props> = ({ compras, setCompras }: Props) => {
  const handleChangeDataEnvioPC = useCallback(
    async ({ pc, status_aprovacao }: UpdateStatusAaprovacao) => {
      const affected = await api.patch<number>(
        `/compras-manutencao/update-status-aprovacao/${pc}`,
        { status_aprovacao },
      );
      if (affected) {
        const newcompras = compras.map(compra => {
          if (compra.pc === pc) {
            return {
              ...compra,
              status_aprovacao,
            };
          }
          return compra;
        });
        setCompras(newcompras);
      }
      // console.log(newcompras);
    },
    [compras, setCompras],
  );

  return (
    <Container>
      <Thead
        header={[
          'Data Envio / PCO',
          'PC / Total',
          'Aplicação',
          'Observação',
          'Descrição',
          'Qtd.',
          'Valor Item',
        ]}
      />
      <tbody>
        {compras.map((compra, index) => {
          // console.log(compra);
          const {
            pc,
            status_aprovacao,
            aplicacao,
            observacao,
            descricao,
            quantidade,
          } = compra;
          const comprasPCAtual = compras.filter(
            compraFilter => compraFilter.pc === pc,
          );
          const { valor_total } = comprasPCAtual.reduce(
            (total, compraReduce) => {
              const atual = Number(compraReduce.valor_total);
              const acumulado = Number(total.valor_total);
              return { ...total, valor_total: acumulado + atual };
            },
          );
          // if (compra.pc === '793372') console.log(compra);
          const imprimiPC = index === 0 || compras[index - 1].pc !== pc;

          return (
            <tr key={`${compra.sc}-${compra.item}`}>
              {imprimiPC ? (
                <>
                  <td rowSpan={comprasPCAtual.length}>
                    {status_aprovacao ? (
                      <div>
                        <span>PCO: </span>
                        <select>
                          <option value="N">Não</option>
                          <option value="S">Sim</option>
                        </select>
                      </div>
                    ) : (
                      <></>
                    )}
                    <input
                      id={`input_pc_${pc}`}
                      type="date"
                      value={status_aprovacao || ''}
                      onChange={e => {
                        handleChangeDataEnvioPC({
                          pc,
                          status_aprovacao: e.target.value,
                        });
                      }}
                    />
                  </td>
                  <td rowSpan={comprasPCAtual.length}>
                    <span>{pc}</span>
                    <div>{formatValue(valor_total)}</div>
                  </td>
                </>
              ) : (
                <></>
              )}
              <td>{aplicacao}</td>
              <td>{observacao}</td>
              <td>{descricao}</td>
              <td>{quantidade}</td>
              <td>{formatValue(valor_total)}</td>
            </tr>
          );
        })}
      </tbody>
    </Container>
  );
};

export default Table;
