import React, { useEffect } from 'react';

import { usePco } from './hooks/pco';
import TablePCODataList from './components/TablePCODataList';
import TablePCOGroupByCC from './components/TablePCOGroupByCC';
import TableListPCsForTransfer from './components/TableListPCsForTransfer';
import TableListPCsBlock from './components/TableListPCsBlock';
import { usePageBase } from '../../hooks/pageBase';

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

  const { setSidebarButtons } = usePageBase();

  useEffect(() => {
    setSidebarButtons([
      {
        text: 'Entrada de Dados',
        onClick: () => handleSetSelectedTable(''),
      },
      {
        text: 'Lista Completa',
        onClick: () => handleSetSelectedTable('dataList'),
      },
      {
        text: 'Agrupadmento Periodo + CO + CC',
        onClick: () => handleSetSelectedTable('dataGroupByCC'),
      },
      {
        text: "Verificar PCO de PC's",
        onClick: () => handleSetSelectedTable('listPCsForCheck'),
      },
      {
        text: "PC's Bloqueados",
        onClick: () => handleSetSelectedTable('listPCsblocked'),
      },
    ]);
  }, []);

  return (
    <>
      {!selectedTable && (
        <textarea
          style={{ marginTop: '32px', marginBottom: '32px' }}
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
    </>
  );
};

export default RelatorioPCO;
