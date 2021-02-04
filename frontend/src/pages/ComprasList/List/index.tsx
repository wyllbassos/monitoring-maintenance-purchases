/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useCallback } from 'react';
import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { InfoTwoTone } from '@material-ui/icons';

import { Container, Item, ContainerDados, ContainerDescricoes } from './styles';
import { Compra } from '../index';

import formatValue from '../../../utils/formatValue';

interface ListProps {
  compras: Compra[];
}

const List: React.FC<ListProps> = (props: ListProps) => {
  const { compras } = props;
  const [open, setOpen] = useState(false);
  const [compraDialog, setCompraDialog] = useState<Compra | undefined>();
  const handleCloseDialog = useCallback(() => {
    setOpen(false);
    setCompraDialog(undefined);
  }, []);

  const handleOpenDialog = useCallback((compra: Compra) => {
    setCompraDialog(compra);
    setOpen(true);
  }, []);

  return (
    <>
      <Container>
        {compras.map(compra => {
          const {
            status,
            sc,
            item,
            produto,
            emissao,
            quantidade,
            descricao,
            pc,
            aplicacao,
            observacao,
            previsao_entrega,
            valor_total,
            data_pc,
          } = compra;
          const emissaoFormated = new Date(emissao).toLocaleDateString();
          const data_pcFormated = data_pc
            ? new Date(data_pc).toLocaleDateString()
            : '';
          const previsao_entregaFormated = previsao_entrega
            ? new Date(previsao_entrega).toLocaleDateString()
            : '';
          const valor_totalFormated =
            valor_total > 0 ? formatValue(valor_total) : '';
          return (
            <Item key={`${sc} - ${item}`}>
              <section>
                <ContainerDados>
                  <span>
                    <InfoTwoTone onClick={() => handleOpenDialog(compra)} />
                    {`SC: ${sc} - ${item}`}
                  </span>
                  <span>{`STATUS: ${status}`}</span>
                  <span>{`PC: ${pc}`}</span>
                  <span>{`QUANTIDADE: ${quantidade}`}</span>
                  <span>{`DATA SC: ${emissaoFormated}`}</span>
                  <span>{`VALOR TOTAL: ${valor_totalFormated}`}</span>
                  <span>{`DATA PC: ${data_pcFormated}`}</span>
                  <span>{`PREVISÃO DE ENTREGA: ${previsao_entregaFormated}`}</span>
                </ContainerDados>
              </section>
              <section>
                <ContainerDescricoes>
                  <span>{`PRODUTO: ${produto} - ${descricao}`}</span>
                  <span>{`APLICAÇÃO: ${aplicacao}`}</span>
                  <span>{`OBSERVAÇÃO: ${observacao}`}</span>
                </ContainerDescricoes>
              </section>
            </Item>
          );
        })}
        <Dialog
          open={open}
          onClose={handleCloseDialog}
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
        >
          <DialogTitle id="dialog-title">
            {compraDialog ? `${compraDialog.sc} - ${compraDialog.status}` : ''}
          </DialogTitle>
          <DialogContent>
            <div>
              <span>Conta:</span>
              <strong>{compraDialog?.conta_pc}</strong>
            </div>
            <div>
              <span>Centro Custo:</span>
              <strong>{compraDialog?.centro_custo_pc}</strong>
            </div>
            <div>
              <span>Periodo:</span>
              <strong>{compraDialog?.data_pc}</strong>
            </div>
            <div>
              <span>Solicitante:</span>
              <strong>{compraDialog?.solicitante.usuario}</strong>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default List;
