import { getRepository } from 'typeorm';

import ComprasManutencao from '../../../models/ComprasManutencao';
import Solicitantes from '../../../models/Solicitantes';
import TiposPagamento from '../../../models/TiposPagamento';

import checkFiels from './utils/checkFiels';
import updateCompraManutencao from './utils/updateCompraManutencao';

import CreateSolicitanteService from '../../solicitante/CreateSolicitanteService';
// import CreateTipoPagamentoService from '../../tipopagamento/CreateTipoPagamentoService';

export interface CreateCompraManutencao {
  sc: string;
  item: string;
  produto: string;
  descricao: string;
  quantidade: number;
  emissao: Date;
  aplicacao: string;
  observacao: string;
  cotacao: string;
  pc: string;
  dt_aprovacao_n1: Date | null | '';
  dt_aprovacao_n2: Date | null | '';
  dt_aprovacao_n3: Date | null | '';
  quantidade_ja_entregue: number;
  ja_emitiu_fornecedor: string;
  valor_total: number;
  status_sc: 'B' | 'L' | 'R';
  status_pc: string;
  previsao_entrega: Date | null | '';
  pc_eliminado_residuo: string;
  motivo_eliminado_residuo: string;
  sc_eliminado_residuo: string;
  data_pc: Date | null | '';
  conta_pc: string;
  centro_custo_pc: string;
  tipo_pagamento: string;
  solicitante: string;
  requisitante: string;
  fornecedor: string;
  status: string;
  cod_aprovador_n1?: string;
  cod_aprovador_n2?: string;
  cod_aprovador_n3?: string;
}

export function getStatus(compraManutencao: CreateCompraManutencao): string {
  const {
    sc_eliminado_residuo,
    status_pc,
    pc_eliminado_residuo,
    status_sc,
    pc,
    cotacao,
    quantidade_ja_entregue,
    dt_aprovacao_n1,
    dt_aprovacao_n2,
    dt_aprovacao_n3,
    tipo_pagamento,
    quantidade,
  } = compraManutencao;
  /**
   * =
    *  SE(E([@[SC Elim.Res.]] = "S"; [@[Sts PC]] = ""); "10-SC ELI.RES.";
    *  SE([@[PC Elm.Res.]]     = "S"; "12-PC ELI.RES.";
    *  SE([@[Sts SC]]              = "R"; "11-SC REJ.";
    *  SE([@[Sts PC]]              = "R"; "13-PC REJ.";
    *  SE(E([@[Sts SC]] = "B";[@PC]=""); "01-SC BLOQ.";
    *  SE(E([@Cotacao]  = "";[@[Sts PC]]=""); "02-SC LIB.";
    *  SE([@[Sts PC]]              = ""; "03-COTAÇÃO";
    *  SE([@JaEnt]               >   0; "09-ENTREGUE";
      SE(E([@[Sts PC]]="B"; [@[NVL 1]]=""); "04-PC-BLOQ.NVL1";
      SE(E([@[Sts PC]]="B"; [@[NVL 2]]=""); "05-PC-BLOQ.NVL2";
      SE(E([@[Sts PC]]="B"; [@[NVL 3]]=""); "06-PC-BLOQ.NVL3";
      SE(E([@[Sts PC]]="B"; [@[NVL 3]]<>""); "06-PC-BLOQ.NVL3";
      SE([@[Pag.Ant.]]="SIM";"07-PA";"08-PC-AGUARDA ENTREGA")))))))))))))

    */
  if (sc_eliminado_residuo === 'S' && status_pc === '')
    return '11-SC ELIMINADO RESIDUO';
  if (pc_eliminado_residuo === 'S') return '13-PC ELIMINADO RESIDUO';
  if (status_sc === 'R') return '12-SC REJEITADO';
  if (status_pc === 'R') return '14-PC REJEITADO';
  if (status_sc === 'B' && pc === '') return '01-SC BLOQUEADO';
  if (cotacao === '' && pc === '') return '02-SC LIBERADO';
  if (status_pc === '') return '03-COTAÇÃO';
  if (quantidade_ja_entregue === quantidade) return '10-ENTREGUE';
  if (quantidade_ja_entregue > 0) return '10-ENTREGUE PARCIAL';
  if (status_pc === 'B' && dt_aprovacao_n1 === null)
    return '04-PC-BLOQUEADO NVL1';
  if (status_pc === 'B' && dt_aprovacao_n2 === null)
    return '05-PC-BLOQUEADO NVL2';
  if (status_pc === 'B' && dt_aprovacao_n3 === null)
    return '06-PC-BLOQUEADO NVL3';
  if (status_pc === 'B' && dt_aprovacao_n3 !== null)
    return '07-PC-BLOQ.NVL3 ERRO SIST.';
  if (tipo_pagamento !== '') return '08-PAGAMENTO ANTECIPADO';

  return '09-PC-AGUARDA ENTREGA';
}

class CreateCompraManutencaoService {
  public async execute(
    request: CreateCompraManutencao,
  ): Promise<ComprasManutencao> {
    const { sc, item } = request;
    const comprasManutencaoRepository = getRepository(ComprasManutencao);
    const solicitantesRepository = getRepository(Solicitantes);
    const tiposPagamentoRepository = getRepository(TiposPagamento);

    checkFiels(request);

    const createSolicitanteService = new CreateSolicitanteService();
    // const createTipoPagamentoService = new CreateTipoPagamentoService();

    let solicitante = await solicitantesRepository.findOne({
      where: { usuario: request.solicitante },
    });
    const tipo_pagamento = await tiposPagamentoRepository.findOne({
      where: { codigo: request.tipo_pagamento },
    });

    if (!solicitante) {
      solicitante = await createSolicitanteService.execute({
        usuario: request.solicitante,
        area: 'OUTROS',
      });
    }
    if (!tipo_pagamento && request.tipo_pagamento !== '') {
      // tipo_pagamento = await createTipoPagamentoService.execute({ codigo: request.tipo_pagamento, descricao: "-" })
      request.tipo_pagamento = '';
    }
    // else if (request.tipo_pagamento !== ''){
    //   request.tipo_pagamento = "PA";
    // }
    request.status = getStatus(request);
    // console.log(request.status);

    let compraManutencao = await comprasManutencaoRepository.findOne({
      where: { sc, item },
    });

    if (compraManutencao) {
      compraManutencao = await updateCompraManutencao({
        compraManutencao,
        request,
      });

      comprasManutencaoRepository.save(compraManutencao);

      return compraManutencao;
    }

    compraManutencao = comprasManutencaoRepository.create({
      ...request,
      solicitante: undefined,
      tipo_pagamento: undefined,
      solicitante_id: solicitante.id,
      tipo_pagamento_id: tipo_pagamento ? tipo_pagamento.id : undefined,
    });

    compraManutencao.solicitante = solicitante;
    compraManutencao.tipo_pagamento =
      tipo_pagamento === undefined ? null : tipo_pagamento;
    compraManutencao.status_aprovacao = '';
    // definir regras de negocio para setar os campos status & pagamento_antecipado & area.

    await comprasManutencaoRepository.save(compraManutencao);

    return compraManutencao;
  }
}

export default CreateCompraManutencaoService;
