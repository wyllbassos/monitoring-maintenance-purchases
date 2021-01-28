import React, { useState, useEffect, useCallback } from 'react';
import formatValue from '../../utils/formatValue';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container, Paginacao } from './styles';

const Custos: React.FC = () => {
  const [vlrTotalPCs, setVlrTotalPCs] = useState('');
  const [vlrTotalLiberado, setVlrTotalLiberado] = useState({
    entregue: 0,
    pendente: 0,
    total: 0,
  });
  const [vlrTotalBloqueado, setVlrTotalBloqueado] = useState('');
  const [ano, setAno] = useState('2021');
  const [mes, setMes] = useState('01');

  useEffect(() => {
    async function loadCompras(): Promise<void> {
      const { data } = await api.get<any>(
        `/custos-manutencao?year=${ano}&month=${mes}`,
      );

      const { total, liberado, bloqueado } = data;
      setVlrTotalPCs(formatValue(total));
      setVlrTotalLiberado(liberado);
      setVlrTotalBloqueado(formatValue(bloqueado.total));
    }

    loadCompras();
    // console.log(filters)
  }, [ano, mes]);

  return (
    <>
      <Header size="small" selected="/custos" />
      <Container>
        <div>
          <select value={ano} onChange={e => setAno(e.target.value)}>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
          </select>
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
        </div>
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
                <td>{formatValue(vlrTotalLiberado.entregue)}</td>
              </tr>
              <tr>
                <td>Liberado Pendente</td>
                <td>{formatValue(vlrTotalLiberado.pendente)}</td>
              </tr>
              <tr>
                <td>Bloqueado</td>
                <td>{vlrTotalBloqueado}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{vlrTotalPCs}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>

      <Paginacao></Paginacao>
    </>
  );
};

export default Custos;
