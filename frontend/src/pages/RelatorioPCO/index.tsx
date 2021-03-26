/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

import { Container, Content, Body, Menu, MenuButton } from './styles';

import { IDataPCO, IDataPCOGoupByCC } from './types';

import { usePco } from './hooks/pco';
import TablePCODataList from './components/TablePCODataList';
import TablePCOGroupByCC from './components/TablePCOGroupByCC';
import TableListPCsForTransfer from './components/TableListPCsForTransfer';
import TableListPCsBlock from './components/TableListPCsBlock/';
import Header from '../../components/Header';
import { useState } from 'react';
import PageBase from './../../components/PageBase/index';
import { useMemo } from 'react';

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

  const [selectedButtonMenu, setSelectedButtonMenu] = useState(0);

  const sidebarButtons = useMemo(() => {
    return [
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
    ];
  }, []);

  return (
    <PageBase route="/relatorio-pco" sidebarButtons={sidebarButtons}>
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
    </PageBase>
    // <Container>
    //   <Header size="small" selected={`/relatorio-pco`} />
    //   <Body>
    //     <Menu>
    //       <MenuButton
    //         selected={selectedButtonMenu === 0}
    //         type="button"
    //         onClick={() => {
    //           handleSetSelectedTable('');
    //           setSelectedButtonMenu(0);
    //         }}
    //       >
    //         Entrada de Dados
    //       </MenuButton>

    //       <MenuButton
    //         selected={selectedButtonMenu === 1}
    //         type="button"
    //         onClick={() => {
    //           handleSetSelectedTable('dataList');
    //           setSelectedButtonMenu(1);
    //         }}
    //       >
    //         Lista Completa
    //       </MenuButton>

    //       <MenuButton
    //         selected={selectedButtonMenu === 2}
    //         type="button"
    //         onClick={() => {
    //           handleSetSelectedTable('dataGroupByCC');
    //           setSelectedButtonMenu(2);
    //         }}
    //       >
    //         Lista Agrupada Por CC
    //       </MenuButton>

    //       <MenuButton
    //         selected={selectedButtonMenu === 3}
    //         type="button"
    //         onClick={() => {
    //           handleSetSelectedTable('listPCsForCheck');
    //           setSelectedButtonMenu(3);
    //         }}
    //       >
    //         Lista PCs Para Aprovar
    //       </MenuButton>

    //       <MenuButton
    //         selected={selectedButtonMenu === 4}
    //         type="button"
    //         onClick={() => {
    //           handleSetSelectedTable('listPCsblocked');
    //           setSelectedButtonMenu(4);
    //         }}
    //       >
    //         Lista PCs Bloqueados
    //       </MenuButton>
    //     </Menu>
    //     <Content>

    //     </Content>
    //   </Body>
    // </Container>
  );
};

export default RelatorioPCO;
