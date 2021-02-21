import React, {
  createContext,
  useContext,
  useState,
} from 'react';

import { IDataPCO, IDataPCOGoupByCC } from '../types';
import { convertTextToPCO } from './utils';

import initialInput from './utils/initialInput'

export type TSelectedTable = '' | 'dataList' | 'dataGroupByCC' | 'dataItensCC';

export interface IPCO {
  list: IDataPCO[],
  groupByCC: IDataPCOGoupByCC[],
}

interface IPcoContextData {
  selectedTable: TSelectedTable;
  pco: IPCO;
  itensCCSelected: IDataPCO[];
  handleSetDataPCO: (text: string) => void;
  handleSetSelectedTable: (selectedTable: TSelectedTable) => void;
  handleSetItensCC: (itens: IDataPCO[]) => void;
  textInput: string;
}

const PcoContext = createContext<IPcoContextData>({} as IPcoContextData);

export const PcoProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<IPcoContextData>({
    textInput: initialInput.text,
    selectedTable: '',
    pco: convertTextToPCO(initialInput.text),
    itensCCSelected: [],
    handleSetDataPCO: (text: string) => {
      const pco = convertTextToPCO(text);
      setState(current => ({ ...current, pco, textInput: text }));
    },
    handleSetSelectedTable: (selectedTable: TSelectedTable) => {
      setState(current => ({ ...current, selectedTable }));
    },
    handleSetItensCC: (itens: IDataPCO[]) => {
      setState(current => ({
        ...current,
        selectedTable: 'dataItensCC',
        itensCCSelected: itens
      }));
    }
  });

  return (
    <PcoContext.Provider value={state}>
      {children}
    </PcoContext.Provider>
  );
};

export const usePco = (): IPcoContextData => {
  const context = useContext(PcoContext);

  if (!context) {
    throw new Error('usePco must be used withn a PcoProvider');
  }

  return context;
};
