/* eslint-disable @typescript-eslint/camelcase */
import React, { useCallback, useState } from 'react';
import EditTwoTone from '@material-ui/icons/EditTwoTone';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';

import {
  Container,
  TableStyled,
  Enfase,
  FormControleAprovacao,
} from './styles';

import api from '../../../services/api';
import formatValue from '../../../utils/formatValue';
import Thead from './Thead';
import { RelatorioPC } from '..';
import Dialog from '../../../components/Dialog';

interface Props {
  relatorioPC: RelatorioPC[];
  setRelatorioPC: (RelatorioPC: RelatorioPC[]) => void;
}

interface UpdateStatusAaprovacao {
  pc: string;
  status_aprovacao: string | null;
}

const Table: React.FC<Props> = ({ relatorioPC, setRelatorioPC }: Props) => {
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
      `/compras-manutencao/pc/${pc}`,
      { field: 'status_aprovacao', value: status_aprovacao },
    );
    if (affected) {
      const newRelatorioPC = relatorioPC.map(compra => {
        if (compra.pc === pc) {
          const itens = compra.itens.map(item => {
            return {
              ...item,
              status_aprovacao,
            };
          });

          return {
            ...compra,
            itens,
            status_aprovacao,
          };
        }
        return { ...compra };
      });
      setRelatorioPC(newRelatorioPC);
    }
    handleCloseDialog();
  }, [removeDatePC, handleCloseDialog, setRelatorioPC, relatorioPC]);

  return (
    <Container>
      {relatorioPC.length ? (
        relatorioPC.map(detalhePC => (
          <>
            <TableStyled key={detalhePC.pc}>
              <thead>
                <tr>
                  <th colSpan={5}>
                    <div>
                      <EditTwoTone
                        onClick={() => {
                          handleClickEditStatusAaprovacao({
                            pc: detalhePC.pc,
                            status_aprovacao: detalhePC.status_aprovacao,
                          });
                        }}
                      />
                      <span>PC:</span>
                      <strong>{`${detalhePC.pc} | `}</strong>
                      <span>Total:</span>
                      <strong>{formatValue(detalhePC.valor_total)}</strong>
                      <span>Status Aprovação:</span>
                      <strong>{detalhePC.status_aprovacao}</strong>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Qtd</th>
                  <th>Valor</th>
                  <th>Descrição</th>
                  <th>Aplicação</th>
                  <th>Observação</th>
                </tr>
                {detalhePC.itens.map(item => (
                  <tr key={`${item.sc}-${item.item}`}>
                    <td>{item.quantidade}</td>
                    <td>{formatValue(item.valor_total)}</td>
                    <td>{item.descricao}</td>
                    <td>{item.aplicacao}</td>
                    <td>{item.observacao}</td>
                  </tr>
                ))}
              </tbody>
            </TableStyled>
          </>
        ))
      ) : (
        <></>
      )}
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        title="Controle de Aprovação"
        buttons={[
          { text: 'Cancelar', onClick: handleCloseDialog },
          { text: 'Confirmar', onClick: handleUpdateDataEnvio },
        ]}
      >
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
      </Dialog>
    </Container>
  );
};

export default Table;
