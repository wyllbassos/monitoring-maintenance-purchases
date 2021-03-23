import React from 'react';

import formatValue from '../../../../utils/formatValue';
import { Content } from './styles';

export interface ITableLines {
  key: any;
  itens: Array<{
    key: any;
    isCurrency: boolean;
    value: any;
  }>;
}

export interface ITable {
  header: string[];
  lines: ITableLines[];
}

const Table: React.FC<ITable> = ({ header, lines }: ITable) => {
  return (
    <Content>
      <thead>
        <tr>
          {header.map(cell => (
            <th key={cell}>{cell}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lines.map(line => (
          <tr key={line.key}>
            {line.itens.map(cell => (
              <td key={cell.key}>
                {cell.isCurrency && formatValue(cell.value)}
                {!cell.isCurrency && cell.value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Content>
  );
};

export default Table;
