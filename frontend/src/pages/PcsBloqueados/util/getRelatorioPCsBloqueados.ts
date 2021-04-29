import { RelatorioPC } from '../index';
import api from '../../../services/api';
import { Compra } from '../../ComprasList';

export const getRelatorioPCsBloqueados = async (
  nivel: string,
): Promise<RelatorioPC[]> => {
  const { data } = await api.get<Compra[]>(`/compras-manutencao/${nivel}`);

  const relatorioPC: RelatorioPC[] = [];

  data.forEach(compra => {
    const indexNewCompra = relatorioPC.findIndex(
      newCompra => newCompra.pc === compra.pc,
    );

    if (indexNewCompra === -1) {
      relatorioPC.push({
        pc: compra.pc,
        valor_total: compra.valor_total,
        status_aprovacao: compra.status_aprovacao,
        itens: [compra],
      });
    } else {
      relatorioPC[indexNewCompra].valor_total += compra.valor_total;
      relatorioPC[indexNewCompra].itens.push(compra);
    }
  });
  return relatorioPC;
};
