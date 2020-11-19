import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import HistoricoAlteracoes from '../../models/HistoricoAlteracoes';

export interface CreateHistoricoAlteracoes {
  tabela_alterada_id: string;
  tabela: string;
  campo: string;
  valor_antigo: string;
  valor_novo: string;
}

class CreateHistoricoAlteracoesService {
  private historicoAlteracoesRepository = getRepository(HistoricoAlteracoes);

  public async execute(request: CreateHistoricoAlteracoes[]): Promise<HistoricoAlteracoes | HistoricoAlteracoes[]> {
    if (!(request instanceof Array)){
      this.checkFiels(request);

      const historicoAlteracoes = this.historicoAlteracoesRepository.create(request);

      await this.historicoAlteracoesRepository.save(historicoAlteracoes);

      return historicoAlteracoes;
    } else {
      const historicoAlteracoes = request.map(historicoAlteracoes => {
        this.checkFiels(historicoAlteracoes);

        return this.historicoAlteracoesRepository.create(historicoAlteracoes);
      })
      
      await this.historicoAlteracoesRepository.save(historicoAlteracoes);

      return historicoAlteracoes;
    }
  }

  private checkFiels = (request: CreateHistoricoAlteracoes) => {
    if(!request.tabela_alterada_id){
      throw new AppError(`The tabela_alterada_id field cannot be null`);
    }
    if(!request.tabela){
      throw new AppError(`The tabela field cannot be null`);
    }
    if(!request.campo){
      throw new AppError(`The campo field cannot be null`);
    }
  }
}



export default CreateHistoricoAlteracoesService;
