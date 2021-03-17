import React, { useState, useCallback, useMemo } from 'react';
import formatValue from '../../../../utils/formatValue';
import { usePco } from '../../hooks/pco';
import { groupDataByCC } from '../../hooks/utils';
import { IDataPCO, IDataPCOGoupByCC } from '../../types';
import Table from '../Table';
import makeObjectLinesOfTable from '../utils/makeObjectLinesOfTable';

interface ListPcsBlock {
  key: string;
  periodo: string;
  conta_pc: string;
  pc: string;
  valor_total: number;
}

const TableListPCsForTransfer: React.FC = () => {
  const { pcsBloqueados } = usePco();

  console.log(pcsBloqueados);

  /*
   *---- L I S T   P C s
   */
  const headerPCsBlock = useMemo(() => ['Periodo', 'PC', 'Conta', 'Valor'], []);

  const keysPCsBlock = useMemo(
    () => ['periodo', 'pc', 'conta_pc', 'valor_total'],
    [],
  );

  const linesPCsBlock = useMemo(() => {
    const list: ListPcsBlock[] = [];
    pcsBloqueados.forEach(pcBloqueado => {
      pcBloqueado.itens.forEach(itemPC => {
        const { data_pc, conta_pc, pc, valor_total } = itemPC;
        const [ano, mes] = data_pc.split('-');
        const periodo = `${mes}/${ano}`;
        const key = periodo + conta_pc + pc;

        const index = list.findIndex(item => item.key === key);

        if (index < 0) {
          list.push({
            key,
            periodo,
            conta_pc,
            pc,
            valor_total,
          });
        } else {
          list[index].valor_total += valor_total;
        }
      });
    });

    return makeObjectLinesOfTable({
      keys: keysPCsBlock,
      keysCurrency: [],
      list,
    });
  }, [pcsBloqueados]);

  return (
    <>
      {!!pcsBloqueados.length && (
        <Table header={headerPCsBlock} lines={linesPCsBlock} />
      )}
    </>
  );
};

export default TableListPCsForTransfer;
