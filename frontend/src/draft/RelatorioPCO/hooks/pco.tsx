import React, { createContext, useContext, useState, useCallback } from 'react';

import { IDataPCO, IDataPCOGoupByCC } from '../types';
import { convertTextToPCO } from './utils';

import initialInput from './utils/initialInput';
import { groupDataByCC } from './utils/index';

export type TSelectedTable =
  | ''
  | 'dataList'
  | 'dataGroupByCC'
  | 'dataItensCC'
  | 'listPCsForCheck';

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

  handleSetDataPCO: (text: string) => void;
  handleSetSelectedTable: (selectedTable: TSelectedTable) => void;
  handleSetItensCC: (itens: IDataPCO[]) => void;
  handleAddPcForTransfer: (pcForAddTransfer: string) => void;
  handleRemovePcForTransfer: (pcForRemoveTransfer: string) => void;
}

const PcoContext = createContext<IPcoContextData>({} as IPcoContextData);

export const PcoProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<IPcoContextData>({
    textInput: initialInput.text,
    selectedTable: '',
    pco: convertTextToPCO(initialInput.text),
    itensCCSelected: [],
    pcsForTransfer: [],
    pcsForTransferGroupByCC: [],

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
        const { pcsForTransfer, pco } = current;
        const exists =
          pcsForTransfer.findIndex(pcList => pcList === pcForAddTransfer) >= 0;
        const isPCValid =
          pco.list.findIndex(item => item.Documento === pcForAddTransfer) >= 0;

        if (exists) {
          return { ...current };
        }

        const newPcsForTransfer = [...pcsForTransfer, pcForAddTransfer];

        if (isPCValid) {
          const listDataPCO = pco.list.filter(
            item =>
              newPcsForTransfer.findIndex(pc => pc === item.Documento) >= 0,
          );

          const mewPcsForTransferGroupByCC = handleSetPcsForTransferGroupByCC(
            listDataPCO,
          );
          return {
            ...current,
            pcsForTransfer: newPcsForTransfer,
            pcsForTransferGroupByCC: mewPcsForTransferGroupByCC,
          };
        }

        return {
          ...current,
          pcsForTransfer: newPcsForTransfer,
        };
      });
    },

    handleRemovePcForTransfer: (pcForRemoveTransfer: string) => {
      setState(current => {
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

        const mewPcsForTransferGroupByCC = handleSetPcsForTransferGroupByCC(
          listDataPCO,
        );

        return {
          ...current,
          pcsForTransfer: newPcsForTransfer,
          pcsForTransferGroupByCC: mewPcsForTransferGroupByCC,
        };
      });
    },
  });

  const handleSetPcsForTransferGroupByCC = useCallback(
    (listDataPCO: IDataPCO[]): IDataGroupPCByCC[] => {
      const newPcsForTransferGroupByCC = groupDataByCC(listDataPCO).map(
        groupCCPC => {
          const arrayItensCC = state.pco.groupByCC.filter(
            groupDataCC =>
              groupCCPC.CCusto === groupDataCC.CCusto &&
              groupCCPC.Periodo === groupDataCC.Periodo &&
              groupCCPC.Conta === groupDataCC.Conta,
          );
          if (!arrayItensCC[0]) {
            console.log(arrayItensCC);
            console.log(listDataPCO);
            console.log(state.pco.groupByCC);
          }
          const disponivelPeriodoContaCC = arrayItensCC[0]
            ? arrayItensCC[0].disponivelSistema
            : 0;
          const valorATransferir =
            disponivelPeriodoContaCC - groupCCPC.faltaEmpenhar;
          return {
            ...groupCCPC,
            disponivelPeriodoContaCC,
            valorATransferir: valorATransferir > 0 ? 0 : -1 * valorATransferir,
          };
        },
      );
      return newPcsForTransferGroupByCC;
    },
    [state],
  );

  return <PcoContext.Provider value={state}>{children}</PcoContext.Provider>;
};

export const usePco = (): IPcoContextData => {
  const context = useContext(PcoContext);

  if (!context) {
    throw new Error('usePco must be used withn a PcoProvider');
  }

  return context;
};
