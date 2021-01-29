/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

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
  const history = useHistory();

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
      window.alert('Erro no envio do arquivo');
    }
    setLoading(false);
    setTimeLoading(0);
    // for (const uploadedFile of uploadedFiles) {
    //   try {
    //     const data = new FormData();
    //     data.append('file', uploadedFile.file);
    //     data.append('nome_tabela', 'Listagem do Browse');
    //     console.log(data);
    //     setLoading(true);
    //     api.post('/compras-manutencao/import', data).then(response => {
    //       setLoading(false);
    //       setTimeLoading(0);
    //     });
    //   } catch (err) {
    //     console.log(err.response.error);
    //   }
    // }
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
      <Header size="small" selected="/import" />
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
