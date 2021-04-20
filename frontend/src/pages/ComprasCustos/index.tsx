import React, { ReactElement, useMemo } from 'react';
import PageBase from '../../components/PageBase';
import { usePageBase } from '../../hooks/pageBase';

const ComprasCustos: React.FC = () => {
  const { pageBaseItens } = usePageBase();

  const PageSelect: ReactElement = useMemo(() => {
    const index = pageBaseItens.findIndex(
      headerItenMenu => headerItenMenu.selected,
    );
    return pageBaseItens[index].componet;
  }, [pageBaseItens]);

  return <PageBase>{PageSelect}</PageBase>;
};

export default ComprasCustos;
