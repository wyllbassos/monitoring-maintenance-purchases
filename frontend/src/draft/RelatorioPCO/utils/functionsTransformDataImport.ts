import { DataPCO, DataCalcByCC } from '..';

interface ImportDataDTO {
  textAreaInput: string;
  setData: React.Dispatch<React.SetStateAction<DataPCO[]>>;
}

interface CalcValueCC {
  data: DataPCO[];
  setDataCalcByCC: React.Dispatch<React.SetStateAction<DataCalcByCC[]>>;
}

// function checkIfExistInArray(
//   itenCheck: DataPCO,
//   dataCalcByCC: DataCalcByCC[],
//   check: 'Periodo' | 'Conta' | 'C.Custo',
// ): number {
//   const { Periodo, Conta, 'C.Custo': cCusto } = itenCheck;

//   const indexPeriodo = dataCalcByCC.findIndex(iten => Periodo === iten.Periodo);
//   const intenPeriodo: DataCalcByCC | undefined = dataCalcByCC[indexPeriodo];

//   const itenConta = intenPeriodo.itens.filter(iten => Conta === iten.Conta)[0];

//   switch (check) {
//     case 'Periodo': {
//       return indexPeriodo;
//     }
//     case 'Conta': {
//       return !!itenConta;
//     }
//     case 'C.Custo': {
//       const itenCC = itenConta.itens.filter(
//         iten => cCusto === iten['C.Custo'],
//       )[0];
//       return !!itenCC;
//     }
//     default: {
//       return true;
//     }
//   }
// }

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

  data.forEach(iten => {
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
        const itens = objCalc[keyPeriodo][keyConta][keyCC];

        retCalc[indPerido].totalItens += itens.length;

        retCalc[indPerido].itens[indConta].itens.push({
          CCusto: keyCC,
          totalPC: 0,
          Orcado: 0,
          totalEmpenhadoPC: 0,
          totalEmpenhadoNF: 0,
          disponivel: 0,
          itens,
        });
      });
    });
  });

  console.log(retCalc);
}
