import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';

import makeObjectLinesOfTable from '../RelatorioPCO/components/utils/makeObjectLinesOfTable';
import Table from '../RelatorioPCO/components/Table';
import { textToObject } from '../../utils/textToObject';
import { SSFields } from '../../utils/textToObjectFields';
import Dialog from '../../components/Dialog';
import { usePageBase } from '../../hooks/pageBase';

interface ISS {
  id: number;
  ss: string;
  tag: string;
  nome_bem: string;
  descricao_servico: string | null;
  data: string;
  servico: string;
  centro_trabalho: string;
  solicitante: string;
  os: string | null;
  responsavel: string | null;
  observacao_tratativas: string | null;
  prioridade: 0 | 1 | 2 | null;
  recursos: string | null;
  tempo: number | null;
}

const header = [
  'Editar',
  'SS',
  'TAG',
  'Nome Bem',
  'Descrição Serviço',
  'DT',
  'Serviço',
  'Centro Trabalho',
  'Solicitante',
  'OS',
  'Responsável',
  'Recursos',
  'Tempo',
  'Prioridade',
  'Observação Tratativas',
];

const keys = [
  'edit',
  ...SSFields.map(SSField => SSField.key),
  'recursos',
  'tempo',
  'prioridade',
  'observacao_tratativas',
];

const fieldsFilter = keys.slice(1, keys.length);

const TratativaSSs: React.FC = () => {
  const [menuSelect, setMenuSelect] = useState('sssList');
  const [textInput, setTextInput] = useState('');
  const [sssImport, setSssImport] = useState<ISS[]>([]);
  const [sssBaseDados, setSssBaseDados] = useState<ISS[]>([]);
  const [ssInProcess, setSsInProcess] = useState('');

  const [open, setOpen] = useState(false);
  const [ssTratativa, setSsTratativa] = useState<ISS>();

  const inputRecursos = useRef<HTMLTextAreaElement>(null);
  const inputTempo = useRef<HTMLInputElement>(null);
  const selectPrioridade = useRef<HTMLSelectElement>(null);
  const textObservacao = useRef<HTMLTextAreaElement>(null);

  const { setSidebarButtons, api } = usePageBase();

  const apiSS = { ...api };

  useEffect(() => {
    setSidebarButtons([
      {
        text: 'Lista Base Dados',
        onClick: () => setMenuSelect('sssList'),
      },
      {
        text: 'Entrada de Dados Para Importar',
        onClick: () => setMenuSelect('inputTextToImport'),
      },
      {
        text: 'Lista Para Importar',
        onClick: () => setMenuSelect('importDataList'),
      },
    ]);

    apiSS.get<ISS[]>('sss').then(({ data }) => {
      setSssBaseDados(data);
    });
  }, [setSidebarButtons]);

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
  }, [sssImport]);

  const sssImportToTable = useMemo(
    () => makeObjectLinesOfTable({ keys, keysCurrency: [], list: sssImport }),
    [sssImport],
  );

  const handleConvertToSS = useCallback((text: string) => {
    const SSs = textToObject<ISS>(text, SSFields);
    setTextInput(text);
    setSssImport((SSs && SSs) || []);
  }, []);

  const handleTratativa = useCallback((ss: ISS) => {
    setSsTratativa(ss);
    setOpen(true);
  }, []);

  const sssBaseDadosToTable = useMemo(
    () =>
      makeObjectLinesOfTable({
        keys,
        keysCurrency: [],
        list: sssBaseDados.map(ssBaseDados => ({
          ...ssBaseDados,
          edit: (
            <button type="button" onClick={() => handleTratativa(ssBaseDados)}>
              Tratativa
            </button>
          ),
        })),
      }),
    [sssBaseDados, handleTratativa],
  );

  const handleUpdateSS = useCallback(async () => {
    if (!ssTratativa) {
      return;
    }

    const recursos = inputRecursos.current?.value.toLocaleUpperCase();
    const tempo = Number(inputTempo.current?.value);
    const observacao_tratativas = textObservacao.current?.value.toLocaleUpperCase();
    let prioridade: number | null = Number(selectPrioridade.current?.value);

    if (prioridade !== 0 && prioridade !== 1 && prioridade !== 2) {
      prioridade = null;
    }

    const index = sssBaseDados.findIndex(
      ssBaseDados => ssBaseDados.id === ssTratativa.id,
    );
    const newSsBaseDados = [...sssBaseDados];

    try {
      const response = await apiSS.put<ISS>(`sss/${ssTratativa.id}`, {
        ...ssTratativa,
        recursos,
        tempo,
        observacao_tratativas,
        prioridade,
      });
      newSsBaseDados[index] = response.data;
      setSssBaseDados(newSsBaseDados);
    } catch (e) {
      console.log(e);
    }

    setOpen(false);
  }, [ssTratativa, sssBaseDados]);

  return (
    <>
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

      {menuSelect === 'inputTextToImport' && (
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
          <button type="button" onClick={handleImport}>
            import
          </button>
          {!!ssInProcess && <h3>{`Importando SS: ${ssInProcess}`}</h3>}
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
          title={`SS: ${ssTratativa.ss}`}
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
            <span>Bem</span>
            <textarea
              value={`${ssTratativa.tag} - ${ssTratativa.nome_bem}` || ''}
              readOnly
              style={{ width: '552px', height: '35px', resize: 'none' }}
            />
          </div>
          <div>
            <span>Tipo Serviço</span>
            <textarea
              value={ssTratativa.servico || ''}
              readOnly
              style={{ width: '552px', height: '25px', resize: 'none' }}
            />
          </div>

          <div>
            <span>Descrição Serviço</span>
            <textarea
              value={ssTratativa.descricao_servico || ''}
              readOnly
              style={{ width: '552px', height: '75px', resize: 'none' }}
            />
          </div>

          <div>
            <span>Recursos</span>
            <textarea
              ref={inputRecursos}
              defaultValue={ssTratativa.recursos || ''}
              style={{ width: '552px', height: '50px', resize: 'none' }}
              // onChange={({ target }) => {
              //   setSsTratativa(current =>
              //     current
              //       ? {
              //           ...current,
              //           recursos: target.value,
              //         }
              //       : current,
              //   );
              // }}
            />
          </div>

          <div>
            <span>Tempo</span>

            <input
              ref={inputTempo}
              defaultValue={ssTratativa.tempo || undefined}
              style={{ width: '552px', height: '25px', resize: 'none' }}
              type="number"
            />
          </div>

          <div>
            <span>Prioridade</span>
            <select
              ref={selectPrioridade}
              defaultValue={ssTratativa.prioridade || 2}
              style={{ width: '552px', height: '25px', resize: 'none' }}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
          </div>

          <div>
            <span>Observações da Tratativa</span>
            <textarea
              ref={textObservacao}
              defaultValue={ssTratativa.observacao_tratativas || ''}
              style={{ width: '552px', height: '50px', resize: 'none' }}
            />
          </div>
        </Dialog>
      )}
    </>
  );
};

export default TratativaSSs;
