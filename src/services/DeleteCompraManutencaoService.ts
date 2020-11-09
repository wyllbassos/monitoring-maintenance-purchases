// import AppError from '../errors/AppError';
import { getRepository, Repository } from 'typeorm';

import AppError from '../errors/AppError';

import ComprasManutencao from '../models/ComprasManutencao';

class DeleteCompraManutencaoService {
  public async execute({ id }:{ id: string }): Promise<void> {
    const comprasManutencaoRepository = getRepository(ComprasManutencao);    

    const deletedCompraManutencao = await comprasManutencaoRepository.findOne(id);

    if(!deletedCompraManutencao){
      throw new AppError('Id invalid.');
    }

    const deleted = (await comprasManutencaoRepository.delete(id)).affected;

    if(deleted === 0){
      throw new AppError(`Erro to delete id: ${id}`);
    }
  }
}

export default DeleteCompraManutencaoService;
