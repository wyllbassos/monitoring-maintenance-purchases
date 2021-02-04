/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect, useCallback, useMemo } from 'react';

import { Container, Content } from './styles';

const RelatorioPCO: React.FC = () => {
  const [textAreaInput, setTextAreaInput] = useState('');
  // const [tableHeader, setTableHeader] = useState<string[]>([]);
  const [tableData, setTableData] = useState<string[][]>([]);
  const [data, setData] = useState<{ [x: string]: string }[]>([]);

  const importaDadosPCO = useCallback(() => {
    const lines = textAreaInput.split('\n');

    const table = lines.map(line => {
      return line.split('\t');
    });

    const header = table.splice(0, 1)[0];
    // setTableHeader(header);
    setTableData(table);
    const dataReturn = table.map((line, i) => {
      const ret: { [x: string]: string } = {};
      ret.id = String(i);
      header.forEach((key, index) => {
        ret[key] = line[index];
      });
      return ret;
    });
    setData(dataReturn);
  }, [textAreaInput]);

  return (
    <Container>
      <Content>
        <div>
          {!tableData.length ? (
            <button type="button" onClick={importaDadosPCO}>
              Importar
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setTableData([]);
                // setTableHeader([]);
              }}
            >
              Voltar
            </button>
          )}
        </div>
        {!tableData.length ? (
          <textarea
            name=""
            id=""
            value={textAreaInput}
            onChange={e => setTextAreaInput(e.target.value)}
          />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Periodo</th>
                <th>Conta</th>
                <th>C.Custo</th>
                <th>Documento</th>
                <th>Total</th>
                <th>Orcado</th>
                <th>Pedido</th>
                <th>Entr.NF</th>
              </tr>
            </thead>
            <tbody>
              {data.map(custoPCO => (
                <tr key={custoPCO.id}>
                  <td>{custoPCO.Periodo}</td>
                  <td>{custoPCO.Conta}</td>
                  <td>{custoPCO['C.Custo']}</td>
                  <td>{custoPCO.Documento}</td>
                  <td>{custoPCO.Total}</td>
                  <td>{custoPCO.Orcado}</td>
                  <td>{custoPCO.Pedido}</td>
                  <td>{custoPCO['Entr.NF']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Content>
    </Container>
  );
};

export default RelatorioPCO;
