import React, { useState, useCallback } from 'react';
import { usePco } from '../../hooks/pco';
import { groupDataByCC } from '../../hooks/utils';
import { IDataPCO, IDataPCOGoupByCC } from '../../types';

const TableListPCsForTransfer: React.FC = () => {
  const [pcs, setPcs] = useState<string[]>([]);
  const [groupByCC, setGroupByCC] = useState<IDataPCOGoupByCC[]>([]);
  const [valueInputPC, setVAlueInputPC] = useState('794153');

  const { selectedTable, pco } = usePco();

  const handleAddPC = useCallback(() => {
    const newPcs = [
      ...pcs,
      valueInputPC,
    ];

    const listDataPCO = pco.list.filter(item => {
      const findPC = newPcs.findIndex(pc => pc === item.Documento);
      return findPC >= 0;
    })

    const groupbycc = groupDataByCC(listDataPCO);

    setPcs(newPcs);
    setGroupByCC(groupbycc);

  }, [valueInputPC, pco.list, pcs ]);

  return (
    <>
      {!!pcs.length && (
        <table>
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
      {selectedTable !== '' && (
        <div>
          <input
            type="text"
            value={valueInputPC}
            onChange={({ target: { value } }) => setVAlueInputPC(value) }
          />
          <button type='button' onClick={handleAddPC}>Adicionar PC</button>
        </div>
      )}
    </>
  );
}

export default TableListPCsForTransfer;
