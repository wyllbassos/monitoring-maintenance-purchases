import ComprasManutencao from '../../../models/ComprasManutencao';

export interface CustosManutencao {
  total: {
    lubrificantes: number;
    manutencao: number;
    estoque: number;
    total: number;
  };
  bloqueado: {
    lubrificantes: number;
    manutencao: number;
    estoque: number;
    total: number;
  };
  liberado: {
    entregue: {
      lubrificantes: number;
      manutencao: number;
      estoque: number;
      total: number;
    };
    pendente: {
      lubrificantes: number;
      manutencao: number;
      estoque: number;
      total: number;
    };
    total: {
      lubrificantes: number;
      manutencao: number;
      estoque: number;
      total: number;
    };
  };
}

function initCustosManutencao(): CustosManutencao {
  return {
    total: {
      lubrificantes: 0,
      manutencao: 0,
      estoque: 0,
      total: 0,
    },
    bloqueado: {
      lubrificantes: 0,
      manutencao: 0,
      estoque: 0,
      total: 0,
    },
    liberado: {
      entregue: {
        lubrificantes: 0,
        manutencao: 0,
        estoque: 0,
        total: 0,
      },
      pendente: {
        lubrificantes: 0,
        manutencao: 0,
        estoque: 0,
        total: 0,
      },
      total: {
        lubrificantes: 0,
        manutencao: 0,
        estoque: 0,
        total: 0,
      },
    },
  };
}

function checkIfIsLubrificantes(produto: string): boolean {
  const oleosProducao = ['85366', '85368'];
  const oleosManutencao = ['89954', '90993', '45217', '12457'];
  const lubrificantes = [...oleosProducao, ...oleosManutencao];

  const indexProduto = lubrificantes.findIndex(codLub => codLub === produto);

  return indexProduto >= 0;
}

function checkIfIsEstoque(produto: string): boolean {
  // const { area } = comprasManutencao.solicitante;
  const ccEstoque = ['1101003', '2104012'];

  const indexProduto = ccEstoque.findIndex(codEst => codEst === produto);

  return indexProduto >= 0;
  // return area === 'ALMOX';
}
export function makeCustosManutencao(
  comprasManutencao: ComprasManutencao[],
): CustosManutencao {
  const custosManutencao = initCustosManutencao();

  let libTotal = 0;
  let libEntregueTotal = 0;
  let libPendenteTotal = 0;
  let libBloqueadoTotal = 0;

  let libLubrificantes = 0;
  let libEntregueLubrificantes = 0;
  let libPendenteLubrificantes = 0;
  let libBloqueadoLubrificantes = 0;

  let libEstoque = 0;
  let libEntregueEstoque = 0;
  let libPendenteEstoque = 0;
  let libBloqueadoEstoque = 0;

  let libManutencao = 0;
  let libEntregueManutencao = 0;
  let libPendenteManutencao = 0;
  let libBloqueadoManutencao = 0;

  comprasManutencao.forEach(compraManutencao => {
    const { valor_total, status, status_pc } = compraManutencao;

    const isLubrificante = checkIfIsLubrificantes(compraManutencao.produto);
    const isEstoque = checkIfIsEstoque(compraManutencao.centro_custo_pc);

    switch (status_pc) {
      case 'L': {
        libTotal += valor_total;

        if (isLubrificante) {
          libLubrificantes += valor_total;
        } else if (isEstoque) {
          libEstoque += valor_total;
        } else {
          libManutencao += valor_total;
        }

        if (status === '10-ENTREGUE') {
          libEntregueTotal += valor_total;

          if (isLubrificante) {
            libEntregueLubrificantes += valor_total;
          } else if (isEstoque) {
            libEntregueEstoque += valor_total;
          } else {
            libEntregueManutencao += valor_total;
          }
        } else {
          libPendenteTotal += valor_total;

          if (isLubrificante) {
            libPendenteLubrificantes += valor_total;
          } else if (isEstoque) {
            libPendenteEstoque += valor_total;
          } else {
            libPendenteManutencao += valor_total;
          }
        }
        break;
      }
      case 'B': {
        libBloqueadoTotal += valor_total;

        if (isLubrificante) {
          libBloqueadoLubrificantes += valor_total;
        } else if (isEstoque) {
          libBloqueadoEstoque += valor_total;
        } else {
          libBloqueadoManutencao += valor_total;
        }
        break;
      }
      default: {
        break;
      }
    }
  });

  custosManutencao.liberado.total.total = libTotal;
  custosManutencao.liberado.entregue.total = libEntregueTotal;
  custosManutencao.liberado.pendente.total = libPendenteTotal;
  custosManutencao.bloqueado.total = libBloqueadoTotal;

  custosManutencao.liberado.total.lubrificantes = libLubrificantes;
  custosManutencao.liberado.entregue.lubrificantes = libEntregueLubrificantes;
  custosManutencao.liberado.pendente.lubrificantes = libPendenteLubrificantes;
  custosManutencao.bloqueado.lubrificantes = libBloqueadoLubrificantes;

  custosManutencao.liberado.total.estoque = libEstoque;
  custosManutencao.liberado.entregue.estoque = libEntregueEstoque;
  custosManutencao.liberado.pendente.estoque = libPendenteEstoque;
  custosManutencao.bloqueado.estoque = libBloqueadoEstoque;

  custosManutencao.liberado.total.manutencao = libManutencao;
  custosManutencao.liberado.entregue.manutencao = libEntregueManutencao;
  custosManutencao.liberado.pendente.manutencao = libPendenteManutencao;
  custosManutencao.bloqueado.manutencao = libBloqueadoManutencao;

  custosManutencao.total.total =
    custosManutencao.liberado.total.total + custosManutencao.bloqueado.total;
  return custosManutencao;
}
