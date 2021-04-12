/* eslint-disable @typescript-eslint/camelcase */
import React, { useCallback, useState } from 'react';

import PageBase from '../../components/PageBase/index';
import { useMemo } from 'react';
import makeObjectLinesOfTable, {
  IMakeLinesOfTable,
} from '../RelatorioPCO/components/utils/makeObjectLinesOfTable';
import Table from '../RelatorioPCO/components/Table';
import { textToObject } from '../../utils/textToObject';

interface ISS {
  SS: string;
  TAG: string;
  'Nome Bem': string;
  'Descricao Servico': string;
  DT: string;
  Area: string;
  CT: string;
  Solicitante: string;
  OS: string;
  Responsavel: string;
}

const header = [
  'SS',
  'TAG',
  'Nome Bem',
  'Descricao Servico',
  'DT',
  'Area',
  'CT',
  'Solicitante',
  'OS',
  'Responsavel',
];

const keys = header;

const fieldsFilter = header;

const TratativaSSs: React.FC = () => {
  const [menuSelect, setMenuSelect] = useState('');
  const [textInput, setTextInput] = useState('');
  const [sss, setSss] = useState<ISS[]>([]);

  const sidebarButtons = useMemo(() => {
    return [
      {
        text: 'Entrada de Dados',
        onClick: () => setMenuSelect(''),
      },
      {
        text: 'Lista Completa',
        onClick: () => setMenuSelect('dataList'),
      },
    ];
  }, []);

  const lines = useMemo(
    () => makeObjectLinesOfTable({ keys, keysCurrency: [], list: sss }),
    [keys, sss],
  );

  const handleConvertToSS = useCallback((text: string) => {
    const SSs = textToObject<ISS>(
      text,
      keys.map(key => ({ key })),
    );
    setTextInput(text);
    setSss(SSs ? SSs : []);
  }, []);

  return (
    <PageBase route="/relatorio-pco" sidebarButtons={sidebarButtons}>
      {!menuSelect && (
        <textarea
          style={{ marginTop: '32px', marginBottom: '32px' }}
          value={textInput}
          onChange={({ target: { value } }) => {
            handleConvertToSS(value);
          }}
        />
      )}

      {menuSelect === 'dataList' && (
        <Table
          style={{ fontSize: '12px' }}
          header={keys}
          lines={lines}
          fieldsFilter={fieldsFilter}
        />
      )}
    </PageBase>
  );
};

export default TratativaSSs;
