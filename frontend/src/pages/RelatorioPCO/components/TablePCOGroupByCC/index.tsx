import React, { useCallback, useMemo } from 'react';

import Table from '../Table';

import { IDataPCO, IDataPCOGoupByCC } from '../../types';
import makeObjectLinesOfTable from '../utils/makeObjectLinesOfTable';

export interface IProps {
  pcoDataGroupByCC: IDataPCOGoupByCC[];
  handleSetItensCC: (value: IDataPCO[]) => void;
}

const TablePCOGroupByCC: React.FC<IProps> = ({
  pcoDataGroupByCC,
  handleSetItensCC,
}: IProps) => {
  const makeButtonDetalhePC = useCallback(
    (itens: IDataPCO[]) => (
      <button type="button" onClick={() => handleSetItensCC(itens)}>
        Detalhe
      </button>
    ),
    [handleSetItensCC],
  );

  const header = useMemo(
    () => [
      'PCs',
      'Periodo',
      'Conta',
      'C.Custo',
      'PC Bloqueado',
      'Orçado',
      'Empenhado PC',
      'Empenhado NF',
      'Disponivel Sistema',
    ],
    [],
  );

  const keys = useMemo(
    () => [
      'PCs',
      'Periodo',
      'Conta',
      'CCusto',
      'totalPCBloqueado',
      'totalOrcado',
      'totalEmpenhadoPC',
      'totalEmpenhadoNF',
      'disponivelSistema',
    ],
    [],
  );

  const keysCurrency = useMemo(
    () => [
      'totalPCBloqueado',
      'totalOrcado',
      'totalEmpenhadoPC',
      'totalEmpenhadoNF',
      'disponivelSistema',
    ],
    [],
  );

  const list = useMemo(
    () => [
      ...pcoDataGroupByCC.map(custoPCO => ({
        ...custoPCO,
        PCs: makeButtonDetalhePC(custoPCO.itens),
      })),
    ],
    [pcoDataGroupByCC, makeButtonDetalhePC],
  );

  const lines = useMemo(
    () => makeObjectLinesOfTable({ keys, keysCurrency, list }),
    [keys, keysCurrency, list],
  );

  return <Table header={header} lines={lines} />;
};

export default TablePCOGroupByCC;
