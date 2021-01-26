import { Between, getRepository, FindConditions } from 'typeorm';
import { startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import AppError from '../../../errors/AppError';
import ComprasManutencao from '../../../models/ComprasManutencao';

export interface CreateCustoManutencao {
  pc?: string;
  year?: number;
  month?: number;
  entregue?: boolean;
}

export interface CustosManutencao {
  total: number;
  bloqueado: {
    total: number;
  };
  liberado: {
    entregue: number;
    pendente: number;
    total: number;
  };
}

class CreateCustoManutencaoService {
  public async execute(
    request: CreateCustoManutencao,
  ): Promise<CustosManutencao> {
    const { pc, month, year } = request;
    const comprasManutencaoRepository = getRepository(ComprasManutencao);
    const custosManutencao: CustosManutencao = {
      total: 0,
      bloqueado: {
        total: 0,
      },
      liberado: {
        entregue: 0,
        pendente: 0,
        total: 0,
      },
    };
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
    });

    if (comprasManutencao.length) {
      comprasManutencao.forEach(compraManutencao => {
        const { valor_total, status, status_pc } = compraManutencao;
        if (status_pc === 'L') {
          custosManutencao.liberado.total += valor_total;
          if (status === '10-ENTREGUE') {
            custosManutencao.liberado.entregue += valor_total;
          } else {
            custosManutencao.liberado.pendente += valor_total;
          }
        } else if (status_pc === 'B') {
          custosManutencao.bloqueado.total += valor_total;
        }
      });
    }
    custosManutencao.total =
      custosManutencao.liberado.total + custosManutencao.bloqueado.total;
    return custosManutencao;
  }
}

export default CreateCustoManutencaoService;
