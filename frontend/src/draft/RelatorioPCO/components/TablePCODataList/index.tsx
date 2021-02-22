import React from 'react';

import Table, { ITableLines } from '../Table';

import { IDataPCO, IKeysOfDataPCO } from '../../types';

export interface IProps {
  pcoDataList: IDataPCO[];
}

const TablePCODataList: React.FC<IProps> = ({ pcoDataList }: IProps) => {
  const header: IKeysOfDataPCO[] = [
    'Periodo',
    'Conta',
    'C.Custo',
    'Documento',
    'Total',
    'Orcado',
    'Pedido',
    'Entr.NF',
  ];

  const lines: ITableLines[] = pcoDataList.map(custoPCO => {
    const ret = {
      key: custoPCO.id,
      itens: header.map(key => {
        const value = custoPCO[key];
        const isCurrency =
          key === 'Total' ||
          key === 'Orcado' ||
          key === 'Pedido' ||
          key === 'Entr.NF';

        return { value, key, isCurrency };
      }),
    } as ITableLines;
    return ret;
  });

  return <Table header={header} lines={lines} />;
};

export default TablePCODataList;
