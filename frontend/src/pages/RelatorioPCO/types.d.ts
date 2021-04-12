export interface IImportPCO {
  conta: string;
  descrição: string;
  c_custo: string;
  item_conta: string;
  tipo: string;
  documento: string;
  item: string;
  produto: string;
  qtd: string;
  vlr_unit: number;
  total: number;
  emissão: string;
  data_prv: string;
  periodo: string;
  orcado: number;
  contin: number;
  solic: number;
  pedido: number;
  entr_nf: number;
  real_ctb: number;
}

export interface IDataPCO extends IImportPCO {
  id: string;
}

export interface IDataPCOGoupByCC {
  id: string;
  periodo: string;
  conta: string;
  c_custo: string;
  gasto_previsto: number;
  orcado: number;
  empenhado: number;
  disponivel_sistema: number;
  falta_empenhar: number;
  disponivel_real: number;
  itens: IDataPCO[];
}

export type IKeysOfDataPCO =
  | 'id'
  | 'conta'
  | 'descricao'
  | 'c_custo'
  | 'item_conta'
  | 'tipo'
  | 'documento'
  | 'item'
  | 'produto'
  | 'qtd'
  | 'vlr_unit'
  | 'total'
  | 'emissao'
  | 'data_prv'
  | 'periodo'
  | 'orcado'
  | 'contin'
  | 'solic'
  | 'pedido'
  | 'entr_nf'
  | 'real_ctb';

export type IKeysOfDataPCOGroupByCC =
  | 'id'
  | 'periodo'
  | 'conta'
  | 'c_custo'
  | 'totalPCBloqueado'
  | 'totalOrcado'
  | 'totalEmpenhadoPC'
  | 'totalEmpenhadoNF'
  | 'disponivelSistema'
  | 'itens';
