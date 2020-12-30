/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

interface Props {
  header: string[];
}

const Thead: React.FC<Props> = ({ header }: Props) => {
  return (
    <thead>
      <tr>
        {header.map(item => (
          <td key={item}>{item}</td>
        ))}
      </tr>
    </thead>
  );
};

export default Thead;
