/* eslint-disable no-alert */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePageBase } from '../../../hooks/pageBase';
import { RelatorioPC } from '../../PcsBloqueados';
import { getRelatorioPCsBloqueados } from '../../PcsBloqueados/util/getRelatorioPCsBloqueados';

import { IDataPCO, IDataPCOGoupByCC } from '../types';
import { convertTextToPCO, groupDataByCC } from './utils';

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
          itenGroupByCCForTransfer.c_custo === itenGroupByCC.c_custo &&
          itenGroupByCCForTransfer.periodo === itenGroupByCC.periodo &&
          itenGroupByCCForTransfer.conta === itenGroupByCC.conta,
      );
      const disponivelPeriodoContaCC = arrayItensCC[0]
        ? arrayItensCC[0].disponivel_sistema
        : 0;
      const valorATransferir =
        disponivelPeriodoContaCC - itenGroupByCCForTransfer.falta_empenhar;
      return {
        ...itenGroupByCCForTransfer,
        disponivelPeriodoContaCC,
        valorATransferir: valorATransferir > 0 ? 0 : -1 * valorATransferir,
        DisponivelReal: arrayItensCC[0].disponivel_real,
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
    pco.list.findIndex(item => item.documento === pcForAddTransfer) >= 0;

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
    item => newPcsForTransfer.findIndex(pc => pc === item.documento) >= 0,
  );

  const newPcsForTransferGroupByCC = getPcsForTransferGroupByCC(
    listDataPCO,
    pco.groupByCC,
  );
  return {
    ...current,
    pcsForTransfer: newPcsForTransfer,
    pcsForTransferGroupByCC: newPcsForTransferGroupByCC,
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
    item => newPcsForTransfer.findIndex(pc => pc === item.documento) >= 0,
  );

  const newPcsForTransferGroupByCC = getPcsForTransferGroupByCC(
    listDataPCO,
    pco.groupByCC,
  );

  return {
    ...current,
    pcsForTransfer: newPcsForTransfer,
    pcsForTransferGroupByCC: newPcsForTransferGroupByCC,
  };
};

const initialPCO = convertTextToPCO('');

type PcoProvideProps = { children: React.ReactNode };

export const PcoProvider: React.FC<PcoProvideProps> = ({
  children,
}: PcoProvideProps) => {
  const [state, setState] = useState<IPcoContextData>({
    textInput: '',
    selectedTable: '',
    pco: initialPCO,
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

  const { api } = usePageBase();

  useEffect(() => {
    getRelatorioPCsBloqueados('bloqueados', api).then(pcsBloqueados => {
      setState(current => ({ ...current, pcsBloqueados }));
    });
  }, [api]);

  return <PcoContext.Provider value={state}>{children}</PcoContext.Provider>;
};

export const usePco = (): IPcoContextData => {
  const context = useContext(PcoContext);

  if (!context) {
    throw new Error('usePco must be used withn a PcoProvider');
  }

  return context;
};
