import { DataPCO, DataGoupByCC } from '..';

interface ImportDataDTO {
  text: string;
}

interface CalcValueCC {
  dataPCO: DataPCO[];
}

export function fImportData({ text }: ImportDataDTO): DataPCO[] {
  const lines = text.split('\n');

  const arrayData = lines.map(line => {
    return line.split('\t');
  });

  const header = arrayData.splice(0, 1)[0];
  const dataReturn = arrayData.map((line, i) => {
    const ret: any = {};
    ret.id = String(i);
    header.forEach((key, index) => {
      ret[key] = line[index];
    });
    return ret;
  }) as DataPCO[];
  return dataReturn;
}

export function groupDataByCC({ dataPCO }: CalcValueCC): DataGoupByCC[] {
  const dataGoupByCC: DataGoupByCC[] = [];

  dataPCO.forEach(item => {
    if (!item.Periodo) {
      return;
    }

    const { 'C.Custo': CCusto, Conta, Periodo } = item;

    const Total = Number(
      item.Total.replace('.', '').replace(',', '.').replace(' -   ', '0'),
    );
    const Orcado = Number(
      item.Orcado.replace('.', '').replace(',', '.').replace(' -   ', '0'),
    );
    const Pedido = Number(
      item.Pedido.replace('.', '').replace(',', '.').replace(' -   ', '0'),
    );
    const EntrNF = Number(
      item['Entr.NF'].replace('.', '').replace(',', '.').replace(' -   ', '0'),
    );
    const Contin = Number(
      item.Contin.replace('.', '').replace(',', '.').replace(' -   ', '0'),
    );
    const VlrUnit = Number(
      item['Vlr.Unit'].replace('.', '').replace(',', '.').replace(' -   ', '0'),
    );
    const Qtd = Number(
      item.Qtd.replace('.', '').replace(',', '.').replace(' -   ', '0'),
    );

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
        totalPCBloqueado: Total - Pedido,
        totalOrcado: Orcado,
        totalEmpenhadoPC: Pedido,
        totalEmpenhadoNF: EntrNF,
        disponivelSistema: Orcado + Pedido + EntrNF,
      });
    } else {
      dataGoupByCC[findIndex].totalPCBloqueado += Total - Pedido;
      dataGoupByCC[findIndex].totalOrcado += Orcado;
      dataGoupByCC[findIndex].totalEmpenhadoPC += Pedido;
      dataGoupByCC[findIndex].totalEmpenhadoNF += EntrNF;
      dataGoupByCC[findIndex].disponivelSistema += Orcado + Pedido + EntrNF;
      dataGoupByCC[findIndex].itens.push(newItem);
    }
  });

  const ordenedDataGoupByCC = dataGoupByCC.sort((a, b) => {
    if (a.disponivelSistema > b.disponivelSistema) {
      return 1;
    }

    if (a.disponivelSistema < b.disponivelSistema) {
      return -1;
    }

    return 0;
  });

  return ordenedDataGoupByCC;
}
