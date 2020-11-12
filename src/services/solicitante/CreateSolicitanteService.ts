import { getRepository, Repository } from 'typeorm';

import AppError from '../../errors/AppError';

import Solicitantes from '../../models/Solicitantes';

interface Request {
  usuario: string;
  area: 'PCM' | 'ALMOX' | 'PRODUCAO' | 'PROJETOS' | 'OUTROS';
}

class CreateCompraManutencaoService {
  private solicitantesRepository = getRepository(Solicitantes);

  public async execute(request: Request): Promise<Solicitantes> {
    this.checkFiels(request);

    let solicitante = await this.solicitantesRepository.findOne({
      where: {
        usuario: request.usuario
      }
    })

    if(solicitante){
      if(solicitante.area === request.area){
        return solicitante;
      }
      solicitante.area = request.area;
      
      await this.solicitantesRepository.save(solicitante);
      
      return solicitante
    }

    solicitante = this.solicitantesRepository.create(request);

    await this.solicitantesRepository.save(solicitante);

    return solicitante;
  }
  private checkFiels = (request: Request) => {
    if(!request.area){
      throw new AppError(`The area field cannot be null`);
    }
    if(!request.usuario){
      throw new AppError(`The usuario field cannot be null`);
    }
    if(request.area !== null && request.area !== "PCM" && request.area !== "ALMOX" && request.area !== "PRODUCAO" && request.area !== "PROJETOS"){
      throw new AppError(`The area field must be 'PCM' or 'ALMOX' or 'PRODUCAO' or 'PROJETOS'`);
    }
  }
}



export default CreateCompraManutencaoService;
