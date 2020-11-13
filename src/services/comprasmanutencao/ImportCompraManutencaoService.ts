import path from 'path';
import excelToJson from 'convert-excel-to-json';
import fs from 'fs';
import csvParse from 'csv-parse';

import uploadConfig from '../../config/upload';
import AppError from '../../errors/AppError';

import ComprasManutencao from '../../models/ComprasManutencao';

import CreateCompraManutencaoService, { CreateCompraManutencao } from './CreateCompraManutencaoService';

interface Request {
  importFilename: string;
  nome_tabela: string;
}

class ImportCompraManutencaoService {
  async execute({ importFilename, nome_tabela }: Request): Promise<ComprasManutencao[]> {
    const createCompraManutencaoService = new CreateCompraManutencaoService();

    const importFilePath = path.join(uploadConfig.directory, importFilename);
    
    let result: {[key:string]:any} = []


    const splitImportFilename = importFilename.split('.');
    const extension = splitImportFilename[splitImportFilename.length -1];
    if(['xls', 'xlsx', 'xml'].indexOf(extension.toLocaleLowerCase()) < 0){
      await fs.promises.unlink(importFilePath);
      throw new AppError(`Extenção do arquivo deve ser .xls .xlsx .xml`);
    }

    try {
      result = excelToJson({
        source: fs.readFileSync(importFilePath), // fs.readFileSync return a Buffer
        columnToKey: {
            '*': '{{columnHeader}}'
        }
      })
    } catch (error) {
        await fs.promises.unlink(importFilePath);
        throw new AppError('Erro Conversão Excel Para Json');
    }
    
    if(!result[nome_tabela]){
      throw new AppError(`Tabela ${nome_tabela} não existe no arquivo Excel`);
    }

    const importCreateComprasManutencao:CreateCompraManutencao[] = result[nome_tabela];

    const promises = importCreateComprasManutencao.map(createCompraManutencao => {
      console.log(createCompraManutencao);
      return createCompraManutencaoService.execute(createCompraManutencao)
    })

    const comprasManutencao = Promise.all(promises);

    //const campos:string[] = Object.keys(result[nome_tabela][0]);

    // campos.forEach(element => {
    //   console.log(element)
    //   if(element in (new ComprasManutencao()))
    //     console.log(element)
    // })

    //const comprasManutencao: ComprasManutencao[] = result[nome_tabela];
    
    //createCompraManutencaoService.execute({})

    return comprasManutencao;
  }
}

export default ImportCompraManutencaoService;
