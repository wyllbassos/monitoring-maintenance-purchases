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

  const handleBack = useCallback(() => {
    if (selectedTable === 'dataList') {
      handleSetSelectedTable('');
      return;
    }

    if (selectedTable === 'dataGroupByCC') {
      handleSetSelectedTable('dataList');
      return;
    }

    if (selectedTable === 'dataItensCC') {
      handleSetSelectedTable('dataGroupByCC');
      return;
    }
  }, [selectedTable]);

  const handleNext = useCallback(() => {
    if (selectedTable === '') {
      handleSetSelectedTable('dataList');
      return;
    }

    if (selectedTable === 'dataList') {
      handleSetSelectedTable('dataGroupByCC');
      return;
    }
  }, [selectedTable]);

  return (
    <Container>
      <Content>
        <TableListPCsForTransfer />
        <div>
          {selectedTable !== '' && (
            <button type="button" onClick={handleBack}>
              Voltar
            </button>
          )}

          {(selectedTable === '' || selectedTable === 'dataList') && (
            <button type="button" onClick={handleNext}>
              Avançar
            </button>
          )}
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
      </Content>
    </Container>
  );
};

export default RelatorioPCO;
