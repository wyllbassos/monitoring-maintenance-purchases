/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useCallback } from 'react';

import { Container, Content } from './styles';

import {
  groupDataByCC,
  fImportData,
} from './utils/functionsTransformDataImport';

import formatValue from './../../utils/formatValue';

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

export interface DataPCOValuesNumber {
  id: string;
  Periodo: string;
  Conta: string;
  'C.Custo': string;
  Documento: string;
  Item: string;
  Produto: string;
  Qtd: number;
  Total: number;
  Orcado: number;
  Pedido: number;
  'Entr.NF': number;
  Tipo: 'PC' | 'SC' | 'SO';
  Contin: number;
  'Vlr.Unit': number;
}

export interface DataGoupByCC {
  id: string;
  Periodo: string;
  Conta: string;
  CCusto: string;
  totalPCBloqueado: number;
  totalOrcado: number;
  totalEmpenhadoPC: number;
  totalEmpenhadoNF: number;
  disponivelSistema: number;
  itens: DataPCOValuesNumber[];
}

const TableImportPCO: React.FC<{ dataPCO: DataPCO[] }> = ({
  dataPCO,
}: {
  dataPCO: DataPCO[];
}) => {
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
        {dataPCO.map(custoPCO => (
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

const TableCousyByCC: React.FC<{ dataGoupByCC: DataGoupByCC[] }> = ({
  dataGoupByCC,
}: {
  dataGoupByCC: DataGoupByCC[];
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>PC's</th>
          <th>Periodo</th>
          <th>Conta</th>
          <th>C.Custo</th>
          <th>PC Bloqueado</th>
          <th>Orçado</th>
          <th>Empenhado PC</th>
          <th>Empenhado NF</th>
          <th>Disponivel Sistema</th>
        </tr>
      </thead>
      <tbody>
        {dataGoupByCC.map(dataGoupByCCItem => {
          const {
            id,
            CCusto,
            Periodo,
            Conta,
            totalPCBloqueado,
            totalOrcado,
            totalEmpenhadoPC,
            totalEmpenhadoNF,
            disponivelSistema,
          } = dataGoupByCCItem;
          return (
            <tr key={id}>
              <td>Detalhe</td>
              <td>{Periodo}</td>
              <td>{Conta}</td>
              <td>{CCusto}</td>
              <td>{formatValue(totalPCBloqueado)}</td>
              <td>{formatValue(totalOrcado)}</td>
              <td>{formatValue(totalEmpenhadoPC)}</td>
              <td>{formatValue(totalEmpenhadoNF)}</td>
              <td>{formatValue(disponivelSistema)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const TableListItensCC: React.FC<{ listItensCC: DataPCOValuesNumber[] }> = ({
  listItensCC,
}: {
  listItensCC: DataPCOValuesNumber[];
}) => {
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
        {listItensCC.map(itenCC => (
          <tr key={itenCC.id}>
            <td>{itenCC.Periodo}</td>
            <td>{itenCC.Conta}</td>
            <td>{itenCC['C.Custo']}</td>
            <td>{itenCC.Documento}</td>
            <td>{itenCC.Total}</td>
            <td>{itenCC.Orcado}</td>
            <td>{itenCC.Pedido}</td>
            <td>{itenCC['Entr.NF']}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const RelatorioPCO: React.FC = () => {
  const [textAreaInput, setTextAreaInput] = useState('');
  const [dataPCO, setDataPCO] = useState<DataPCO[]>([]);
  const [dataGoupByCC, setDataGoupByCC] = useState<DataGoupByCC[]>([]);
  const [listItensCC, setListItensCC] = useState<DataPCOValuesNumber[]>([]);

  const importData = useCallback(() => {
    setDataPCO(fImportData({ text: textAreaInput }));
  }, [textAreaInput]);

  const calcValueByCC = useCallback(() => {
    setDataGoupByCC(groupDataByCC({ dataPCO }));
  }, [dataPCO]);

  const gerarTabelaTotaisCC = useCallback(() => {
    const newDataPCO = fImportData({ text: textAreaInput });
    const newDataGoupByCC = groupDataByCC({ dataPCO: newDataPCO });
    setDataGoupByCC(newDataGoupByCC);
    setDataPCO(newDataPCO);
  }, [textAreaInput]);

  return (
    <Container>
      <Content>
        <div>
          {!dataPCO.length ? (
            <div>
              <button type="button" onClick={gerarTabelaTotaisCC}>
                Gerar Tabela Totais
              </button>
              <button type="button" onClick={importData}>
                Importar Lista
              </button>
            </div>
          ) : (
            <div>
              <button
                type="button"
                onClick={() => {
                  setDataPCO([]);
                  setDataGoupByCC([]);
                  setListItensCC([]);
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
        {!dataPCO.length ? (
          <textarea
            name=""
            id=""
            value={textAreaInput}
            onChange={e => setTextAreaInput(e.target.value)}
          />
        ) : !dataGoupByCC.length ? (
          <TableImportPCO dataPCO={dataPCO} />
        ) : !listItensCC.length ? (
          <TableCousyByCC dataGoupByCC={dataGoupByCC} />
        ) : (
          <TableListItensCC listItensCC={listItensCC} />
        )}
      </Content>
    </Container>
  );
};

export default RelatorioPCO;
