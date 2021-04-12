export interface IImportPCO {
  Conta: string;
  Descrição: string;
  'C.Custo': string;
  'Item Conta': string;
  Tipo: string;
  Documento: string;
  Item: string;
  Produto: string;
  Qtd: string;
  'Vlr.Unit': number;
  Total: number;
  Emissão: string;
  'Data Prv': string;
  Periodo: string;
  Orcado: number;
  Contin: number;
  Solic: number;
  Pedido: number;
  'Entr.NF': number;
  'Real CTB': number;
}

export interface IDataPCO extends IImportPCO {
  id: string;
}

export interface IDataPCOGoupByCC {
  id: string;
  Periodo: string;
  Conta: string;
  CCusto: string;
  GastoPrevisto: number;
  Orcado: number;
  Empenhado: number;
  DisponivelSistema: number;
  FaltaEmpenhar: number;
  DisponivelReal: number;
  itens: IDataPCO[];
}

export type IKeysOfDataPCO =
  | 'id'
  | 'Periodo'
  | 'Conta'
  | 'C.Custo'
  | 'Documento'
  | 'Item'
  | 'Produto'
  | 'Qtd'
  | 'Total'
  | 'Orcado'
  | 'Pedido'
  | 'Entr.NF'
  | 'Tipo'
  | 'Contin'
  | 'Vlr.Unit';

export type IKeysOfDataPCOGroupByCC =
  | 'id'
  | 'Periodo'
  | 'Conta'
  | 'CCusto'
  | 'totalPCBloqueado'
  | 'totalOrcado'
  | 'totalEmpenhadoPC'
  | 'totalEmpenhadoNF'
  | 'disponivelSistema'
  | 'itens';
