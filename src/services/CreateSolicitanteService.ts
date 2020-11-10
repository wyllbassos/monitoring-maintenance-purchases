import { getRepository, Repository } from 'typeorm';

import AppError from '../errors/AppError';

import Solicitantes from '../models/Solicitantes';

interface Request {
  usuario: string;
  area: 'PCM' | 'ALMOX' | 'PRODUCAO' | 'PROJETOS';
}

class CreateCompraManutencaoService {
  public async execute(request: Request): Promise<Solicitantes> {
    const solicitantesRepository = getRepository(Solicitantes);    

    checkFiels(request);

    const solicitante = solicitantesRepository.create(request);

    await solicitantesRepository.save(solicitante);

    return solicitante;
  }
}

function checkFiels(request: Request) {
  if(!request.area){
    throw new AppError(`The area field cannot be null`);
  }
  if(!request.usuario){
    throw new AppError(`The usuario field cannot be null`);
  }
  if(request.area !== null && request.area !== "PCM" && request.area !== "ALMOX" && request.area !== "PRODUCAO" && request.area !== "PROJETOS"){
    throw new AppError(`The sc_eliminado_residuo field must be 'PCM' or 'ALMOX' or 'PRODUCAO' or 'PROJETOS'`);
  }
}

export default CreateCompraManutencaoService;
