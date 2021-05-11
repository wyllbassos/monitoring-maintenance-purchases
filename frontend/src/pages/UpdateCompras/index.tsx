import React, { useCallback, useEffect, useState, useMemo } from 'react';

import makeObjectLinesOfTable from '../RelatorioPCO/components/utils/makeObjectLinesOfTable';
import Table from '../RelatorioPCO/components/Table';
import { textToObject } from '../../utils/textToObject';
import { ComprasFields } from '../../utils/textToObjectFields';
import api from '../../services/api';
import { usePageBase } from '../../hooks/pageBase';

interface UpdateCompras {
  os: string;
  sc: string;
  item: string;
  produto: string;
  descricao: string;
  quantidade: string;
  emissao: string;
  aplicacao: string;
  observacao: string;
  cotacao: string;
  pc: string;
  dt_aprovacao_n1: string;
  dt_aprovacao_n2: string;
  dt_aprovacao_n3: string;
  quantidade_ja_entregue: string;
  ja_emitiu_fornecedor: string;
  valor_total: string;
  status_sc: string;
  status_pc: string;
  previsao_entrega: string;
  pc_eliminado_residuo: string;
  motivo_eliminado_residuo: string;
  sc_eliminado_residuo: string;
  data_pc: string;
  conta_pc: string;
  centro_custo_pc: string;
  solicitante: string;
  requisitante: string;
  fornecedor: string;
  tipo_pagamento: string;
  cod_aprovador_n1: string;
  cod_aprovador_n2: string;
  cod_aprovador_n3: string;
}

const header = [
  'os',
  'sc',
  'item',
  'produto',
  'descricao',
  'quantidade',
  'emissao',
  'aplicacao',
  'observacao',
  'cotacao',
  'pc',
  'dt_aprovacao_n1',
  'dt_aprovacao_n2',
  'dt_aprovacao_n3',
  'quantidade_ja_entregue',
  'ja_emitiu_fornecedor',
  'valor_total',
  'status_sc',
  'status_pc',
  'previsao_entrega',
  'pc_eliminado_residuo',
  'motivo_eliminado_residuo',
  'sc_eliminado_residuo',
  'data_pc',
  'conta_pc',
  'centro_custo_pc',
  'solicitante',
  'requisitante',
  'fornecedor',
  'tipo_pagamento',
  'cod_aprovador_n1',
  'cod_aprovador_n2',
  'cod_aprovador_n3',
];

const keys = [...ComprasFields.map(comprasField => comprasField.key)];

const fieldsFilter = keys.slice(1, keys.length);

const UpdateCompras: React.FC = () => {
  const [menuSelect, setMenuSelect] = useState('inputTextToUpdate');
  const [textInput, setTextInput] = useState('');
  const [comprasUpdate, setComprasUpdate] = useState<UpdateCompras[]>([]);

  const { setSidebarButtons } = usePageBase();

  useEffect(() => {
    setSidebarButtons([
      {
        text: 'Entrada de Dados Para Updatear',
        onClick: () => setMenuSelect('inputTextToUpdate'),
      },
      {
        text: 'Lista Para Updatear',
        onClick: () => setMenuSelect('updateDataList'),
      },
    ]);
  }, [setSidebarButtons]);

  const comprasUpdateToTable = useMemo(
    () =>
      makeObjectLinesOfTable({ keys, keysCurrency: [], list: comprasUpdate }),
    [comprasUpdate],
  );

  const handleConvertToCompra = useCallback((text: string) => {
    const compras = textToObject<UpdateCompras>(text, ComprasFields);
    setTextInput(text);
    setComprasUpdate((compras && compras) || []);
  }, []);

  return (
    <>
      {menuSelect === 'inputTextToUpdate' && (
        <textarea
          style={{ marginTop: '32px', marginBottom: '32px' }}
          value={textInput}
          onChange={({ target: { value } }) => {
            handleConvertToCompra(value);
          }}
        />
      )}

      {menuSelect === 'updateDataList' && (
        <>
          <Updating comprasUpdate={comprasUpdate} />
          {/* {!!comprasInUpdating && (
            <h3>{`Atualizando Processo de Compras: ${updatingTimer}s`}</h3>
          )}
          {!!updatingOk && <h3>{updatingOk}</h3>} */}
          <Table
            style={{ fontSize: '12px' }}
            header={header}
            lines={comprasUpdateToTable}
            fieldsFilter={fieldsFilter}
          />
        </>
      )}
    </>
  );
};

type Updating = {
  comprasUpdate: UpdateCompras[];
};

const Updating: React.FC<Updating> = ({ comprasUpdate }: Updating) => {
  const [comprasInUpdating, setComprasInUpdating] = useState(false);
  const [updatingTimer, setUpdatingTimer] = useState(0);
  const [updatingOk, setUpdatingOk] = useState('');

  useEffect(() => {
    if (comprasInUpdating) {
      setTimeout(() => setUpdatingTimer(updatingTimer + 1), 1000);
    } else if (updatingTimer !== 0) {
      setUpdatingTimer(0);
    }
  }, [updatingTimer, comprasInUpdating]);

  const handleUpdate = useCallback(async () => {
    setComprasInUpdating(true);
    // Airbnb Template não aceita uso de recursividade
    // eslint-disable-next-line no-restricted-syntax
    for await (const compraUpdate of comprasUpdate) {
      await api.post('compras-manutencao', compraUpdate);
    }
    setComprasInUpdating(false);
    setUpdatingOk(`Atualizados ${comprasUpdate.length} processos de compras.`);
    // console.log(newCompras);
  }, [comprasUpdate]);

  return (
    <>
      <button type="button" onClick={handleUpdate}>
        Atualizar Compras
      </button>
      {!!comprasInUpdating && (
        <h3>{`Atualizando Processo de Compras: ${updatingTimer}s`}</h3>
      )}
      {!!updatingOk && <h3>{updatingOk}</h3>}
    </>
  );
};

export default UpdateCompras;
