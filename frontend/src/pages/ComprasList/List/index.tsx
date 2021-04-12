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

import {
  Container,
  Item,
  ContainerDados,
  FieldContainer,
  ContainerDescricoes,
} from './styles';
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
            solicitante,
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
              <ContainerDados>
                <FieldContainer>
                  <InfoTwoTone onClick={() => handleOpenDialog(compra)} />
                  <strong>STATUS:</strong>
                  <span>{status}</span>
                </FieldContainer>

                <FieldContainer>
                  <strong>SC:</strong>
                  <span>{`${sc} - ${item}`}</span>
                </FieldContainer>

                <FieldContainer>
                  <strong>PC:</strong>
                  <span>{pc}</span>
                </FieldContainer>

                <FieldContainer>
                  <strong>QUANTIDADE:</strong>
                  <span>{quantidade}</span>
                </FieldContainer>

                <FieldContainer>
                  <strong>VALOR TOTAL:</strong>
                  <span>{valor_totalFormated}</span>
                </FieldContainer>
              </ContainerDados>

              <ContainerDados>
                <FieldContainer>
                  <strong>DATA SC:</strong>
                  <span>{emissaoFormated}</span>
                </FieldContainer>

                <FieldContainer>
                  <strong>DATA PC:</strong>
                  <span>{data_pcFormated}</span>
                </FieldContainer>

                <FieldContainer>
                  <strong>PREVISÃO DE ENTREGA:</strong>
                  <span>{previsao_entregaFormated}</span>
                </FieldContainer>

                <FieldContainer>
                  <strong>SOLICITANTE:</strong>
                  <span>{solicitante?.usuario}</span>
                </FieldContainer>
              </ContainerDados>

              <ContainerDescricoes>
                <FieldContainer>
                  <strong>PRODUTO:</strong>
                  <span>{`${produto} - ${descricao}`}</span>
                </FieldContainer>

                <FieldContainer>
                  <strong>APLICAÇÃO:</strong>
                  <span>{aplicacao}</span>
                </FieldContainer>

                <FieldContainer>
                  <strong>OBSERVAÇÃO:</strong>
                  <span>{observacao}</span>
                </FieldContainer>
              </ContainerDescricoes>
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
