/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect, useCallback, useMemo } from 'react';

import { Container, Content } from './styles';

import {
  fCalcValueByCC,
  fImportData,
} from './utils/functionsTransformDataImport';

export interface DataPCO {
  id: string;
  Periodo: string;
  Conta: string;
  'C.Custo': string;
  Documento: string;
  Total: string;
  Orcado: string;
  Pedido: string;
  'Entr.NF': string;
}

export interface DataCalcByCC {
  Periodo: string;
  itens: Array<{
    Conta: string;
    itens: Array<{
      CCusto: string;
      totalPC: number;
      Orcado: number;
      totalEmpenhadoPC: number;
      totalEmpenhadoNF: number;
      disponivel: number;
      itens: DataPCO[];
    }>;
  }>;
}

const RelatorioPCO: React.FC = () => {
  const [textAreaInput, setTextAreaInput] = useState('');
  const [data, setData] = useState<DataPCO[]>([]);
  const [dataCalcByCC, setDataCalcByCC] = useState<DataCalcByCC[]>([]);

  const importData = useCallback(
    () => fImportData({ textAreaInput, setData }),
    [textAreaInput, setData],
  );

  const calcValueByCC = useCallback(() => {
    fCalcValueByCC({ data, setDataCalcByCC });
  }, [data, setDataCalcByCC]);

  return (
    <Container>
      <Content>
        <div>
          {!data.length ? (
            <button type="button" onClick={importData}>
              Importar
            </button>
          ) : (
            <div>
              <button
                type="button"
                onClick={() => {
                  setData([]);
                }}
              >
                Voltar
              </button>
              <button type="button" onClick={calcValueByCC}>
                Calcular Verba Por CC
              </button>
            </div>
          )}
        </div>
        {!data.length ? (
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
