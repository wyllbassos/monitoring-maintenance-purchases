import React, { useState, useCallback, useMemo } from 'react';
import formatValue from '../../../../utils/formatValue';
import { usePco } from '../../hooks/pco';
import { groupDataByCC } from '../../hooks/utils';
import { IDataPCO, IDataPCOGoupByCC } from '../../types';
import Table from '../Table';
import makeObjectLinesOfTable from '../utils/makeObjectLinesOfTable';

interface IPCs {
  edit?: JSX.Element;
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

const TableListPCsForTransfer: React.FC = () => {
  const [pcs, setPcs] = useState<IPCs[]>([]);
  const [groupByCC, setGroupByCC] = useState<IDataPCOGoupByCC[]>([]);
  const [valueInputPC, setVAlueInputPC] = useState('794153');

  const { pco } = usePco();

  const handleAddPC = useCallback(() => {
    const exists = pcs.findIndex(pc => pc.value === valueInputPC) >= 0;
    const isPCValid =
      pco.list.findIndex(item => item.Documento === valueInputPC) >= 0;

    if (exists) {
      return;
    }

    const newPcs: IPCs[] = [
      ...pcs,
      {
        edit: <></>,
        value: valueInputPC,
        exists: isPCValid ? 'SIM' : 'NÃO',
      },
    ];

    if (isPCValid) {
      const listDataPCO = pco.list.filter(
        item => newPcs.findIndex(pc => pc.value === item.Documento) >= 0,
      );

      setGroupByCC(groupDataByCC(listDataPCO));
    }

    setPcs(newPcs);
    setVAlueInputPC('794154');
  }, [valueInputPC, pco.list, pcs]);

  const handleRemovePC = useCallback(
    (pc: string) => {
      const indexPC = pcs.findIndex(findePc => findePc.value === pc);
      if (indexPC === -1) {
        return;
      }

      const newPcs = [...pcs];
      newPcs.splice(indexPC, 1);
      const listDataPCO = pco.list.filter(
        item => newPcs.findIndex(pc => pc.value === item.Documento) >= 0,
      );

      setPcs(newPcs);
      setGroupByCC(groupDataByCC(listDataPCO));
    },
    [pcs],
  );

  /*
   *---- G R O U P   B Y   C C
   */
  const headerGroupByCC = useMemo(
    () => ['Periodo', 'Conta', 'CCusto', 'Total PC Por CC', 'Disponível no CC'],
    [],
  );

  const keysGroupByCC = useMemo(
    () => ['Periodo', 'Conta', 'CCusto', 'disponivelSistema'],
    [],
  );

  const linesGroupByCC = useMemo(
    () =>
      makeObjectLinesOfTable({
        keys: keysGroupByCC,
        keysCurrency: ['disponivelSistema'],
        list: groupByCC,
      }),
    [keysGroupByCC, groupByCC],
  );

  return (
    <>
      <div>
        <input
          type="text"
          value={valueInputPC}
          onChange={({ target: { value } }) => setVAlueInputPC(value)}
        />
        <button type="button" onClick={handleAddPC}>
          Adicionar PC
        </button>
      </div>

      {!!pcs.length && (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>PC</th>
              <th>No Relatorio</th>
            </tr>
          </thead>
          <tbody>
            {pcs.map(pc => (
              <tr key={pc.value}>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      handleRemovePC(pc.value);
                    }}
                  >
                    Remover
                  </button>
                </td>
                <td>{pc.value}</td>
                <td>{pc.exists}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!!groupByCC.length && (
        <Table header={headerGroupByCC} lines={linesGroupByCC} />
      )}
    </>
  );
};

export default TableListPCsForTransfer;
