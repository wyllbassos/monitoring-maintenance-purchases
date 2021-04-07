import { IDataPCO, IDataPCOGoupByCC } from '../../types';
import { IPCO } from '../pco';
import { textToObject } from '../../../../utils/textToObject';
import PCO from '../../../../utils/entities/PCO';

interface CalcValueCC {
  dataPCO: IDataPCO[];
}

function convertToNumber(value: string): number {
  return Number(value.replace('.', '').replace(',', '.').replace(' -   ', '0'));
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
      Total,
      Orcado,
      Pedido,
      'Entr.NF': EntrNF,
      Contin,
      'Vlr.Unit': VlrUnit,
      Qtd,
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
      Total,
      Orcado,
      Pedido,
      'Entr.NF': EntrNF,
      Contin,
      'Vlr.Unit': VlrUnit,
      Qtd,
    };

    if (findIndex === -1) {
      dataGoupByCC.push({
        CCusto,
        Conta,
        Periodo,
        id: Periodo + Conta + CCusto,
        itens: [newItem],
        totalPCBloqueado: Total,
        totalOrcado: Orcado,
        totalEmpenhadoPC: Pedido,
        totalEmpenhadoNF: EntrNF,
        disponivelSistema: Orcado + Pedido + EntrNF,
        faltaEmpenhar: Total + Pedido,
      });
    } else {
      dataGoupByCC[findIndex].totalPCBloqueado += Total;
      dataGoupByCC[findIndex].totalOrcado += Orcado;
      dataGoupByCC[findIndex].totalEmpenhadoPC += Pedido;
      dataGoupByCC[findIndex].totalEmpenhadoNF += EntrNF;
      dataGoupByCC[findIndex].disponivelSistema += Orcado + Pedido + EntrNF;
      dataGoupByCC[findIndex].faltaEmpenhar += Total + Pedido;
      dataGoupByCC[findIndex].itens.push(newItem);
    }
  });

  const ordenedIDataGoupByCC = dataGoupByCC
    .sort((a, b) => {
      if (a.disponivelSistema > b.disponivelSistema) {
        return 1;
      }

      if (a.disponivelSistema < b.disponivelSistema) {
        return -1;
      }

      return 0;
    })
    .sort((a, b) => {
      if (a.Periodo > b.Periodo) {
        return 1;
      }

      if (a.Periodo < b.Periodo) {
        return -1;
      }

      return 0;
    });

  return ordenedIDataGoupByCC;
}

export function convertTextToPCO(text: string): IPCO {
  console.log(textToObject<PCO>('PCO', text));

  const lines = text.split('\n');

  const arrayData = lines.map(line => {
    return line.split('\t');
  });

  const header = arrayData.splice(0, 1)[0];
  const list = arrayData.map((line, i) => {
    if (!line.length) {
      return;
    }
    const ret: any = {};
    ret.id = String(i);
    header.forEach((key, index) => {
      const listOfFieldsToConvert = [
        'Total',
        'Orcado',
        'Pedido',
        'Contin',
        'Qtd',
        'Entr.NF',
        'Vlr.Unit',
      ];

      const indexOfFieldToConvert = listOfFieldsToConvert.findIndex(
        fieldConvert => fieldConvert === key,
      );

      if (indexOfFieldToConvert >= 0) {
        ret[key] = 0;
        if (line[index]) ret[key] = convertToNumber(line[index]);
        return;
      }

      ret[key] = line[index];
    });
    return ret;
  }) as IDataPCO[];
  const groupByCC = groupDataByCC(list);
  return { list, groupByCC };
}
