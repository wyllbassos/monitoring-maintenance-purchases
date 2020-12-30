/* eslint-disable @typescript-eslint/camelcase */
import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Container, Enfase } from './styles';

import api from '../../../services/api';
import { Compra } from '../../ComprasList/index';
import formatValue from '../../../utils/formatValue';
import Thead from './Thead';

interface Props {
  compras: Compra[];
  setCompras: React.Dispatch<React.SetStateAction<Compra[]>>;
}

interface UpdateStatusAaprovacao {
  pc: string;
  status_aprovacao: string;
}

const Table: React.FC<Props> = ({ compras, setCompras }: Props) => {
  const [open, setOpen] = useState(false);
  const [removeDatePC, setRemoveDatePC] = useState<UpdateStatusAaprovacao>({
    pc: '',
    status_aprovacao: '',
  });

  const handleClickDeleteDataEnvioPC = useCallback(
    ({ pc, status_aprovacao }: UpdateStatusAaprovacao) => {
      setRemoveDatePC({ pc, status_aprovacao });
      setOpen(true);
    },
    [],
  );

  const handleCloseDialog = useCallback(() => {
    setRemoveDatePC({ pc: '', status_aprovacao: '' });
    setOpen(false);
  }, []);

  const handleDeleteDataEnvioPC = useCallback(async () => {
    const { pc } = removeDatePC;
    const affected = await api.patch<number>(
      `/compras-manutencao/update-status-aprovacao/${pc}`,
      { status_aprovacao: '' },
    );
    if (affected) {
      const newcompras = compras.map(compra => {
        if (compra.pc === pc) {
          return {
            ...compra,
            status_aprovacao: '',
          };
        }
        return compra;
      });
      setCompras(newcompras);
    }
    handleCloseDialog();
    // console.log(newcompras);
  }, [compras, setCompras, removeDatePC]);

  const handleChangeDataEnvioPC = useCallback(
    async ({ pc, status_aprovacao }: UpdateStatusAaprovacao) => {
      const affected = await api.patch<number>(
        `/compras-manutencao/update-status-aprovacao/${pc}`,
        { status_aprovacao },
      );
      if (affected) {
        const newcompras = compras.map(compra => {
          if (compra.pc === pc) {
            return {
              ...compra,
              status_aprovacao,
            };
          }
          return compra;
        });
        setCompras(newcompras);
      }
      // console.log(newcompras);
    },
    [compras, setCompras],
  );

  return (
    <Container>
      <Thead
        header={[
          'Data Envio / PCO',
          'PC / Total',
          'Aplicação',
          'Observação',
          'Descrição',
          'Qtd.',
          'Valor Item',
        ]}
      />
      <tbody>
        {compras.map((compra, index) => {
          // console.log(compra);
          const {
            pc,
            status_aprovacao,
            aplicacao,
            observacao,
            descricao,
            quantidade,
            valor_total,
          } = compra;
          const comprasPCAtual = compras.filter(
            compraFilter => compraFilter.pc === pc,
          );
          const { valor_total: total_pc } = comprasPCAtual.reduce(
            (total, compraReduce) => {
              const atual = Number(compraReduce.valor_total);
              const acumulado = Number(total.valor_total);
              return { ...total, valor_total: acumulado + atual };
            },
          );
          // if (compra.pc === '793372') console.log(compra);
          const imprimiPC = index === 0 || compras[index - 1].pc !== pc;

          return (
            <tr key={`${compra.sc}-${compra.item}`}>
              {imprimiPC ? (
                <>
                  <td rowSpan={comprasPCAtual.length} className="centralizado">
                    {status_aprovacao ? (
                      <div>
                        <button
                          type="button"
                          onClick={e => {
                            handleClickDeleteDataEnvioPC({
                              pc,
                              status_aprovacao,
                            });
                          }}
                        >
                          {status_aprovacao}
                        </button>
                      </div>
                    ) : (
                      <>
                        <input
                          id={`input_pc_${pc}`}
                          type="date"
                          value={status_aprovacao || ''}
                          onChange={e => {
                            handleChangeDataEnvioPC({
                              pc,
                              status_aprovacao: e.target.value,
                            });
                          }}
                        />
                      </>
                    )}
                  </td>
                  <td rowSpan={comprasPCAtual.length}>
                    <div className="centralizado-column">
                      <div className="no-size">{pc}</div>
                      <div className="no-size">{formatValue(total_pc)}</div>
                    </div>
                  </td>
                </>
              ) : (
                <></>
              )}
              <td>{aplicacao}</td>
              <td>{observacao}</td>
              <td>{descricao}</td>
              <td>{quantidade}</td>
              <td>{formatValue(valor_total)}</td>
            </tr>
          );
        })}
      </tbody>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Exclusão de Data de Envio
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja remover a data de envio
            <Enfase>{removeDatePC.status_aprovacao}</Enfase>
            <span>do PC:</span>
            <Enfase>{removeDatePC.pc}</Enfase>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Não
          </Button>
          <Button onClick={handleDeleteDataEnvioPC} color="primary">
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Table;
