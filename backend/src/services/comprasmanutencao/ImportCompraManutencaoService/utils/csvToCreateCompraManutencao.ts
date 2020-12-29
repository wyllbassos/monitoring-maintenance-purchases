import { keys } from 'ts-transformer-keys';
import { CreateCompraManutencao } from '../../CreateCompraManutencaoService';

export default function csvToCreateCompraManutencao(
  csvArray: Array<Array<any>>,
): CreateCompraManutencao[] {
  const keysOfProps = keys<CreateCompraManutencao>();
  const valueOfFirstLinePropsCSV = csvArray.splice(0, 1)[0];

  const objectReturn = csvArray.map(line => {
    const object: { [key: string]: any } = {};
    keysOfProps.forEach(keyOfProp => {
      const indexOfPRop = valueOfFirstLinePropsCSV.findIndex(
        valueOfPropCSV => valueOfPropCSV === keyOfProp,
      );
      const prop = keysOfProps[indexOfPRop].toLocaleLowerCase();
      object[prop] = line[indexOfPRop];
    });
    return object;
  });
  return objectReturn as CreateCompraManutencao[];
}
