/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fields } from './textToObjectFields';

function convertToNumber(str: string): number {
  let value = Number(str);
  if (!Number.isNaN(value)) {
    return value;
  }
  const strReplaced = str.replace('.', '').replace(',', '.');
  value = Number(strReplaced);
  if (!Number.isNaN(value)) {
    return value;
  }
  if (strReplaced === '-') {
    return 0;
  }
  return value;
}
const ola = 0;
const formatData = {
  number: (str: string): number => {
    const value = convertToNumber(str);
    return value;
  },
  date: (str: string): Date | null => {
    const [day, month, year] = str.split('/');
    const value = new Date(`${year}-${month}-${day}`);
    if (value instanceof Date) {
      return value;
    }
    return null;
  },
};

function replaceChars(
  value: string,
  arrFrom: string[],
  arrTo: string[],
): string {
  let textFormated = value;
  arrFrom.forEach((char, index) => {
    textFormated = textFormated.split(char).join(arrTo[index]);
  });
  return textFormated;
}

export function textToObject<T = any>(
  text: string,
  fields: Fields[] | undefined = undefined,
): T[] | null {
  const lines = text.split('\n');

  const arrayData = lines.map(line => {
    return line.split('\t');
  });

  const convertKeys = arrayData
    .splice(0, 1)[0]
    .map(key =>
      replaceChars(
        key,
        ['.', ' ', 'é', 'á', 'ã', 'ç'],
        ['_', '_', 'e', 'a', 'a', 'c'],
      ).toLowerCase(),
    );

  if (fields) {
    if (convertKeys.length !== fields.length) {
      console.log(`Dados devem ter ${fields.length} colunas!`);
      return null;
    }

    let fieldsOk = true;
    fields.forEach((field, index) => {
      if (field.key !== convertKeys[index]) {
        fieldsOk = false;
      }
    });

    if (!fieldsOk) {
      const fieldsKeys = JSON.stringify(fields.map(fieldRet => fieldRet.key));
      console.log(`A ordem das colunas deve ser: ${fieldsKeys}`);
      return null;
    }
  }

  const objectData: unknown[] = [];

  arrayData.forEach(data => {
    const retunObject: any = {};

    if (data.length !== convertKeys.length) {
      return;
    }

    convertKeys.forEach((key, index) => {
      retunObject[key] = data[index].trim();
    });

    if (fields) {
      fields.forEach(({ format, key: keyFormat }) => {
        if (format && retunObject[keyFormat] !== undefined) {
          const valueFormated = formatData[format](retunObject[keyFormat]);
          retunObject[keyFormat] = valueFormated;
        }
      });
    }

    objectData.push(retunObject);
  });

  return objectData as T[];
}
