/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect, useCallback } from 'react';

import Header from '../../components/Header';

import { Container, ContainerTable } from './styles';

import api from '../../services/api';
import Table from './Table';
import { Compra } from '../../pages/Prioridades/index';

interface Props {
  Nivel: string;
}

interface UpdateStatusAaprovacao {
  pc: string;
  status_aprovacao: string;
}

export interface RelatorioPC {
  pc: string;
  valor_total: number;
  status_aprovacao: string | null;
  itens: Compra[];
}

const RelatorioNivelV2: React.FC<Props> = ({ Nivel }: Props) => {
  const [relatorioPC, setRelatorioPC] = useState<RelatorioPC[]>([]);
  const [statusAprovacao, setStatusAprovacao] = useState<string>('Todos');
  const [nivelAprovacao, setNivelAprovacao] = useState(0);
  const [statusAprovacoes, setStatusAprovacoes] = useState<string[]>([
    'Todos',
    'Vazios',
  ]);

  useEffect(() => {
    async function loadCompras(): Promise<void> {
      const { data } = await api.get<Compra[]>(`/compras-manutencao/${Nivel}`);

      const newComprasRelatorioV2: RelatorioPC[] = [];

      const newStatusAprovacoes: string[] = ['Todos', 'Vazios'];

      data.forEach(compra => {
        const indexNewCompra = newComprasRelatorioV2.findIndex(
          newCompra => newCompra.pc === compra.pc,
        );

        if (indexNewCompra === -1) {
          newComprasRelatorioV2.push({
            pc: compra.pc,
            valor_total: compra.valor_total,
            status_aprovacao: compra.status_aprovacao,
            itens: [compra],
          });

          const indexNewStatusAprovacao = newStatusAprovacoes.findIndex(
            newStatusAprovacao =>
              newStatusAprovacao === compra.status_aprovacao,
          );

          if (indexNewStatusAprovacao === -1 && compra.status_aprovacao) {
            newStatusAprovacoes.push(compra.status_aprovacao);
          }
        } else {
          newComprasRelatorioV2[indexNewCompra].valor_total +=
            compra.valor_total;
          newComprasRelatorioV2[indexNewCompra].itens.push(compra);
        }
      });
      setStatusAprovacoes(newStatusAprovacoes);
      setRelatorioPC(newComprasRelatorioV2);
    }
    loadCompras();
  }, [Nivel]);

  return (
    <Container>
      <Header size="small" selected={`/${Nivel}`} />
      {relatorioPC.length > 0 ? (
        <ContainerTable>
          <div>
            <div>
              <select
                value={nivelAprovacao}
                onChange={e => setNivelAprovacao(Number(e.target.value))}
              >
                <option value={0}>Todos</option>
                <option value={1}>Nivel 1</option>
                <option value={2}>Nivel 2</option>
                <option value={3}>Nivel 3</option>
              </select>
              <select
                value={statusAprovacao}
                onChange={e => setStatusAprovacao(e.target.value)}
              >
                {statusAprovacoes.map(statusAprovacaoItem => (
                  <option key={statusAprovacaoItem} value={statusAprovacaoItem}>
                    {statusAprovacaoItem}
                  </option>
                ))}
              </select>
              <span>{`${relatorioPC.length} PC's`}</span>
            </div>
          </div>
          <Table relatorioPC={relatorioPC} setRelatorioPC={setRelatorioPC} />
          <div></div>
        </ContainerTable>
      ) : (
        <div>Sem PC</div>
      )}
    </Container>
  );
};

export default RelatorioNivelV2;
