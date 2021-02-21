export interface IDataPCO {
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

export interface IPCO {
  list: IDataPCO[],
  groupByCC: IDataPCOGoupByCC[],
}

export interface IDataPCOGoupByCC {
  id: string;
  Periodo: string;
  Conta: string;
  CCusto: string;
  totalPCBloqueado: number;
  totalOrcado: number;
  totalEmpenhadoPC: number;
  totalEmpenhadoNF: number;
  disponivelSistema: number;
  itens: IDataPCO[];
}

export type IKeysOfDataPCO = (
  'id' |
  'Periodo' |
  'Conta' |
  'C.Custo' |
  'Documento' |
  'Item' |
  'Produto' |
  'Qtd' |
  'Total' |
  'Orcado' |
  'Pedido' |
  'Entr.NF' |
  'Tipo' |
  'Contin' |
  'Vlr.Unit'
);

export type IKeysOfDataPCOGroupByCC = (
  'id' |
  'Periodo' |
  'Conta' |
  'CCusto' |
  'totalPCBloqueado' |
  'totalOrcado' |
  'totalEmpenhadoPC' |
  'totalEmpenhadoNF' |
  'disponivelSistema' |
  'itens'
);

export type TSelectedTable = '' | 'dataList' | 'dataGroupByCC' | 'dataItensCC';
