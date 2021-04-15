/* eslint-disable @typescript-eslint/camelcase */
import React, { useCallback, useEffect, useState } from 'react';

import PageBase from '../../components/PageBase/index';
import { useMemo } from 'react';
import makeObjectLinesOfTable from '../RelatorioPCO/components/utils/makeObjectLinesOfTable';
import Table from '../RelatorioPCO/components/Table';
import { textToObject } from '../../utils/textToObject';
import { SSFields } from './../../utils/textToObjectFields';
import { apiSS } from '../../services/api';
import Dialog from '../../components/Dialog';

interface ISS {
  id: number;
  ss: string;
  tag: string;
  nome_bem: string;
  descricao_servico: string;
  data: string;
  servico: string;
  centro_trabalho: string;
  solicitante: string;
  os: string;
  responsavel: string;
  observacao_tratativas: string;
}

const header = [
  'Editar',
  'SS',
  'TAG',
  'Nome Bem',
  'Descricao Servico',
  'DT',
  'Serviço',
  'Centro Trabalho',
  'Solicitante',
  'OS',
  'Responsavel',
  'Observacao Tratativas',
];

const keys = [
  'edit',
  ...SSFields.map(SSField => SSField.key),
  'observacao_tratativas',
];

const fieldsFilter = keys;

const TratativaSSs: React.FC = () => {
  const [menuSelect, setMenuSelect] = useState('sssList');
  const [textInput, setTextInput] = useState('');
  const [sssImport, setSssImport] = useState<ISS[]>([]);
  const [sssBaseDados, setSssBaseDados] = useState<ISS[]>([]);
  const [ssInProcess, setSsInProcess] = useState('');

  const [open, setOpen] = useState(false);
  const [ssTratativa, setSsTratativa] = useState<ISS>();

  useEffect(() => {
    apiSS.get<ISS[]>('sss').then(({ data }) => {
      setSssBaseDados(data);
    });
  }, []);

  const handleImport = useCallback(async () => {
    if (sssImport.length) {
      const promisses = sssImport.map(async ssImport => {
        try {
          const [day, month, year] = ssImport.data.split('/');
          const data = `${year}-${month}-${day}`;
          const ss = await apiSS.post<ISS>('sss', { ...ssImport, data });

          setSsInProcess(ss.data.ss);
        } catch (e) {
          console.log(JSON.stringify(e));
        }
      });
      await Promise.all(promisses);
      const sss = (await apiSS.get<ISS[]>('sss')).data;
      setSssBaseDados(sss);
      setSsInProcess('');
    }
  }, [apiSS, sssImport]);

  const sidebarButtons = useMemo(() => {
    return [
      {
        text: 'Lista Base Dados',
        onClick: () => setMenuSelect('sssList'),
      },
      {
        text: 'Entrada de Dados Para Importar',
        onClick: () => setMenuSelect('imputTextToImport'),
      },
      {
        text: 'Lista Para Importar',
        onClick: () => setMenuSelect('importDataList'),
      },
    ];
  }, []);

  const sssImportToTable = useMemo(
    () => makeObjectLinesOfTable({ keys, keysCurrency: [], list: sssImport }),
    [keys, sssImport],
  );

  const sssBaseDadosToTable = useMemo(
    () =>
      makeObjectLinesOfTable({
        keys,
        keysCurrency: [],
        list: sssBaseDados.map(ssBaseDados => ({
          ...ssBaseDados,
          edit: (
            <button onClick={() => handleTratativa(ssBaseDados)}>
              Tratativa
            </button>
          ),
        })),
      }),
    [keys, sssBaseDados],
  );

  const handleConvertToSS = useCallback((text: string) => {
    const SSs = textToObject<ISS>(text, SSFields);
    setTextInput(text);
    setSssImport(SSs ? SSs : []);
  }, []);

  const handleTratativa = useCallback((ss: ISS) => {
    setSsTratativa(ss);
    setOpen(true);
  }, []);

  const handleUpdateSS = useCallback(async () => {
    console.log(ssTratativa);
    if (!ssTratativa) {
      return;
    }

    const index = sssBaseDados.findIndex(
      ssBaseDados => ssBaseDados.id === ssTratativa.id,
    );
    const newSsBaseDados = [...sssBaseDados];

    try {
      const response = await apiSS.put<ISS>(
        'sss/' + ssTratativa.id,
        ssTratativa,
      );
      newSsBaseDados[index] = response.data;
      setSssBaseDados(newSsBaseDados);
    } catch (e) {
      console.log(e);
    }

    setOpen(false);
  }, [ssTratativa, sssBaseDados]);

  return (
    <PageBase route="/relatorio-pco" sidebarButtons={sidebarButtons}>
      {menuSelect === 'sssList' && (
        <>
          <Table
            style={{ fontSize: '12px' }}
            header={header}
            lines={sssBaseDadosToTable}
            fieldsFilter={fieldsFilter}
          />
        </>
      )}

      {menuSelect === 'imputTextToImport' && (
        <textarea
          style={{ marginTop: '32px', marginBottom: '32px' }}
          value={textInput}
          onChange={({ target: { value } }) => {
            handleConvertToSS(value);
          }}
        />
      )}

      {menuSelect === 'importDataList' && (
        <>
          <button onClick={handleImport}>import</button>
          {!!ssInProcess && <h3>Importando SS: {ssInProcess}</h3>}
          <Table
            style={{ fontSize: '12px' }}
            header={header}
            lines={sssImportToTable}
            fieldsFilter={fieldsFilter}
          />
        </>
      )}

      {ssTratativa && (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title={'SS: ' + ssTratativa.ss}
          buttons={[
            {
              text: 'Cancelar',
              onClick: () => setOpen(false),
              color: 'secondary',
            },
            {
              text: 'Confirmar',
              onClick: handleUpdateSS,
              color: 'primary',
            },
          ]}
        >
          <div>
            <label>{`Descricao Bem: `}</label>
            <span>{ssTratativa.nome_bem}</span>
          </div>

          <div>
            <label>{`Descrição Serviço: `}</label>
            <span>{ssTratativa.descricao_servico}</span>
          </div>

          <div>
            <label>Observações da Tratativa</label>
            <textarea
              value={ssTratativa.observacao_tratativas}
              onChange={({ target }) => {
                setSsTratativa(current =>
                  current
                    ? {
                        ...current,
                        observacao_tratativas: target.value,
                      }
                    : current,
                );
              }}
              style={{ width: '552px', height: '100px' }}
            />
          </div>
        </Dialog>
      )}
    </PageBase>
  );
};

export default TratativaSSs;
