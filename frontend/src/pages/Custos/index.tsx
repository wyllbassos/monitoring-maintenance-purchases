import React, { useState, useEffect, useMemo } from 'react';
import formatValue from '../../utils/formatValue';

import api from '../../services/api';

import { Container, Filtros } from './styles';
import PageBase from '../../components/PageBase';
import { usePageBase } from './../../hooks/pageBase';

export interface CustosManutencao {
  total: {
    lubrificantes: number;
    manutencao: number;
    estoque: number;
    total: number;
  };
  bloqueado: {
    lubrificantes: number;
    manutencao: number;
    estoque: number;
    total: number;
  };
  liberado: {
    entregue: {
      lubrificantes: number;
      manutencao: number;
      estoque: number;
      total: number;
    };
    pendente: {
      lubrificantes: number;
      manutencao: number;
      estoque: number;
      total: number;
    };
    total: {
      lubrificantes: number;
      manutencao: number;
      estoque: number;
      total: number;
    };
  };
}

type TipoCusto = 'Todos' | 'Manutencao' | 'Lubrificantes' | 'Estoque';

const Custos: React.FC = () => {
  const [custosManutencao, setCustosManutencao] = useState<
    CustosManutencao | undefined
  >(undefined);

  const [ano, setAno] = useState('2021');
  const [mes, setMes] = useState('01');
  const [tipoCusto, setTipoCusto] = useState<TipoCusto>('Todos');

  const { setSidebarComponent } = usePageBase();

  useEffect(() => {
    async function loadCompras(): Promise<void> {
      const { data } = await api.get<CustosManutencao>(
        `/custos-manutencao?year=${ano}&month=${mes}`,
      );
      setCustosManutencao(data);
    }

    loadCompras();
  }, [ano, mes]);

  useEffect(() => {
    setSidebarComponent(
      <Filtros>
        <span>Ano</span>
        <select value={ano} onChange={e => setAno(e.target.value)}>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
        </select>
        <span>Mês</span>
        <select value={mes} onChange={e => setMes(e.target.value)}>
          <option value="01">01</option>
          <option value="02">02</option>
          <option value="03">03</option>
          <option value="04">04</option>
          <option value="05">05</option>
          <option value="06">06</option>
          <option value="07">07</option>
          <option value="08">08</option>
          <option value="09">09</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        <span>Tipo</span>
        <select
          value={tipoCusto}
          onChange={e => setTipoCusto(e.target.value as TipoCusto)}
        >
          <option value="Todos">Todos</option>
          <option value="Lubrificantes">Lubrificantes</option>
          <option value="Estoque">Estoque</option>
          <option value="Manutencao">Manutenção</option>
        </select>
      </Filtros>,
    );
  }, []);

  const custoManutencaoFormated = useMemo(() => {
    const newCustosManutencao = {
      liberado: {
        entregue: '',
        pendente: '',
        total: '',
      },
      bloqueado: '',
      total: '',
    };

    if (custosManutencao) {
      switch (tipoCusto) {
        case 'Todos': {
          const { total, bloqueado, liberado } = custosManutencao;
          newCustosManutencao.liberado.entregue = formatValue(
            liberado.entregue.total,
          );
          newCustosManutencao.liberado.pendente = formatValue(
            liberado.pendente.total,
          );
          newCustosManutencao.liberado.total = formatValue(
            liberado.total.total,
          );
          newCustosManutencao.bloqueado = formatValue(bloqueado.total);
          newCustosManutencao.total = formatValue(total.total);
          break;
        }
        case 'Lubrificantes': {
          const { total, bloqueado, liberado } = custosManutencao;
          newCustosManutencao.liberado.entregue = formatValue(
            liberado.entregue.lubrificantes,
          );
          newCustosManutencao.liberado.pendente = formatValue(
            liberado.pendente.lubrificantes,
          );
          newCustosManutencao.liberado.total = formatValue(
            liberado.total.lubrificantes,
          );
          newCustosManutencao.bloqueado = formatValue(bloqueado.lubrificantes);
          newCustosManutencao.total = formatValue(total.lubrificantes);
          break;
        }
        case 'Manutencao': {
          const { total, bloqueado, liberado } = custosManutencao;
          newCustosManutencao.liberado.entregue = formatValue(
            liberado.entregue.manutencao,
          );
          newCustosManutencao.liberado.pendente = formatValue(
            liberado.pendente.manutencao,
          );
          newCustosManutencao.liberado.total = formatValue(
            liberado.total.manutencao,
          );
          newCustosManutencao.bloqueado = formatValue(bloqueado.manutencao);
          newCustosManutencao.total = formatValue(total.manutencao);
          break;
        }
        case 'Estoque': {
          const { total, bloqueado, liberado } = custosManutencao;
          newCustosManutencao.liberado.entregue = formatValue(
            liberado.entregue.estoque,
          );
          newCustosManutencao.liberado.pendente = formatValue(
            liberado.pendente.estoque,
          );
          newCustosManutencao.liberado.total = formatValue(
            liberado.total.estoque,
          );
          newCustosManutencao.bloqueado = formatValue(bloqueado.estoque);
          newCustosManutencao.total = formatValue(total.estoque);
          break;
        }
        default: {
          break;
        }
      }
    }

    return newCustosManutencao;
  }, [custosManutencao, tipoCusto]);

  new String(undefined);

  return (
    <Container>
      <div>
        <table>
          <thead>
            <tr>
              <th>Status PC</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Liberado Entregue</td>
              <td>{custoManutencaoFormated.liberado.entregue}</td>
            </tr>
            <tr>
              <td>Liberado Pendente</td>
              <td>{custoManutencaoFormated.liberado.pendente}</td>
            </tr>
            <tr>
              <td>Liberado Total</td>
              <td>{custoManutencaoFormated.liberado.total}</td>
            </tr>
            <tr>
              <td>Bloqueado</td>
              <td>{custoManutencaoFormated.bloqueado}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{custoManutencaoFormated.total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default Custos;
