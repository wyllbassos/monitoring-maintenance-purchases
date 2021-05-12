import { Request, Response } from 'express';

import AtualizarComprasManutencao from '../services/comprasmanutencao/AtualizarComprasManutencao';
import AppError from '../errors/AppError';

class ComprasManutencaoAtualizarController {
  public async create(request: Request, response: Response): Promise<Response> {
    const atualizarComprasManutencao = new AtualizarComprasManutencao();

    const { comprasManutencao, password } = request.body;

    if (password !== 'pcm-fibraplac-2021@') {
      throw new AppError('Senha incorreta');
    }

    if (!comprasManutencao || comprasManutencao.length === undefined) {
      throw new AppError('Array de importação incorreto');
    }

    const compraManutencao = await atualizarComprasManutencao.execute({
      comprasManutencao,
    });

    return response.json(compraManutencao);
  }
}

export default ComprasManutencaoAtualizarController;
