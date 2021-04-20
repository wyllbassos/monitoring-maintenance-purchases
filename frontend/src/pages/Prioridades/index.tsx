import React, { useState, useEffect, useCallback } from 'react';
import formatValue from '../../utils/formatValue';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container, Paginacao } from './styles';

export interface Compra {
  status: string;
  sc: string;
  item: string;
  produto: string;
  quantidade: number;
  emissao: string;
  descricao: string;
  aplicacao: string;
  observacao: string;
  pc: string;
  data_pc: string;
  previsao_entrega: string;
  valor_total: number;
  status_aprovacao: string | null;
  conta_pc: string;
  centro_custo_pc: string;
}

interface Filter {
  search: string;
  field: string;
}

const fieldsFilter = [
  'sc',
  'pc',
  'status',
  'produto',
  'descricao',
  'aplicacao',
  'observacao',
  'solicitante',
  'requisitante',
];

const Prioridades: React.FC = () => {
  const [compras, setCompras] = useState<Compra[] | null>(null);
  const [search, setSearch] = useState('');
  const [field, setField] = useState('sc');
  const [filters, setFilters] = useState<Filter[]>(() => {
    const ret = fieldsFilter.map(fieldFilter => {
      return { field: fieldFilter, search: '' };
    });
    ret.push({ field: 'prioridade', search: '0' });
    return ret;
  });

  useEffect(() => {
    async function loadCompras(): Promise<void> {
      console.log(filters);
      const { data } = await api.get<{
        comprasManutencao: Compra[];
        total: number;
      }>('/compras-manutencao/filter', {
        params: { limit: 20, skip: 0, filters },
      });

      const { comprasManutencao, total } = data;
      setCompras(comprasManutencao);
      console.log(comprasManutencao);
    }

    loadCompras();
  }, [filters, search, field]);

  return (
    <>
      <Header />
      <Container>
        <div>
          <label htmlFor="">Incluir</label>
          <select>
            <option value="pc">pc</option>
            <option value="sc">sc</option>
          </select>
          <input />
        </div>
        <table>
          <tbody>
            {compras?.map(compra => {
              const { sc, pc } = compra;
              return (
                <tr>
                  <td>{sc}</td>
                  <td>{pc}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Container>

      <Paginacao></Paginacao>
    </>
  );
};

export default Prioridades;
