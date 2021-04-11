import React, { useState, useCallback, useMemo } from 'react';
import ItemWithRemoveButton from '../../../../components/ItemWithRemoveButton';
import PainelToListItens from '../../../../components/PainelToListItens';
import { usePco } from '../../hooks/pco';
import { IDataPCOGoupByCC } from '../../types';
import Table from '../Table';
import makeObjectLinesOfTable from '../utils/makeObjectLinesOfTable';

interface IPCs {
  value: string;
  exists: string;
}

type TPCGroupByCC =
  | 'Periodo'
  | 'Conta'
  | 'CCusto'
  | 'Total PC Por CC'
  | 'Disponível no CC';

interface IPCGroupByCC {
  Periodo: string;
  Conta: string;
  CCusto: string;
  'Total PC Por CC': number;
  'Disponível no CC': number;
}

interface IDataGroupPCByCC extends IDataPCOGoupByCC {
  disponivelPeriodoContaCC?: number;
  valorATransferir: number;
}

const header = [
  'Periodo',
  'Conta',
  'CCusto',
  'Gasto Previsto',
  'Empenhado',
  'Falta Empenhar',
  'Disponivel Sitema',
  'Disponivel Real',
  'Valor a Transferir',
];

const keys = [
  'Periodo',
  'Conta',
  'CCusto',
  'GastoPrevisto',
  'Empenhado',
  'FaltaEmpenhar',
  'disponivelPeriodoContaCC',
  'DisponivelReal',
  'valorATransferir',
];

const keysCurrency = [
  'GastoPrevisto',
  'Empenhado',
  'FaltaEmpenhar',
  'disponivelPeriodoContaCC',
  'DisponivelReal',
  'valorATransferir',
];

const TableListPCsForTransfer: React.FC = () => {
  const [valueInputPC, setVAlueInputPC] = useState('794138');

  const {
    pcsForTransfer,
    handleAddPcForTransfer,
    pcsForTransferGroupByCC,
    handleRemovePcForTransfer,
  } = usePco();

  const linesGroupByCC = useMemo(
    () =>
      makeObjectLinesOfTable({
        keys,
        keysCurrency,
        list: pcsForTransferGroupByCC,
      }),
    [keys, pcsForTransferGroupByCC],
  );

  return (
    <>
      <div>
        <input
          type="text"
          value={valueInputPC}
          onChange={({ target: { value } }) => setVAlueInputPC(value)}
        />
        <button
          type="button"
          onClick={() => handleAddPcForTransfer(valueInputPC)}
        >
          Adicionar PC
        </button>
      </div>

      {!!pcsForTransfer.length && (
        <PainelToListItens>
          {pcsForTransfer.map(pc => (
            <ItemWithRemoveButton
              handleRemovePcForTransfer={() => handleRemovePcForTransfer(pc)}
              value={pc}
            />
          ))}
        </PainelToListItens>
      )}

      {!!pcsForTransferGroupByCC.length && (
        <Table header={header} lines={linesGroupByCC} />
      )}
    </>
  );
};

export default TableListPCsForTransfer;
