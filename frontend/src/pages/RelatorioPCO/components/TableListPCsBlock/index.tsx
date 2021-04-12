import React, { useState, useCallback, useMemo } from 'react';
import { usePco } from '../../hooks/pco';
import Table from '../Table';
import makeObjectLinesOfTable from '../utils/makeObjectLinesOfTable';

interface ListPcsBlock {
  edit: any;
  key: string;
  periodo: string;
  conta_pc: string;
  pc: string;
  valor_total: number;
}

const header = ['PCO', 'Periodo', 'Conta', 'PC', 'Valor'];

const keys = ['edit', 'periodo', 'conta_pc', 'pc', 'valor_total'];

const fieldsFilter = ['periodo', 'conta_pc', 'pc'];

const keysCurrency = ['valor_total'];

const TableListPCsBlock: React.FC = () => {
  const { pcsBloqueados, handleAddPcForTransfer } = usePco();

  console.log(pcsBloqueados);

  const linesPCsBlock = useMemo(() => {
    const list: ListPcsBlock[] = [];
    pcsBloqueados.forEach(pcBloqueado => {
      pcBloqueado.itens.forEach(itemPC => {
        const { data_pc, conta_pc, pc, valor_total } = itemPC;
        const [ano, mes] = data_pc.split('-');
        const periodo = `${ano}/${mes}`;
        const key = periodo + conta_pc + pc;

        const index = list.findIndex(item => item.key === key);

        if (index < 0) {
          list.push({
            edit: <button onClick={() => handleAddPcForTransfer(pc)}>+</button>,
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

    list.sort((a, b) => (a.key > b.key ? 1 : a.key < b.key ? -1 : 0));

    return makeObjectLinesOfTable({
      keys,
      keysCurrency,
      list,
    });
  }, [pcsBloqueados]);

  return (
    <>
      {!!pcsBloqueados.length && (
        <Table
          header={header}
          lines={linesPCsBlock}
          fieldsFilter={fieldsFilter}
        />
      )}
    </>
  );
};

export default TableListPCsBlock;
