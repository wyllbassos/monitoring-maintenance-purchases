/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useCallback } from 'react';

import { Container, Content } from './styles';

import {
  groupDataByCC,
  fImportData,
} from './utils/functionsTransformDataImport';

import formatValue from '../../utils/formatValue';

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

interface TableImportPCOProps {
  dataPCO: DataPCO[];
}

interface TableGroupByCCProps {
  dataGoupByCC: DataGoupByCC[];
  setListItensCC: React.Dispatch<React.SetStateAction<DataPCOValuesNumber[]>>;
}

interface TableListItensCCProps {
  listItensCC: DataPCOValuesNumber[];
}

interface ContentDataProps
  extends TableImportPCOProps,
    TableGroupByCCProps,
    TableListItensCCProps {
  textAreaInput: string;
  setTextAreaInput: React.Dispatch<React.SetStateAction<string>>;
  gerarTabelaTotaisCC: () => void;
  importData: () => void;
  handleResetData: () => void;
  calcValueByCC: () => void;
  handleResetListItensCC: () => void;
}

const TableImportPCO: React.FC<TableImportPCOProps> = ({
  dataPCO,
}: TableImportPCOProps) => {
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

const TableGroupByCC: React.FC<TableGroupByCCProps> = ({
  dataGoupByCC,
  setListItensCC,
}: TableGroupByCCProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>PCs</th>
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
            itens,
          } = dataGoupByCCItem;
          return (
            <tr key={id}>
              <td>
                <button type="button" onClick={() => setListItensCC(itens)}>
                  Detalhe
                </button>
              </td>
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

const TableListItensCC: React.FC<TableListItensCCProps> = ({
  listItensCC,
}: TableListItensCCProps) => {
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
            <td>{formatValue(itenCC.Total)}</td>
            <td>{formatValue(itenCC.Orcado)}</td>
            <td>{formatValue(itenCC.Pedido)}</td>
            <td>{formatValue(itenCC['Entr.NF'])}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ContentData: React.FC<ContentDataProps> = ({
  dataPCO,
  dataGoupByCC,
  listItensCC,
  setListItensCC,
  textAreaInput,
  setTextAreaInput,
  gerarTabelaTotaisCC,
  importData,
  handleResetData,
  calcValueByCC,
  handleResetListItensCC,
}: ContentDataProps) => {
  if (!dataPCO.length) {
    return (
      <>
        <div>
          <button type="button" onClick={gerarTabelaTotaisCC}>
            Gerar Tabela de Totais
          </button>

          <button type="button" onClick={importData}>
            Gerar Tabela de Registros
          </button>
        </div>
        <textarea
          name=""
          id=""
          value={textAreaInput}
          onChange={e => setTextAreaInput(e.target.value)}
        />
      </>
    );
  }

  if (!dataGoupByCC.length) {
    return (
      <>
        <div>
          <button type="button" onClick={handleResetData}>
            Voltar
          </button>
          <button type="button" onClick={calcValueByCC}>
            Calcular Verba Por CC
          </button>
        </div>
        <TableImportPCO dataPCO={dataPCO} />
      </>
    );
  }

  if (!listItensCC.length) {
    return (
      <>
        <div>
          <button type="button" onClick={handleResetData}>
            Voltar
          </button>
        </div>
        <TableGroupByCC
          dataGoupByCC={dataGoupByCC}
          setListItensCC={setListItensCC}
        />
      </>
    );
  }

  return (
    <>
      <div>
        <button type="button" onClick={handleResetListItensCC}>
          Voltar
        </button>
      </div>
      <TableListItensCC listItensCC={listItensCC} />
    </>
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

  const handleResetData = useCallback(() => {
    setDataPCO([]);
    setDataGoupByCC([]);
    setListItensCC([]);
  }, []);

  const handleResetListItensCC = useCallback(() => {
    setListItensCC([]);
  }, []);

  return (
    <Container>
      <Content>
        <ContentData
          dataPCO={dataPCO}
          dataGoupByCC={dataGoupByCC}
          setListItensCC={setListItensCC}
          listItensCC={listItensCC}
          textAreaInput={textAreaInput}
          setTextAreaInput={setTextAreaInput}
          gerarTabelaTotaisCC={gerarTabelaTotaisCC}
          importData={importData}
          handleResetData={handleResetData}
          calcValueByCC={calcValueByCC}
          handleResetListItensCC={handleResetListItensCC}
        />
      </Content>
    </Container>
  );
};

export default RelatorioPCO;
