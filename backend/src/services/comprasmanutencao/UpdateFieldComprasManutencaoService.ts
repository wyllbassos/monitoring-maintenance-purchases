import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';
import ComprasManutencao from '../../models/ComprasManutencao';

interface Request {
  fieldFilter: string;
  valueFilter: string;
  field: 'status_aprovacao';
  value: string;
}

class UpdateFieldComprasManutencaoService {
  public async execute(request: Request): Promise<number> {
    const { fieldFilter, valueFilter, field, value } = request;

    const comprasManutencaoRepository = getRepository(ComprasManutencao);

    const comprasManutencao = await comprasManutencaoRepository.find({
      [fieldFilter]: valueFilter,
    });

    if (!comprasManutencao.length) {
      throw new AppError('Não localizado Registros');
    }

    try {
      const { affected } = await comprasManutencaoRepository.update(
        { [fieldFilter]: valueFilter },
        { [field]: value },
      );
      return affected || 0;
    } catch (error) {
      throw new AppError('Erro de parametros');
    }
  }
}

export default UpdateFieldComprasManutencaoService;
