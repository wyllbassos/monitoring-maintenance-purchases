import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import ComprasManutencao from '../models/ComprasManutencao';

class ComprasManutencaoRelatorioController {
  public async show(request: Request, response: Response): Promise<Response> {
    const comprasManutencaoRepository = getRepository(ComprasManutencao);

    const relatorio = request.params.relatorio as string;
    if (relatorio === 'nivel-2' || relatorio === 'nivel-1') {
      let status = '05-PC-BLOQUEADO NVL2';
      if (relatorio === 'nivel-1') {
        status = '04-PC-BLOQUEADO NVL1';
      }
      const [
        comprasManutencao,
      ] = await comprasManutencaoRepository.findAndCount({
        order: {
          status_aprovacao: 'ASC',
          pc: 'ASC',
          valor_total: 'DESC',
        },
        where: { status },
      });
      return response.json(comprasManutencao);
    }
    throw new AppError('Erro Parametros');
  }
}

export default ComprasManutencaoRelatorioController;
