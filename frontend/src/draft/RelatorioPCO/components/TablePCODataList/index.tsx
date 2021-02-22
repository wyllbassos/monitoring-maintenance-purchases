import React, { useMemo } from 'react';

import Table from '../Table';

import { IDataPCO } from '../../types';
import makeObjectLinesOfTable from '../utils/makeObjectLinesOfTable';

export interface IProps {
  pcoDataList: IDataPCO[];
}

const TablePCODataList: React.FC<IProps> = ({ pcoDataList }: IProps) => {
  const keys = useMemo(
    () => [
      'Periodo',
      'Conta',
      'C.Custo',
      'Documento',
      'Total',
      'Orcado',
      'Pedido',
      'Entr.NF',
    ],
    [],
  );

  const keysCurrency = useMemo(
    () => ['Total', 'Orcado', 'Pedido', 'Entr.NF'],
    [],
  );

  const list = useMemo(() => pcoDataList, [pcoDataList]);

  const lines = useMemo(
    () => makeObjectLinesOfTable({ keys, keysCurrency, list }),
    [keys, keysCurrency, list],
  );

  return <Table header={keys} lines={lines} />;
};

export default TablePCODataList;
