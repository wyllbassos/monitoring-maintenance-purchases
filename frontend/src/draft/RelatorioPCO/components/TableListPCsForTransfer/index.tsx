import React, { useState, useCallback } from 'react';
import { usePco } from '../../hooks/pco';
import { groupDataByCC } from '../../hooks/utils';
import { IDataPCO, IDataPCOGoupByCC } from '../../types';

interface IPCs {
  value: string;
  valid: boolean;
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
        value: valueInputPC,
        valid: isPCValid,
      },
    ];

    if (isPCValid) {
      const listDataPCO = pco.list.filter(
        item => newPcs.findIndex(pc => pc.value === item.Documento) >= 0,
      );
      const groupbycc = groupDataByCC(listDataPCO);
      setGroupByCC(groupbycc);
    }

    setPcs(newPcs);
    setVAlueInputPC('794154');
  }, [valueInputPC, pco.list, pcs]);

  const handleRemovePC = useCallback((pc: string) => {}, []);

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
                  <button type="button">Remover</button>
                </td>
                <td>{pc.value}</td>
                <td>{pc.valid ? 'SIM' : 'NÃO'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!!groupByCC.length && (
        <table>
          <thead>
            <tr>
              <th>Periodo</th>
              <th>Conta</th>
              <th>CCusto</th>
              <th>Disponivel Sistema</th>
            </tr>
          </thead>
          <tbody>
            {groupByCC.map(cc => (
              <tr key={cc.id}>
                <td>{cc.Periodo}</td>
                <td>{cc.Conta}</td>
                <td>{cc.CCusto}</td>
                <td>{cc.disponivelSistema}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TableListPCsForTransfer;
