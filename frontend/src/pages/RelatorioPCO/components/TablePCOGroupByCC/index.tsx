import React, { useCallback, useMemo } from 'react';

import Table from '../Table';

import { IDataPCO, IDataPCOGoupByCC } from '../../types';
import makeObjectLinesOfTable from '../utils/makeObjectLinesOfTable';

export interface IProps {
  pcoDataGroupByCC: IDataPCOGoupByCC[];
  handleSetItensCC: (value: IDataPCO[]) => void;
}

const header = [
  'PCs',
  'Periodo',
  'Conta',
  'C.Custo',
  'Gasto Previsto',
  'Orçado',
  'Empenhado',
  'Disponivel Sistema',
  'Falta Empenhar',
  'Disponivel Real',
];

const keys = [
  'pcs',
  'periodo',
  'conta',
  'c_custo',
  'gasto_previsto',
  'orcado',
  'empenhado',
  'disponivel_sistema',
  'falta_empenhar',
  'disponivel_real',
];

const keysCurrency = [
  'gasto_previsto',
  'orcado',
  'empenhado',
  'disponivel_sistema',
  'falta_empenhar',
  'disponivel_real',
];

const fieldsFilter = ['periodo', 'conta', 'c_custo'];

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

  return <Table header={header} lines={lines} fieldsFilter={fieldsFilter} />;
};

export default TablePCOGroupByCC;
