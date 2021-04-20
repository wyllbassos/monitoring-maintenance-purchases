import React from 'react';

import { PcoProvider } from '../pages/RelatorioPCO/hooks/pco';
import { PageBaseProvider } from './pageBase';

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }: Props) => {
  return (
    <PageBaseProvider>
      <PcoProvider>{children}</PcoProvider>
    </PageBaseProvider>
  );
};

export default Providers;
