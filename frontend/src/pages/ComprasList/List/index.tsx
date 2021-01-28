/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

import formatValue from '../../../utils/formatValue';

import { Container, Item, ContainerDados, ContainerDescricoes } from './styles';

import { Compra } from '../index';

interface ListProps {
  compras: Compra[];
}

const List: React.FC<ListProps> = (props: ListProps) => {
  const { compras } = props;

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
          const data_pcFormated = !!data_pc
            ? new Date(data_pc).toLocaleDateString()
            : '';
          const previsao_entregaFormated = !!previsao_entrega
            ? new Date(previsao_entrega).toLocaleDateString()
            : '';
          const valor_totalFormated =
            valor_total > 0 ? formatValue(valor_total) : '';
          return (
            <Item
              key={`${sc} - ${item}`}
              onClick={e => {
                console.log(compra);
              }}
            >
              <section>
                <ContainerDados>
                  <span>{`SC: ${sc} - ${item}`}</span>
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
      </Container>
    </>
  );
};

export default List;
