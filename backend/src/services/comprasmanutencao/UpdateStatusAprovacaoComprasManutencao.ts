import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';
import ComprasManutencao from '../../models/ComprasManutencao';

import TiposPagamento from '../../models/TiposPagamento';

interface Request {
  pc: string;
  status_aprovacao: string | null;
}

class UpdateStatusAprovacaoComprasManutencao {
  private tiposPagamentoRepository = getRepository(TiposPagamento);

  public async execute(request: Request): Promise<number> {
    const { status_aprovacao, pc } = request;

    const comprasManutencaoRepository = getRepository(ComprasManutencao);

    const comprasManutencao = await comprasManutencaoRepository.find({ pc });

    if (!comprasManutencao.length) {
      throw new AppError('Pedido de Compra Nao Localizado');
    }

    // if (!status_aprovacao) {
    //   throw new AppError('Status de Aprovação Invalido');
    // }

    const { affected } = await comprasManutencaoRepository.update(
      { pc },
      { status_aprovacao: status_aprovacao || undefined },
    );

    // comprasManutencao.forEach(compraManutencao => {
    //   compraManutencao.status_aprovacao = status_aprovacao;
    // })

    return affected || 0;
  }
}

export default UpdateStatusAprovacaoComprasManutencao;
