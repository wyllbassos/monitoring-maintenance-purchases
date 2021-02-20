import { Between, getRepository, FindConditions } from 'typeorm';
import { startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import AppError from '../../../errors/AppError';
import ComprasManutencao from '../../../models/ComprasManutencao';
import { makeCustosManutencao, CustosManutencao } from './makeCustosManutencao';

export interface CreateCustoManutencao {
  pc?: string;
  year?: number;
  month?: number;
  entregue?: boolean;
}

class CreateCustoManutencaoService {
  public async execute(
    request: CreateCustoManutencao,
  ): Promise<CustosManutencao> {
    const { pc, month, year } = request;
    const comprasManutencaoRepository = getRepository(ComprasManutencao);

    const where: FindConditions<ComprasManutencao> = {
      pc_eliminado_residuo: '',
    };

    if (!pc && !month && !year) {
      throw new AppError('Some parameter must be sent');
    }

    if (pc) {
      where.pc = pc;
    }

    if (month && year) {
      const dateBaseSeach = new Date(year, month - 1);
      const startMonth = startOfMonth(dateBaseSeach);
      const endMonth = endOfMonth(dateBaseSeach);
      where.data_pc = Between(startMonth, endMonth);
    } else if (year) {
      const dateBaseSeach = new Date(year, 0, 1);
      const startYear = startOfYear(dateBaseSeach);
      const endYear = endOfYear(dateBaseSeach);
      where.data_pc = Between(startYear, endYear);
    }

    const comprasManutencao = await comprasManutencaoRepository.find({
      where,
      relations: ['tipo_pagamento', 'solicitante'],
    });

    if (comprasManutencao.length) {
      return makeCustosManutencao(comprasManutencao);
    }
    return makeCustosManutencao([]);
  }
}

export default CreateCustoManutencaoService;
