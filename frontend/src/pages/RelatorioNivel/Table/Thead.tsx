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
          <th key={item}>{item}</th>
        ))}
      </tr>
    </thead>
  );
};

export default Thead;
