/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useCallback } from 'react';

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
  Item: string;
  Produto: string;
  Qtd: string;
  Total: string;
  Orcado: string;
  Pedido: string;
  'Entr.NF': string;
  Tipo: 'PC' | 'SC' | 'SO';
  Contin: string;
  'Vlr.Unit': string;
}

export interface DataCalcByCC {
  Periodo: string;
  totalItens: number;
  itens: Array<{
    Conta: string;
    totalItens: number;
    itens: Array<{
      Periodo: string;
      Conta: string;
      totalItens: number;
      CCusto: string;
      totalPC: number;
      totalOrcado: number;
      totalEmpenhadoPC: number;
      totalEmpenhadoNF: number;
      disponivel: number;
      itens: DataPCO[];
    }>;
  }>;
}

const TableImportPCO: React.FC<{ data: DataPCO[] }> = (props: {
  data: DataPCO[];
}) => {
  const { data } = props;
  return (
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
  );
};

const TableCousyByCC: React.FC<{ data: DataCalcByCC[] }> = (props: {
  data: DataCalcByCC[];
}) => {
  const { data } = props;
  return (
    <table>
      <thead>
        <tr>
          <th>Periodo</th>
          <th>Conta</th>
          <th>C.Custo</th>
          <th>Total PC</th>
          <th>Orçado</th>
          <th>Total Empenhado PC</th>
          <th>Total Empenhado NF</th>
        </tr>
      </thead>
      <tbody>
        {/* {data.map(periodoPCO => {
          const { Periodo } = periodoPCO;
          periodoPCO.itens.map(contaPCO => {
                const { Conta } = contaPCO;
                return (


                    {contaPCO.itens.map(ccPCO => (
                      <tr key={periodoPCO.Periodo}></tr>
                        {Periodo !== periodoPCO.Periodo && (
                          <th rowSpan={periodoPCO.totalItens}>{periodoPCO.Periodo}</th>
                        )}
                        <th rowSpan={contaPCO.totalItens}>{contaPCO.Conta}</th>
                        <td>{ccPCO.CCusto}</td>
                        <td>{ccPCO.totalPC}</td>
                        <td>{ccPCO.totalOrcado}</td>
                        <td>{ccPCO.totalEmpenhadoPC}</td>
                        <td>{ccPCO.totalEmpenhadoNF}</td>
                        </tr>
                    ))}
                );
              })}

          );
        })} */}
      </tbody>
    </table>
  );
};

const RelatorioPCO: React.FC = () => {
  const [textAreaInput, setTextAreaInput] = useState('');
  const [data, setData] = useState<DataPCO[]>([]);
  const [dataCalcByCC, setDataCalcByCC] = useState<DataCalcByCC[]>([]);

  if (dataCalcByCC[0]) console.log(dataCalcByCC[0].itens[0]);

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
        ) : !dataCalcByCC.length ? (
          <TableImportPCO data={data} />
        ) : (
          <TableCousyByCC data={dataCalcByCC} />
        )}
      </Content>
    </Container>
  );
};

export default RelatorioPCO;
