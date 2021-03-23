/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

import { Container, Content } from './styles';

import { IDataPCO, IDataPCOGoupByCC } from './types';

import { usePco } from './hooks/pco';
import TablePCODataList from './components/TablePCODataList';
import TablePCOGroupByCC from './components/TablePCOGroupByCC';
import TableListPCsForTransfer from './components/TableListPCsForTransfer';
import TableListPCsBlock from './components/TableListPCsBlock/';
import { Menu } from './styles';
import Header from '../../components/Header';

export interface ITableGroupByCC {
  dataGoupByCC: IDataPCOGoupByCC[];
  setListItensCC: (value: IDataPCO[]) => void;
}

const RelatorioPCO: React.FC = () => {
  const {
    pco,
    handleSetDataPCO,
    selectedTable,
    handleSetSelectedTable,
    handleSetItensCC,
    itensCCSelected,
    textInput,
  } = usePco();

  return (
    <Container>
      <Header size="small" selected={`/relatorio-pco`} />
      <Content>
        <Menu>
          <button type="button" onClick={() => handleSetSelectedTable('')}>
            Entrada de Dados
          </button>

          <button
            type="button"
            onClick={() => handleSetSelectedTable('dataList')}
          >
            Lista Completa
          </button>

          <button
            type="button"
            onClick={() => handleSetSelectedTable('dataGroupByCC')}
          >
            Lista Agrupada Por CC
          </button>

          <button
            type="button"
            onClick={() => handleSetSelectedTable('listPCsForCheck')}
          >
            Lista PCs Para Aprovar
          </button>

          <button
            type="button"
            onClick={() => handleSetSelectedTable('listPCsblocked')}
          >
            Lista PCs Bloqueados
          </button>
        </Menu>

        {!selectedTable && (
          <textarea
            value={textInput}
            onChange={({ target: { value } }) => {
              handleSetDataPCO(value);
            }}
          />
        )}

        {selectedTable === 'dataList' && (
          <TablePCODataList pcoDataList={pco.list} />
        )}

        {selectedTable === 'dataGroupByCC' && (
          <TablePCOGroupByCC
            pcoDataGroupByCC={pco.groupByCC}
            handleSetItensCC={handleSetItensCC}
          />
        )}

        {selectedTable === 'dataItensCC' && (
          <TablePCODataList pcoDataList={itensCCSelected} />
        )}

        {selectedTable === 'listPCsForCheck' && <TableListPCsForTransfer />}

        {selectedTable === 'listPCsblocked' && <TableListPCsBlock />}
      </Content>
    </Container>
  );
};

export default RelatorioPCO;
