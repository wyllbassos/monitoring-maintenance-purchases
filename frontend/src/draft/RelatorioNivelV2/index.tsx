/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect, useCallback, useMemo } from 'react';

import Header from '../../components/Header';

import { Container, ContainerTable } from './styles';

import api from '../../services/api';
import Table from './Table';
import { Compra } from '../../pages/Prioridades/index';

// interface Props {
//   Nivel: string;
// }

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

interface OptionsProps {
  statusAprovacoes: string[];
  niveisAprovacoes: string[];
}

interface StateProps {
  statusAprovacao: string;
  nivelAprovacao: string;
  relatorioPC: RelatorioPC[];
}

interface SetStateProps {
  statusAprovacao?: string;
  nivelAprovacao?: string;
  relatorioPC?: RelatorioPC[];
}

const getDataApi = async (nivel: string): Promise<RelatorioPC[]> => {
  const { data } = await api.get<Compra[]>(`/compras-manutencao/${nivel}`);

  const relatorioPC: RelatorioPC[] = [];

  data.forEach(compra => {
    const indexNewCompra = relatorioPC.findIndex(
      newCompra => newCompra.pc === compra.pc,
    );

    if (indexNewCompra === -1) {
      relatorioPC.push({
        pc: compra.pc,
        valor_total: compra.valor_total,
        status_aprovacao: compra.status_aprovacao,
        itens: [compra],
      });
    } else {
      relatorioPC[indexNewCompra].valor_total += compra.valor_total;
      relatorioPC[indexNewCompra].itens.push(compra);
    }
  });
  return relatorioPC;
};

const RelatorioNivelV2: React.FC = () => {
  const [state, setState] = useState<StateProps>({
    statusAprovacao: 'Todos',
    nivelAprovacao: 'bloqueados',
    relatorioPC: [],
  });

  const options = useMemo<OptionsProps>(() => {
    const statusAprovacoes: string[] = ['Todos', 'Vazios', 'Enviados'];
    state.relatorioPC.forEach(compra => {
      const indexStatusAprovacao = statusAprovacoes.findIndex(
        statusAprovacaoItem => statusAprovacaoItem === compra.status_aprovacao,
      );
      if (indexStatusAprovacao === -1 && compra.status_aprovacao) {
        // const isDate =
        //   new Date(compra.status_aprovacao).toDateString() ===
        //   'Invalid Date';
        statusAprovacoes.push(compra.status_aprovacao);
      }
    });

    return {
      niveisAprovacoes: ['bloqueados', 'nivel-1', 'nivel-2', 'nivel-3', 'erro'],
      statusAprovacoes,
    };
  }, [state.relatorioPC]);

  useEffect(() => {
    getDataApi(state.nivelAprovacao).then(relatorioPC => {
      setState(({ nivelAprovacao, statusAprovacao }) => {
        return {
          statusAprovacao,
          nivelAprovacao,
          relatorioPC,
        };
      });
    });
  }, []);

  const handleSetState = useCallback(
    async (props: SetStateProps) => {
      const { nivelAprovacao, relatorioPC, statusAprovacao } = props;

      const newState: StateProps = {
        statusAprovacao: statusAprovacao || state.statusAprovacao,
        nivelAprovacao: nivelAprovacao || state.nivelAprovacao,
        relatorioPC: relatorioPC || state.relatorioPC,
      };

      if (nivelAprovacao) {
        const newRelatorioPC = await getDataApi(nivelAprovacao);
        newState.relatorioPC = newRelatorioPC;
      }

      setState(newState);
    },
    [state],
  );

  return (
    <Container>
      <Header size="small" selected={`/pcs-bloqueados`} />
      <ContainerTable>
        <div>
          <div>
            <div>
              <span>{"PC's Bloqueados: "}</span>
              <select
                value={state.nivelAprovacao}
                onChange={e => {
                  handleSetState({ nivelAprovacao: e.target.value });
                }}
              >
                {options.niveisAprovacoes.map(niveisAprovacoesItem => (
                  <option
                    key={niveisAprovacoesItem}
                    value={niveisAprovacoesItem}
                  >
                    {niveisAprovacoesItem}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span>{'Status Aprovação: '}</span>
              <select
                value={state.statusAprovacao}
                onChange={e => {
                  handleSetState({ statusAprovacao: e.target.value });
                }}
              >
                {options.statusAprovacoes.map(statusAprovacaoItem => (
                  <option key={statusAprovacaoItem} value={statusAprovacaoItem}>
                    {statusAprovacaoItem}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span>{`Total: ${state.relatorioPC.length} PC's`}</span>
            </div>
          </div>
        </div>
        {state.relatorioPC.length > 0 ? (
          <Table
            relatorioPC={state.relatorioPC}
            setRelatorioPC={relatorioPC => handleSetState({ relatorioPC })}
          />
        ) : (
          <div>Sem PC</div>
        )}
        <div> </div>
      </ContainerTable>
    </Container>
  );
};

export default RelatorioNivelV2;
