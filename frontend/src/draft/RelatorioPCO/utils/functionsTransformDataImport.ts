import { DataPCO, DataCalcByCC } from '..';

interface ImportDataDTO {
  textAreaInput: string;
  setData: React.Dispatch<React.SetStateAction<DataPCO[]>>;
}

interface CalcValueCC {
  data: DataPCO[];
  setDataCalcByCC: React.Dispatch<React.SetStateAction<DataCalcByCC[]>>;
}

export function fImportData({ textAreaInput, setData }: ImportDataDTO): void {
  const lines = textAreaInput.split('\n');

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
  setData(dataReturn);
}

export function fCalcValueByCC({ setDataCalcByCC, data }: CalcValueCC): void {
  let objCalc: any = {};

  const retCalc: any[] = [];

  const dataChangeFormatValueToNumber = data.map(item => {
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
    return {
      ...item,
      Total,
      Orcado,
      Pedido,
      'Entr.NF': EntrNF,
      Contin,
      'Vlr.Unit': VlrUnit,
      Qtd,
    };
  });

  dataChangeFormatValueToNumber.forEach(iten => {
    const { 'C.Custo': CCusto, Periodo, Conta } = iten;
    const objectIten = {
      [Periodo]: {
        [Conta]: {
          [CCusto]: [iten],
        },
      },
    };

    objCalc = {
      ...objCalc,
      [Periodo]: objCalc[Periodo]
        ? {
            ...objCalc[Periodo],
            [Conta]: objCalc[Periodo][Conta]
              ? {
                  ...objCalc[Periodo][Conta],
                  [CCusto]: objCalc[Periodo][Conta][CCusto]
                    ? [...objCalc[Periodo][Conta][CCusto], iten]
                    : objectIten[Periodo][Conta][CCusto],
                }
              : objectIten[Periodo][Conta],
          }
        : objectIten[Periodo],
    };
  });

  const keysPeriodo = Object.keys(objCalc);

  keysPeriodo.forEach((keyPeriodo, indPerido) => {
    const keysConta = Object.keys(objCalc[keyPeriodo]);

    retCalc.push({
      Periodo: keyPeriodo,
      totalItens: 0,
      itens: [],
    });

    keysConta.forEach((keyConta, indConta) => {
      const keysCC = Object.keys(objCalc[keyPeriodo][keyConta]);

      retCalc[indPerido].itens.push({
        Conta: keyConta,
        itens: [],
      });

      keysCC.forEach(keyCC => {
        const itens = objCalc[keyPeriodo][keyConta][keyCC] as DataPCO[];

        const totais = itens.reduce((acc, item) => {
          return {
            ...acc,
            Total: acc.Total + item.Total,
            Orcado: acc.Orcado + item.Orcado,
            Pedido: acc.Pedido + item.Pedido,
            'Entr.NF': acc['Entr.NF'] + item['Entr.NF'],
          };
        });

        retCalc[indPerido].totalItens += itens.length;

        retCalc[indPerido].itens[indConta].itens.push({
          Periodo: keyPeriodo,
          Conta: keyConta,
          CCusto: keyCC,
          totalPC: totais.Total,
          totalOrcado: totais.Orcado,
          totalEmpenhadoPC: totais.Pedido,
          totalEmpenhadoNF: totais['Entr.NF'],
          disponivel: 0,
          itens,
        });
      });
    });
  });

  setDataCalcByCC(retCalc);
}
