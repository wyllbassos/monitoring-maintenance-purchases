import { getRepository, Repository } from 'typeorm';

import AppError from '../../errors/AppError';

import TiposPagamento from '../../models/TiposPagamento';

interface Request {
  codigo: string;
  descricao: string;
}

class CreateTipoPagamentoService {
  private tiposPagamentoRepository = getRepository(TiposPagamento);

  public async execute(request: Request): Promise<TiposPagamento> {
    const { codigo } = request;
    this.checkFiels(request);

    let tipoPagamento = await this.tiposPagamentoRepository.findOne({ where: { codigo } })

    if(tipoPagamento){
      if(tipoPagamento.descricao === request.descricao){
        return tipoPagamento;
      }
      tipoPagamento.descricao = request.descricao;
      
      await this.tiposPagamentoRepository.save(tipoPagamento);
      
      return tipoPagamento
    }

    tipoPagamento = this.tiposPagamentoRepository.create(request);

    try {
      await this.tiposPagamentoRepository.save(tipoPagamento);
    } catch (error) {
      if (error.message.search("duplicate key value violates unique constraint") >= 0 ){
        tipoPagamento = await this.tiposPagamentoRepository.findOne({ where: { codigo } })
        if(tipoPagamento){
          if(tipoPagamento.descricao === request.descricao){
            return tipoPagamento;
          }
      } else {
          throw new AppError("Error to include Solicitante");
        }
      }
    }

    return tipoPagamento;
  }


  private checkFiels = (request: Request) => {
    if(!request.codigo){
      throw new AppError(`The codigo field cannot be null`);
    }
    if(!request.descricao){
      throw new AppError(`The descricao field cannot be null`);
    }
  }
}



export default CreateTipoPagamentoService;
