import { IFields } from './textToObjectFields';

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

export function textToObject<T = any>(
  text: string,
  fields: IFields[] | undefined = undefined,
): T[] | null {
  const lines = text.split('\n');

  const arrayData = lines.map(line => {
    return line.split('\t');
  });

  const convertKeys = arrayData.splice(0, 1)[0];

  if (fields) {
    if (convertKeys.length !== fields.length) {
      alert('Dados devem ter ' + fields.length + 'colunas!');
      return null;
    }

    fields.forEach((field, index) => {
      if (field.key !== convertKeys[index]) {
        alert(
          'A ordem das colunas deve ser: ' +
            JSON.stringify(fields.map(fieldRet => fieldRet.key)),
        );
        return null;
      }
    });
  }

  const objectData: any[] = [];

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