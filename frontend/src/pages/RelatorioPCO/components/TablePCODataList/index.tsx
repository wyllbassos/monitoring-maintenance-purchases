import React, { useMemo } from 'react';

import Table from '../Table';

import { IDataPCO } from '../../types';
import makeObjectLinesOfTable from '../utils/makeObjectLinesOfTable';

export interface IProps {
  pcoDataList: IDataPCO[];
}

const keys = [
  'Periodo',
  'Conta',
  'C.Custo',
  'Documento',
  'Total',
  'Orcado',
  'Pedido',
  'Entr.NF',
];

const keysCurrency = ['Total', 'Orcado', 'Pedido', 'Entr.NF'];

const fieldsFilter = ['Periodo', 'Conta', 'CCusto', 'Documento'];

const TablePCODataList: React.FC<IProps> = ({ pcoDataList }: IProps) => {
  const list = useMemo(() => pcoDataList, [pcoDataList]);

  const lines = useMemo(
    () => makeObjectLinesOfTable({ keys, keysCurrency, list }),
    [keys, keysCurrency, list],
  );

  return <Table header={keys} lines={lines} fieldsFilter={fieldsFilter} />;
};

export default TablePCODataList;
