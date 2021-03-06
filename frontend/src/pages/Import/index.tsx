/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import { usePageBase } from '../../hooks/pageBase';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [timeLoading, setTimeLoading] = useState(0);
  const [password, setPassword] = useState('');

  const { api } = usePageBase();

  useEffect(() => {
    if (loading) setTimeout(() => setTimeLoading(timeLoading + 1), 1000);
    else if (timeLoading !== 0) setTimeout(() => setTimeLoading(0), 1000);
  }, [timeLoading, loading]);

  async function handleUpload(): Promise<void> {
    try {
      const data = new FormData();
      data.append('file', uploadedFiles[0].file);
      data.append('nome_tabela', 'Listagem do Browse');
      data.append('password', password);
      setLoading(true);
      await api.post('/compras-manutencao/import', data);
    } catch (err) {
      console.log(JSON.stringify(err));
      window.alert('Erro no envio do arquivo');
    }
    setLoading(false);
    setTimeLoading(0);
  }

  function submitFile(files: File[]): void {
    const submitUploadedFiles = files.map(file => {
      const { name, size } = file;
      const readableSize = filesize(size);
      return { file, name, readableSize };
    });
    setUploadedFiles(submitUploadedFiles);
  }

  return (
    <>
      <Header />
      <Container>
        <Title>
          {!loading ? 'Importar uma transação' : `Carregando: ${timeLoading}s`}
        </Title>
        {!loading ? (
          <>
            <ImportFileContainer>
              <Upload onUpload={submitFile} />
              {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

              <Footer>
                <p>
                  <img src={alert} alt="Alert" />
                  Permitido apenas arquivos CSV
                </p>
                <button onClick={handleUpload} type="button">
                  Enviar
                </button>
              </Footer>
            </ImportFileContainer>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default Import;
