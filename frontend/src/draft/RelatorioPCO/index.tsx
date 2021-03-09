/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useCallback } from 'react';

import { Container, Content } from './styles';

import { IDataPCO, IDataPCOGoupByCC } from './types';

import { usePco } from './hooks/pco';
import TablePCODataList from './components/TablePCODataList';
import TablePCOGroupByCC from './components/TablePCOGroupByCC';
import TableListPCsForTransfer from './components/TableListPCsForTransfer';

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
      <Content>
        <div>
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
        </div>

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
      </Content>
    </Container>
  );
};

export default RelatorioPCO;
