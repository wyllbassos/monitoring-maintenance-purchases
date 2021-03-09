import React from 'react';

import { PcoProvider } from './pco';

interface Props {
  children: React.ReactNode;
}

const Hooks: React.FC<Props> = ({ children }: Props) => {
  return <PcoProvider>{children}</PcoProvider>;
};

export default Hooks;
