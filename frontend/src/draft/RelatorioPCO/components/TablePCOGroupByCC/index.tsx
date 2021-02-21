import React from 'react';

import Table, { ITableLines } from '../Table';

import { IDataPCO, IDataPCOGoupByCC, IKeysOfDataPCOGroupByCC } from '../../types';

export interface IProps {
  pcoDataGroupByCC: IDataPCOGoupByCC[];
  handleSetItensCC: (value: IDataPCO[]) => void;
}

const TablePCOGroupByCC: React.FC<IProps> = ({
  pcoDataGroupByCC,
  handleSetItensCC,
}: IProps) => {
  const header = [
    'PCs',
    'Periodo',
    'Conta',
    'C.Custo',
    'PC Bloqueado',
    'Orçado',
    'Empenhado PC',
    'Empenhado NF',
    'Disponivel Sistema',
  ];

  const keys: IKeysOfDataPCOGroupByCC[] = [
    'Periodo',
    'Conta',
    'CCusto',
    'totalPCBloqueado',
    'totalOrcado',
    'totalEmpenhadoPC',
    'totalEmpenhadoNF',
    'disponivelSistema',
  ];

  const lines: ITableLines[] = pcoDataGroupByCC.map(custoPCO => {
    const ret = {
      key: custoPCO.id,
      itens: [
        {
          value: (
            <button
              type="button"
              onClick={() => handleSetItensCC(custoPCO.itens)}
            >
              Detalhe
            </button>
          ),
          key: 'PCs',
          isCurrency: false,
        },
        ...keys.map(key => {
          const value = custoPCO[key];
          const isCurrency = (
            key === 'totalPCBloqueado' ||
            key === 'totalOrcado' ||
            key === 'totalEmpenhadoPC' ||
            key === 'totalEmpenhadoNF' ||
            key === 'disponivelSistema'
          )

          return { value, key, isCurrency };
        })
      ],
    };
    return ret;
  });

  return <Table header={header} lines={lines} />
};

export default TablePCOGroupByCC;
