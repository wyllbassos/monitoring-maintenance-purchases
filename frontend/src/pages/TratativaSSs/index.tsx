/* eslint-disable @typescript-eslint/camelcase */
import React, { useCallback, useEffect, useState } from 'react';

import PageBase from '../../components/PageBase/index';
import { useMemo } from 'react';
import makeObjectLinesOfTable from '../RelatorioPCO/components/utils/makeObjectLinesOfTable';
import Table from '../RelatorioPCO/components/Table';
import { textToObject } from '../../utils/textToObject';
import { SSFields } from './../../utils/textToObjectFields';
import { apiSS } from '../../services/api';

interface ISS {
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
}

const header = [
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
];

const keys = [...SSFields.map(SSField => SSField.key)];

const fieldsFilter = keys;

const TratativaSSs: React.FC = () => {
  const [menuSelect, setMenuSelect] = useState('sssList');
  const [textInput, setTextInput] = useState('');
  const [sssImport, setSssImport] = useState<ISS[]>([]);
  const [sssBaseDados, setSssBaseDados] = useState<ISS[]>([]);
  const [ssInProcess, setSsInProcess] = useState('');

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
      makeObjectLinesOfTable({ keys, keysCurrency: [], list: sssBaseDados }),
    [keys, sssBaseDados],
  );

  const handleConvertToSS = useCallback((text: string) => {
    const SSs = textToObject<ISS>(text, SSFields);
    setTextInput(text);
    setSssImport(SSs ? SSs : []);
  }, []);

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
    </PageBase>
  );
};

export default TratativaSSs;
