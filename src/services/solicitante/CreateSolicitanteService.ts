import { getRepository, Repository } from 'typeorm';

import AppError from '../../errors/AppError';
import HistoricoAlteracoes from '../../models/HistoricoAlteracoes';

import Solicitantes from '../../models/Solicitantes';
import CreateHistoricoAlteracoesService from '../historicoalteracoes/CreateHistoricoAlteracoesService';

interface Request {
  usuario: string;
  area: 'PCM' | 'ALMOX' | 'PRODUCAO' | 'PROJETOS' | 'OUTROS';
}

class CreateCompraManutencaoService {
  private solicitantesRepository = getRepository(Solicitantes);

  public async execute(request: Request): Promise<Solicitantes> {
    const { usuario } = request;

    this.checkFiels(request);

    let solicitante = await this.solicitantesRepository.findOne({ where: { usuario } })

    if(solicitante){
      if(solicitante.area === request.area){
        return solicitante;
      }
      const valor_antigo = solicitante.area
      const valor_novo = request.area

      solicitante.area = request.area;
      
      await this.solicitantesRepository.save(solicitante); 

      const createHistoricoAlteracoesService = new CreateHistoricoAlteracoesService();
      createHistoricoAlteracoesService.execute({
        tabela_alterada_id: solicitante.id,
        campo: "area",
        tabela: "solicitantes",
        valor_antigo,
        valor_novo,
      })

      return solicitante
    }

    solicitante = this.solicitantesRepository.create(request);

    try {
      await this.solicitantesRepository.save(solicitante);
    } catch (error) {
      if (error.message.search("duplicate key value violates unique constraint") >= 0 ){
        solicitante = await this.solicitantesRepository.findOne({ where: { usuario } })
        if(solicitante){
          if(solicitante.area === request.area){
            return solicitante;
          }
      } else {
          throw new AppError("Error to include Solicitante");
        }
      }
    }

    return solicitante;
  }
  private checkFiels = (request: Request) => {
    if(!request.area){
      throw new AppError(`The area field cannot be null`);
    }
    if(!request.usuario){
      throw new AppError(`The usuario field cannot be null`);
    }
    if(['OUTROS', 'PCM', 'ALMOX', 'PRODUCAO', 'PROJETOS'].indexOf(request.area) < 0) {
      throw new AppError(`The area field must be 'PCM' or 'ALMOX' or 'PRODUCAO' or 'PROJETOS'`);
    }
  }
}



export default CreateCompraManutencaoService;
