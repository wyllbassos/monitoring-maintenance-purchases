import { Router, Request, Response } from 'express';

import CreateCustosManutencaoService, {
  CreateCustoManutencao,
} from '../services/custosManutencao/CreateCustosManutencaoService';

const custosManutencaoRouter = Router();

custosManutencaoRouter.get(
  '/',
  async (request: Request, response: Response) => {
    const { pc, month, year } = request.query as CreateCustoManutencao;

    const createCustosManutencaosService = new CreateCustosManutencaoService();

    const custosManutencao = await createCustosManutencaosService.execute({
      pc,
      month,
      year,
    });

    return response.json(custosManutencao);
  },
);

export default custosManutencaoRouter;
