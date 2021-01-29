import { Request, Response } from 'express';
import ImportCompraManutencaoService from '../services/comprasmanutencao/ImportCompraManutencaoService';

class ComprasManutencaoImportController {
  public async create(request: Request, response: Response): Promise<Response> {
    const now = Date.now();
    const { nome_tabela } = request.body;
    const importCompraManutencaoService = new ImportCompraManutencaoService();
    const comprasManutencao = await importCompraManutencaoService.execute({
      importFilename: request.file.filename,
      nome_tabela,
    });
    console.log(`${(Date.now() - now) / 1000}s`);
    return response.json(comprasManutencao);
  }
}

export default ComprasManutencaoImportController;
