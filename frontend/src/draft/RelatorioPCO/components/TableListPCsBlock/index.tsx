import React, { useState, useCallback, useMemo } from 'react';
import formatValue from '../../../../utils/formatValue';
import { usePco } from '../../hooks/pco';
import { groupDataByCC } from '../../hooks/utils';
import { IDataPCO, IDataPCOGoupByCC } from '../../types';
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

const TableListPCsBlock: React.FC = () => {
  const [valueInputPC, setVAlueInputPC] = useState('794138');

  const {
    pcsForTransfer,
    handleAddPcForTransfer,
    pcsForTransferGroupByCC,
    handleRemovePcForTransfer,
  } = usePco();

  /*
   *   G  R  O  U  P    B  Y     C  C
   */
  const headerGroupByCC = useMemo(
    () => [
      'Periodo',
      'Conta',
      'CCusto',
      'Total PC',
      'Empenhado PC',
      'Falta Empenhar',
      'Disponivel no Sitema',
      'Valor a Transferir',
    ],
    [],
  );

  const keysGroupByCC = useMemo(
    () => [
      'Periodo',
      'Conta',
      'CCusto',
      'totalPCBloqueado',
      'totalEmpenhadoPC',
      'faltaEmpenhar',
      'disponivelPeriodoContaCC',
      'valorATransferir',
    ],
    [],
  );

  const linesGroupByCC = useMemo(
    () =>
      makeObjectLinesOfTable({
        keys: keysGroupByCC,
        keysCurrency: [
          'totalPCBloqueado',
          'totalEmpenhadoPC',
          'faltaEmpenhar',
          'disponivelPeriodoContaCC',
          'valorATransferir',
        ],
        list: pcsForTransferGroupByCC,
      }),
    [keysGroupByCC, pcsForTransferGroupByCC],
  );

  /*
   *---- L I S T   P C s
   */
  const headerListPCs = useMemo(() => ['PC'], []);

  const keysListPCs = useMemo(() => ['value'], []);

  const linesListPCsC = useMemo(
    () =>
      makeObjectLinesOfTable({
        keys: keysListPCs,
        keysCurrency: [],
        list: [
          ...pcsForTransfer.map(pc => ({
            value: (
              <div>
                <button
                  type="button"
                  onClick={() => {
                    handleRemovePcForTransfer(pc);
                  }}
                >
                  X
                </button>
                {pc}
              </div>
            ),
          })),
        ],
      }),
    [pcsForTransfer, handleRemovePcForTransfer],
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
        <Table header={headerListPCs} lines={linesListPCsC} />
      )}

      {!!pcsForTransferGroupByCC.length && (
        <Table header={headerGroupByCC} lines={linesGroupByCC} />
      )}
    </>
  );
};

export default TableListPCsBlock;
