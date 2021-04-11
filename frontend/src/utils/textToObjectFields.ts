export interface IFields {
  key: string;
  format?: 'number' | 'date';
}

export const PCOfields: IFields[] = [
  { key: 'Conta' },
  { key: 'Descrição' },
  { key: 'C.Custo' },
  { key: 'Item Conta' },
  { key: 'Tipo' },
  { key: 'Documento' },
  { key: 'Item' },
  { key: 'Produto' },
  { key: 'Qtd', format: 'number' },
  { key: 'Vlr.Unit', format: 'number' },
  { key: 'Total', format: 'number' },
  { key: 'Emissão', format: 'date' },
  { key: 'Data Prv', format: 'date' },
  { key: 'Periodo' },
  { key: 'Orcado', format: 'number' },
  { key: 'Contin', format: 'number' },
  { key: 'Solic', format: 'number' },
  { key: 'Pedido', format: 'number' },
  { key: 'Entr.NF', format: 'number' },
  { key: 'Real CTB', format: 'number' },
];

export const SSKeys = ['SS'];
