import AppError from '../../../errors/AppError';

import ComprasManutencao from '../../../models/ComprasManutencao';
import CreateCompraManutencaoService, {
  CreateCompraManutencao,
} from '../CreateCompraManutencaoService';
import parseToCreateComprasManutencao from '../ImportCompraManutencaoService/utils/parseToCreateComprasManutencao';

interface Request {
  comprasManutencao: any[];
}

class AtualizarComprasManutencao {
  async execute({ comprasManutencao }: Request): Promise<ComprasManutencao[]> {
    const createCompraManutencaoService = new CreateCompraManutencaoService();
    const createComprasManutencao: CreateCompraManutencao[] = parseToCreateComprasManutencao(
      comprasManutencao,
    );

    const promises = createComprasManutencao.map(
      async createCompraManutencao => {
        try {
          const compraManutencao = await createCompraManutencaoService.execute({
            ...createCompraManutencao,
          });
          return compraManutencao;
        } catch (error) {
          console.log(error);
          throw new AppError(error);
        }
      },
    );

    const newComprasManutencao = await Promise.all(promises);

    return newComprasManutencao;
    // return [];
  }
}

export default AtualizarComprasManutencao;
