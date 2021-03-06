import React, { useState, useEffect, useCallback } from 'react';

import { Container, ContainerTable, FiltersContainer } from './styles';

import Table from './Table';
import { getRelatorioPCsBloqueados } from './util/getRelatorioPCsBloqueados';
import { usePageBase } from '../../hooks/pageBase';
import { Compra } from '../ComprasList/index';

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
  relatorioPCFiltered: RelatorioPC[];
  options: {
    niveisAprovacoes: string[];
    statusAprovacoes: string[];
  };
}

interface SetStateProps {
  statusAprovacao?: string;
  nivelAprovacao?: string;
  relatorioPC?: RelatorioPC[];
  options?: {
    niveisAprovacoes: string[];
    statusAprovacoes: string[];
  };
}

const PcsBloqueados: React.FC = () => {
  const [state, setState] = useState<StateProps>({
    statusAprovacao: 'Todos',
    nivelAprovacao: 'bloqueados',
    relatorioPC: [],
    relatorioPCFiltered: [],
    options: {
      niveisAprovacoes: ['bloqueados', 'nivel-1', 'nivel-2', 'nivel-3', 'erro'],
      statusAprovacoes: ['Todos', 'Vazios', 'Enviados'],
    },
  });

  const { setSidebarComponent, api } = usePageBase();

  const handleSetState = useCallback(
    async (newState: SetStateProps) => {
      const statusAprovacao = newState.statusAprovacao || state.statusAprovacao;
      const nivelAprovacao = newState.nivelAprovacao || state.nivelAprovacao;

      const relatorioPC: RelatorioPC[] = newState.nivelAprovacao
        ? await getRelatorioPCsBloqueados(nivelAprovacao, api)
        : newState.relatorioPC || state.relatorioPC;
      let relatorioPCFiltered: RelatorioPC[] = relatorioPC;

      if (statusAprovacao === 'Vazios') {
        relatorioPCFiltered = relatorioPC.filter(pc => !pc.status_aprovacao);
      } else if (statusAprovacao !== 'Todos') {
        relatorioPCFiltered = relatorioPC.filter(
          pc => pc.status_aprovacao === statusAprovacao,
        );
      }

      setState(current => ({
        statusAprovacao,
        nivelAprovacao,
        relatorioPC,
        relatorioPCFiltered,
        options: current.options,
      }));
    },
    [state],
  );

  useEffect(() => {
    getRelatorioPCsBloqueados(state.nivelAprovacao, api).then(relatorioPC => {
      const niveisAprovacoes = [
        'bloqueados',
        'nivel-1',
        'nivel-2',
        'nivel-3',
        'erro',
      ];
      const statusAprovacoes = ['Todos', 'Vazios', 'Enviados'];
      relatorioPC.forEach(compra => {
        const indexStatusAprovacao = statusAprovacoes.findIndex(
          statusAprovacaoItem =>
            statusAprovacaoItem === compra.status_aprovacao,
        );
        if (indexStatusAprovacao === -1 && compra.status_aprovacao) {
          // const isDate =
          //   new Date(compra.status_aprovacao).toDateString() ===
          //   'Invalid Date';
          statusAprovacoes.push(compra.status_aprovacao);
        }
      });

      setState(({ nivelAprovacao, statusAprovacao }) => {
        return {
          statusAprovacao,
          nivelAprovacao,
          relatorioPC,
          relatorioPCFiltered: relatorioPC,
          options: {
            niveisAprovacoes,
            statusAprovacoes,
          },
        };
      });
    });
  }, [state.nivelAprovacao]);

  useEffect(() => {
    setSidebarComponent(
      <FiltersContainer>
        <div>
          <div>
            <span>{"PC's Bloqueados: "}</span>
            <select
              value={state.nivelAprovacao}
              onChange={e => {
                handleSetState({ nivelAprovacao: e.target.value });
              }}
            >
              {state.options.niveisAprovacoes.map(niveisAprovacoesItem => (
                <option key={niveisAprovacoesItem} value={niveisAprovacoesItem}>
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
              {state.options.statusAprovacoes.map(statusAprovacaoItem => (
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
      </FiltersContainer>,
    );
  }, [state, setSidebarComponent, handleSetState]);

  return (
    <Container>
      <ContainerTable>
        {state.relatorioPC.length > 0 ? (
          <Table
            relatorioPC={state.relatorioPCFiltered}
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

export default PcsBloqueados;
