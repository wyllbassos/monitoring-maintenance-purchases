import PCO from './entities/PCO';
import SS from './entities/SS';

export function textToObject<T>(
  converType: 'PCO' | 'SS',
  text: string,
): T[] | null {
  const returnObjectKeys: string[] = [];
  if (converType === 'PCO') {
    returnObjectKeys.push(...Object.keys(new PCO()));
  } else if (converType === 'SS') {
    returnObjectKeys.push(...Object.keys(new SS()));
  }

  const lines = text.split('\n');

  const arrayData = lines.map(line => {
    return line.split('\t');
  });

  const importHeader = arrayData.splice(0, 1)[0] as unknown[];

  if (importHeader.length !== returnObjectKeys.length) {
    alert('Dados devem ter ' + returnObjectKeys.length + 'colunas!');
    return null;
  }

  returnObjectKeys.forEach((key, index) => {
    if (key !== importHeader[index]) {
      alert(
        'A ordem das colunas deve ser: ' + JSON.stringify(returnObjectKeys),
      );
      return null;
    }
  });

  const objectData = arrayData.map(data => {
    const retunObject: any = {};
    returnObjectKeys.forEach((key, index) => {
      retunObject[key] = data[index];
    });
    return retunObject;
  }) as T[];

  return objectData;
}
