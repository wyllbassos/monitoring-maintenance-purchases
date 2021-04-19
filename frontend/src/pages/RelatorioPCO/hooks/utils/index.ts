import { IDataPCO, IDataPCOGoupByCC, IImportPCO } from '../../types';
import { IPCO } from '../pco';
import { textToObject } from '../../../../utils/textToObject';
import { PCOFields } from '../../../../utils/textToObjectFields';

export function groupDataByCC(dataPCO: IDataPCO[]): IDataPCOGoupByCC[] {
  const dataGoupByCC: IDataPCOGoupByCC[] = [];

  dataPCO.forEach(item => {
    if (!item.periodo) {
      return;
    }

    const {
      c_custo,
      conta,
      periodo,
      documento,
      total: gasto_previsto,
      orcado,
      pedido,
      entr_nf,
      contin,
      real_ctb,
      tipo,
      // 'Vlr.Unit': VlrUnit,
      // Qtd,
    } = item;

    const findIndex = dataGoupByCC.findIndex(dataGoupByCCItem => {
      return (
        dataGoupByCCItem.c_custo === c_custo &&
        dataGoupByCCItem.conta === conta &&
        dataGoupByCCItem.periodo === periodo
      );
    });

    const newItem = {
      ...item,
    };

    const empenhado = pedido + entr_nf + contin + real_ctb;
    const disponivel_sistema = orcado + empenhado;
    const falta_empenhar = gasto_previsto + empenhado;
    const disponivel_real = orcado - gasto_previsto;

    if (findIndex === -1) {
      dataGoupByCC.push({
        id: periodo + conta + c_custo,
        periodo,
        conta,
        c_custo,
        gasto_previsto,
        orcado,
        empenhado,
        disponivel_sistema,
        falta_empenhar,
        disponivel_real,
        itens: [newItem],
        pcs_nao_empenhados: tipo === 'PC' && pedido === 0 ? [documento] : [],
      });
    } else {
      dataGoupByCC[findIndex].gasto_previsto += gasto_previsto;
      dataGoupByCC[findIndex].orcado += orcado;
      dataGoupByCC[findIndex].empenhado += empenhado;
      dataGoupByCC[findIndex].disponivel_sistema += disponivel_sistema;
      dataGoupByCC[findIndex].falta_empenhar += falta_empenhar;
      dataGoupByCC[findIndex].disponivel_real += disponivel_real;
      dataGoupByCC[findIndex].itens.push(newItem);

      const indexPCNaoEmpenhado = dataGoupByCC[
        findIndex
      ].pcs_nao_empenhados.findIndex(pc => pc === documento);

      if (tipo === 'PC' && pedido === 0 && indexPCNaoEmpenhado < 0) {
        dataGoupByCC[findIndex].pcs_nao_empenhados.push(documento);
      }
    }
  });

  const ordenedIDataGoupByCC = dataGoupByCC
    .sort((a, b) => {
      if (a.disponivel_real > b.disponivel_real) {
        return 1;
      }

      if (a.disponivel_real < b.disponivel_real) {
        return -1;
      }

      return 0;
    })
    .sort((a, b) => {
      if (a.periodo > b.periodo) {
        return -1;
      }

      if (a.periodo < b.periodo) {
        return 1;
      }

      return 0;
    })
    .sort((a, b) => {
      if (a.conta > b.conta) {
        return 1;
      }

      if (a.conta < b.conta) {
        return -1;
      }

      return 0;
    });

  return ordenedIDataGoupByCC;
}

export function convertTextToPCO(text: string): IPCO {
  const PCOs = textToObject<IImportPCO>(text, PCOFields);

  if (!PCOs) {
    return { list: [], groupByCC: [] };
  }

  const dataPCO: IDataPCO[] = PCOs.map((PCO, index) => {
    const [month, year] = PCO.periodo.split('/');
    const periodo = `${year}/${month.length === 2 ? month : `0${month}`}`;
    return {
      ...PCO,
      periodo,
      id: String(index),
    };
  });

  const groupByCC = groupDataByCC(dataPCO);
  return { list: dataPCO, groupByCC };
}
