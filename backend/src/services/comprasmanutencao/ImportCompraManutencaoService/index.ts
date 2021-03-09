import path from 'path';
// import excelToJson from 'convert-excel-to-json';
import fs from 'fs';
// import csvParse from 'csv-parse';

import uploadConfig from '../../../config/upload';
import AppError from '../../../errors/AppError';

import ComprasManutencao from '../../../models/ComprasManutencao';

// import csvToCreateCompraManutencao from './utils/csvToCreateCompraManutencao';

import CreateCompraManutencaoService, {
  CreateCompraManutencao,
} from '../CreateCompraManutencaoService';
import loadCSV from '../../../utils/loadCSV';
import parseToCreateComprasManutencao from './utils/parseToCreateComprasManutencao';

interface Request {
  importFilename: string;
  nome_tabela: string;
}

class ImportCompraManutencaoService {
  async execute({
    importFilename,
    nome_tabela,
  }: Request): Promise<ComprasManutencao[]> {
    const createCompraManutencaoService = new CreateCompraManutencaoService();
    const importFilePath = path.join(uploadConfig.directory, importFilename);
    const splitImportFilename = importFilename.split('.');
    const extension = splitImportFilename[splitImportFilename.length - 1];

    if (['csv'].indexOf(extension.toLocaleLowerCase()) < 0) {
      await fs.promises.unlink(importFilePath);

      throw new AppError(`Extenção do arquivo deve ser .csv`);
    }

    const dataCSV = await loadCSV(importFilePath);

    const importCreateComprasManutencao: CreateCompraManutencao[] = parseToCreateComprasManutencao(
      dataCSV,
    );

    const promises = importCreateComprasManutencao.map(
      async createCompraManutencao => {
        try {
          const compraManutencao = await createCompraManutencaoService.execute({
            ...createCompraManutencao,
          });
          return compraManutencao;
        } catch (error) {
          console.log(error);
          // await fs.promises.unlink(importFilePath);
          throw new AppError(error);
        }
      },
    );

    const comprasManutencao = await Promise.all(promises);

    await fs.promises.unlink(importFilePath);

    return comprasManutencao;
    // return [];
  }
}

export default ImportCompraManutencaoService;
