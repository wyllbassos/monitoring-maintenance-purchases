import React, { createContext, useContext, useState, useEffect } from 'react';

import { IDataPCO, IDataPCOGoupByCC } from '../types';
import { convertTextToPCO } from './utils';

import initialInput from './utils/initialInput';
import { groupDataByCC } from './utils/index';
import { RelatorioPC } from '../../../pages/PcsBloqueados';
import { getRelatorioPCsBloqueados } from './../../../pages/PcsBloqueados/util/getRelatorioPCsBloqueados';

export type TSelectedTable =
  | ''
  | 'dataList'
  | 'dataGroupByCC'
  | 'dataItensCC'
  | 'listPCsForCheck'
  | 'listPCsblocked';

export interface IPCO {
  list: IDataPCO[];
  groupByCC: IDataPCOGoupByCC[];
}

interface IDataGroupPCByCC extends IDataPCOGoupByCC {
  disponivelPeriodoContaCC?: number;
  valorATransferir: number;
}

interface IPcoContextData {
  selectedTable: TSelectedTable;
  pco: IPCO;
  itensCCSelected: IDataPCO[];
  textInput: string;
  pcsForTransfer: string[];
  pcsForTransferGroupByCC: IDataGroupPCByCC[];

  pcsBloqueados: RelatorioPC[];

  handleSetDataPCO: (text: string) => void;
  handleSetSelectedTable: (selectedTable: TSelectedTable) => void;
  handleSetItensCC: (itens: IDataPCO[]) => void;
  handleAddPcForTransfer: (pcForAddTransfer: string) => void;
  handleRemovePcForTransfer: (pcForRemoveTransfer: string) => void;
}

const PcoContext = createContext<IPcoContextData>({} as IPcoContextData);

const getPcsForTransferGroupByCC = (
  listDataPCO: IDataPCO[],
  groupByCC: IDataPCOGoupByCC[],
): IDataGroupPCByCC[] => {
  const groupByCCForTransfer = groupDataByCC(listDataPCO);
  const newPcsForTransferGroupByCC = groupByCCForTransfer.map(
    itenGroupByCCForTransfer => {
      const arrayItensCC = groupByCC.filter(
        itenGroupByCC =>
          itenGroupByCCForTransfer.CCusto === itenGroupByCC.CCusto &&
          itenGroupByCCForTransfer.Periodo === itenGroupByCC.Periodo &&
          itenGroupByCCForTransfer.Conta === itenGroupByCC.Conta,
      );
      if (!arrayItensCC[0]) {
      }
      const disponivelPeriodoContaCC = arrayItensCC[0]
        ? arrayItensCC[0].disponivelSistema
        : 0;
      const valorATransferir =
        disponivelPeriodoContaCC - itenGroupByCCForTransfer.faltaEmpenhar;
      return {
        ...itenGroupByCCForTransfer,
        disponivelPeriodoContaCC,
        valorATransferir: valorATransferir > 0 ? 0 : -1 * valorATransferir,
      };
    },
  );
  return newPcsForTransferGroupByCC;
};

const getStateForAddPcForTransfer = (
  current: IPcoContextData,
  pcForAddTransfer: string,
): IPcoContextData => {
  const { pcsForTransfer, pco } = current;
  const exists =
    pcsForTransfer.findIndex(pcList => pcList === pcForAddTransfer) >= 0;
  const isPCValid =
    pco.list.findIndex(item => item.Documento === pcForAddTransfer) >= 0;

  if (exists) {
    alert(`PC ${pcForAddTransfer} já listado para Transferência!`);
    return { ...current };
  }
  if (!isPCValid) {
    alert(`PC ${pcForAddTransfer} não localizado no relatório de PCO!`);
    return { ...current };
  }

  const newPcsForTransfer = [...pcsForTransfer, pcForAddTransfer];

  const listDataPCO = pco.list.filter(
    item => newPcsForTransfer.findIndex(pc => pc === item.Documento) >= 0,
  );

  const mewPcsForTransferGroupByCC = getPcsForTransferGroupByCC(
    listDataPCO,
    pco.groupByCC,
  );
  return {
    ...current,
    pcsForTransfer: newPcsForTransfer,
    pcsForTransferGroupByCC: mewPcsForTransferGroupByCC,
  };
};

const getStateForRemovePcForTransfer = (
  current: IPcoContextData,
  pcForRemoveTransfer: string,
): IPcoContextData => {
  const { pcsForTransfer, pco } = current;
  const indexPC = pcsForTransfer.findIndex(
    findePc => findePc === pcForRemoveTransfer,
  );

  if (indexPC === -1) {
    return { ...current };
  }

  const newPcsForTransfer = [...pcsForTransfer];
  newPcsForTransfer.splice(indexPC, 1);
  const listDataPCO = pco.list.filter(
    item => newPcsForTransfer.findIndex(pc => pc === item.Documento) >= 0,
  );

  const mewPcsForTransferGroupByCC = getPcsForTransferGroupByCC(
    listDataPCO,
    pco.groupByCC,
  );

  return {
    ...current,
    pcsForTransfer: newPcsForTransfer,
    pcsForTransferGroupByCC: mewPcsForTransferGroupByCC,
  };
};

export const PcoProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<IPcoContextData>({
    textInput: initialInput.text,
    selectedTable: '',
    pco: convertTextToPCO(initialInput.text),
    itensCCSelected: [],
    pcsForTransfer: [],
    pcsForTransferGroupByCC: [],

    pcsBloqueados: [],

    handleSetDataPCO: (text: string) => {
      const pco = convertTextToPCO(text);
      setState(current => ({
        ...current,
        pco,
        textInput: text,
        pcsForTransfer: [],
        pcsForTransferGroupByCC: [],
      }));
    },

    handleSetSelectedTable: (selectedTable: TSelectedTable) => {
      setState(current => ({ ...current, selectedTable }));
    },

    handleSetItensCC: (itens: IDataPCO[]) => {
      setState(current => ({
        ...current,
        selectedTable: 'dataItensCC',
        itensCCSelected: itens,
      }));
    },

    handleAddPcForTransfer: (pcForAddTransfer: string) => {
      setState(current => {
        return getStateForAddPcForTransfer(current, pcForAddTransfer);
      });
    },

    handleRemovePcForTransfer: (pcForRemoveTransfer: string) => {
      setState(current =>
        getStateForRemovePcForTransfer(current, pcForRemoveTransfer),
      );
    },
  });

  useEffect(() => {
    getRelatorioPCsBloqueados('bloqueados').then(pcsBloqueados => {
      setState(current => ({ ...current, pcsBloqueados }));
    });
  }, []);

  return <PcoContext.Provider value={state}>{children}</PcoContext.Provider>;
};

export const usePco = (): IPcoContextData => {
  const context = useContext(PcoContext);

  if (!context) {
    throw new Error('usePco must be used withn a PcoProvider');
  }

  return context;
};
