import fs from 'fs';
import csvParse from 'csv-parse';
import AppError from '../errors/AppError';

export default async function loadCSV(filePath: string): Promise<Array<any>> {
  try {
    const readCSVStream = fs.createReadStream(filePath);

    const parseStream = csvParse({
      from_line: 1,
      ltrim: true,
      rtrim: true,
      skip_empty_lines: true,
      delimiter: ';',
      columns: line => {
        const newLine = line.map((reg: string) => reg.toLowerCase());
        return newLine;
      },
    });

    const parseCSV = readCSVStream.pipe(parseStream);

    const dataArray: Array<Array<any>> = [];

    parseCSV.on('data', line => {
      dataArray.push(line);
    });

    await new Promise(resolve => {
      parseCSV.on('end', resolve);
    });

    return dataArray;
  } catch (error) {
    throw new AppError(`Erro ao importar arquivo csv`);
  }
}
