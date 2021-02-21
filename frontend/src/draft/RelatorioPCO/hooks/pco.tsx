import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { IDataPCO, IPCO, TSelectedTable } from '../types';
import { convertTextToPCO } from './utils';

interface IPcoContextData {
  selectedTable: TSelectedTable;
  pco: IPCO;
  itensCCSelected: IDataPCO[];
  handleSetDataPCO: (text: string) => void;
  handleSetSelectedTable: (selectedTable: TSelectedTable) => void;
  handleSetItensCC: (itens: IDataPCO[]) => void;
}

const PcoContext = createContext<IPcoContextData>({} as IPcoContextData);

export const PcoProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<IPcoContextData>({
    selectedTable: '',
    pco: convertTextToPCO(''),
    itensCCSelected: [],
    handleSetDataPCO: (text: string) => {
      const pco = convertTextToPCO(text);
      setState(current => ({ ...current, pco }));
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
