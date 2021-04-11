import { IDataPCO, IDataPCOGoupByCC, IImportPCO } from '../../types';
import { IPCO } from '../pco';
import { textToObject } from '../../../../utils/textToObject';
import { PCOfields } from '../../../../utils/textToObjectFields';

interface CalcValueCC {
  dataPCO: IDataPCO[];
}

export function groupDataByCC(dataPCO: IDataPCO[]): IDataPCOGoupByCC[] {
  const dataGoupByCC: IDataPCOGoupByCC[] = [];

  dataPCO.forEach(item => {
    if (!item.Periodo) {
      return;
    }

    const {
      'C.Custo': CCusto,
      Conta,
      Periodo,
      Total: GastoPrevisto,
      Orcado,
      Pedido,
      'Entr.NF': EntrNF,
      Contin,
      'Real CTB': RealCTB,
      // 'Vlr.Unit': VlrUnit,
      // Qtd,
    } = item;

    const findIndex = dataGoupByCC.findIndex(dataGoupByCCItem => {
      return (
        dataGoupByCCItem.CCusto === CCusto &&
        dataGoupByCCItem.Conta === Conta &&
        dataGoupByCCItem.Periodo === Periodo
      );
    });

    const newItem = {
      ...item,
    };

    const Empenhado = Pedido + EntrNF + Contin + RealCTB;
    const DisponivelSistema = Orcado + Empenhado;
    const FaltaEmpenhar = GastoPrevisto + Empenhado;
    const DisponivelReal = Orcado - GastoPrevisto;

    if (findIndex === -1) {
      dataGoupByCC.push({
        id: Periodo + Conta + CCusto,
        Periodo,
        Conta,
        CCusto,
        GastoPrevisto,
        Orcado,
        Empenhado,
        DisponivelSistema,
        FaltaEmpenhar,
        DisponivelReal,
        itens: [newItem],
      });
    } else {
      dataGoupByCC[findIndex].GastoPrevisto += GastoPrevisto;
      dataGoupByCC[findIndex].Orcado += Orcado;
      dataGoupByCC[findIndex].Empenhado += Empenhado;
      dataGoupByCC[findIndex].DisponivelSistema += DisponivelSistema;
      dataGoupByCC[findIndex].FaltaEmpenhar += FaltaEmpenhar;
      dataGoupByCC[findIndex].DisponivelReal += DisponivelReal;
      dataGoupByCC[findIndex].itens.push(newItem);
    }
  });

  const ordenedIDataGoupByCC = dataGoupByCC
    .sort((a, b) => {
      if (a.DisponivelReal > b.DisponivelReal) {
        return 1;
      }

      if (a.DisponivelReal < b.DisponivelReal) {
        return -1;
      }

      return 0;
    })
    .sort((a, b) => {
      if (a.Periodo > b.Periodo) {
        return -1;
      }

      if (a.Periodo < b.Periodo) {
        return 1;
      }

      return 0;
    })
    .sort((a, b) => {
      if (a.Conta > b.Conta) {
        return 1;
      }

      if (a.Conta < b.Conta) {
        return -1;
      }

      return 0;
    });

  return ordenedIDataGoupByCC;
}

export function convertTextToPCO(text: string): IPCO {
  const PCOs = textToObject<IImportPCO>(text, PCOfields);

  if (!PCOs) {
    return { list: [], groupByCC: [] };
  }

  const dataPCO: IDataPCO[] = PCOs.map((PCO, index) => {
    const [month, year] = PCO.Periodo.split('/');
    const Periodo = `${year}/${month.length === 2 ? month : `0${month}`}`;
    return {
      ...PCO,
      Periodo,
      id: String(index),
    };
  });

  const groupByCC = groupDataByCC(dataPCO);
  return { list: dataPCO, groupByCC };
}
