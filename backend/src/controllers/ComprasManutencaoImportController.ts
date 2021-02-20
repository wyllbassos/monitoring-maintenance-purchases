import { Request, Response } from 'express';
import AppError from '../errors/AppError';
import ImportCompraManutencaoService from '../services/comprasmanutencao/ImportCompraManutencaoService';

class ComprasManutencaoImportController {
  public async create(request: Request, response: Response): Promise<Response> {
    const now = Date.now();
    const { nome_tabela, password } = request.body;
    const importCompraManutencaoService = new ImportCompraManutencaoService();

    if (password !== 'pcm-fibraplac-2021@') {
      throw new AppError('Senha incorreta"');
    }

    const comprasManutencao = await importCompraManutencaoService.execute({
      importFilename: request.file.filename,
      nome_tabela,
    });

    console.log(`${(Date.now() - now) / 1000}s`);
    return response.json(comprasManutencao);
  }
}

export default ComprasManutencaoImportController;
