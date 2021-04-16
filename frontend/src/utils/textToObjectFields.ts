export interface IFields {
  key: string;
  format?: 'number' | 'date';
}

export const PCOFields: IFields[] = [
  { key: 'conta' },
  { key: 'descricao' },
  { key: 'c_custo' },
  { key: 'item_conta' },
  { key: 'tipo' },
  { key: 'documento' },
  { key: 'item' },
  { key: 'produto' },
  { key: 'qtd', format: 'number' },
  { key: 'vlr_unit', format: 'number' },
  { key: 'total', format: 'number' },
  { key: 'emissao', format: 'date' },
  { key: 'data_prv', format: 'date' },
  { key: 'periodo' },
  { key: 'orcado', format: 'number' },
  { key: 'contin', format: 'number' },
  { key: 'solic', format: 'number' },
  { key: 'pedido', format: 'number' },
  { key: 'entr_nf', format: 'number' },
  { key: 'real_ctb', format: 'number' },
];

export const SSFields = [
  { key: 'ss' },
  { key: 'tag' },
  { key: 'nome_bem' },
  { key: 'descricao_servico' },
  { key: 'data' },
  { key: 'servico' },
  { key: 'centro_trabalho' },
  { key: 'solicitante' },
  { key: 'os' },
  { key: 'responsavel' },
  { key: 'recursos' },
  { key: 'tempo' },
  { key: 'prioridade' },
  { key: 'observacao_tratativas' },
];

export const SSKeys = ['SS'];
