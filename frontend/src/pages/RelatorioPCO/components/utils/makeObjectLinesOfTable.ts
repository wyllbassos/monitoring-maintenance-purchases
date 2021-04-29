import { ITableLines } from '../Table';

export interface IMakeLinesOfTable {
  list: any[];
  keys: string[];
  keysCurrency: string[];
}

export default function makeObjectLinesOfTable({
  keys,
  keysCurrency,
  list,
}: IMakeLinesOfTable): ITableLines[] {
  let keyLine = 0;
  const lines: ITableLines[] = list.map(custoPCO => {
    const ret: ITableLines = {
      key: keyLine,
      itens: keys.map(key => {
        const value = custoPCO[key];
        const isCurrency =
          keysCurrency.findIndex(keyCurrency => keyCurrency === key) >= 0;
        return { value, key, isCurrency };
      }),
    };
    keyLine += 1;
    return ret;
  });
  return lines;
}
