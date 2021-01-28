/* eslint-disable @typescript-eslint/camelcase */
import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditTwoTone from '@material-ui/icons/EditTwoTone';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';

import { Container, Enfase, FormControleAprovacao } from './styles';

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
  status_aprovacao: string | null;
}

const Table: React.FC<Props> = ({ compras, setCompras }: Props) => {
  const [open, setOpen] = useState(false);
  const [removeDatePC, setRemoveDatePC] = useState<UpdateStatusAaprovacao>({
    pc: '',
    status_aprovacao: '',
  });

  const handleCloseDialog = useCallback(() => {
    setRemoveDatePC({ pc: '', status_aprovacao: '' });
    setOpen(false);
  }, []);

  const handleClickEditStatusAaprovacao = useCallback(
    (updateStatusAaprovacao: UpdateStatusAaprovacao) => {
      const { pc, status_aprovacao } = updateStatusAaprovacao;
      setRemoveDatePC({ pc, status_aprovacao });
      setOpen(true);
    },
    [],
  );

  const handleUpdateDataEnvio = useCallback(async () => {
    const { pc, status_aprovacao } = removeDatePC;

    const { data: affected } = await api.patch<number>(
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
    handleCloseDialog();
    // console.log(newcompras);
  }, [compras, setCompras, removeDatePC, handleCloseDialog]);

  return (
    <Container>
      <Thead
        header={[
          '',
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
                    <EditTwoTone
                      onClick={() => {
                        handleClickEditStatusAaprovacao({
                          pc,
                          status_aprovacao,
                        });
                      }}
                    />
                  </td>
                  <td rowSpan={comprasPCAtual.length} className="centralizado">
                    {status_aprovacao}
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
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">Controle de Aprovação</DialogTitle>
        <DialogContent>
          <FormControleAprovacao>
            <span>PC:</span>
            <Enfase>{removeDatePC.pc}</Enfase>

            <span>Data Envio: </span>
            <div>
              <input
                type="date"
                value={removeDatePC.status_aprovacao || ''}
                onChange={e => {
                  setRemoveDatePC({
                    pc: removeDatePC.pc,
                    status_aprovacao: e.target.value,
                  });
                }}
              />
              <DeleteForeverTwoToneIcon
                onClick={() => {
                  setRemoveDatePC({
                    pc: removeDatePC.pc,
                    status_aprovacao: '',
                  });
                }}
              />
            </div>

            <span>PCO: </span>
            <input
              type="checkbox"
              value={removeDatePC.status_aprovacao === 'PCO' ? 1 : 0}
              checked={removeDatePC.status_aprovacao === 'PCO'}
              onChange={e => {
                setRemoveDatePC({
                  pc: removeDatePC.pc,
                  status_aprovacao: e.target.checked ? 'PCO' : '',
                });
              }}
            />

            <span>Aprovado: </span>
            <input
              type="checkbox"
              value={removeDatePC.status_aprovacao === 'APROVADO' ? 1 : 0}
              checked={removeDatePC.status_aprovacao === 'APROVADO'}
              onChange={e => {
                setRemoveDatePC({
                  pc: removeDatePC.pc,
                  status_aprovacao: e.target.checked ? `APROVADO` : '',
                });
              }}
            />

            <span>Eliminar: </span>
            <input
              type="checkbox"
              value={removeDatePC.status_aprovacao === 'ELIMINAR' ? 1 : 0}
              checked={removeDatePC.status_aprovacao === 'ELIMINAR'}
              onChange={e => {
                setRemoveDatePC({
                  pc: removeDatePC.pc,
                  status_aprovacao: e.target.checked ? `ELIMINAR` : '',
                });
              }}
            />
          </FormControleAprovacao>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleUpdateDataEnvio} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Table;
