import React, { useMemo } from 'react';

import Table from '../Table';

import { IDataPCO } from '../../types';
import makeObjectLinesOfTable from '../utils/makeObjectLinesOfTable';

export interface IProps {
  pcoDataList: IDataPCO[];
}

const header = [
  'Periodo',
  'Conta',
  'C.Custo',
  'Documento',
  'Total',
  'Orcado',
  'Pedido',
  'Falta Empenhar',
  'Entr Nf',
];

const keys = [
  'periodo',
  'conta',
  'c_custo',
  'documento',
  'total',
  'orcado',
  'pedido',
  'entr_nf',
];

const keysCurrency = ['total', 'orcado', 'pedido', 'entr_nf'];

const fieldsFilter = ['periodo', 'conta', 'c_custo', 'documento'];

const TablePCODataList: React.FC<IProps> = ({ pcoDataList }: IProps) => {
  const list = useMemo(() => pcoDataList, [pcoDataList]);

  const lines = useMemo(
    () => makeObjectLinesOfTable({ keys, keysCurrency, list }),
    [keys, keysCurrency, list],
  );

  return <Table header={header} lines={lines} fieldsFilter={fieldsFilter} />;
};

export default TablePCODataList;
