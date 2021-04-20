import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Providers from '../hooks';

import Dashboard from '../pages/ComprasList';
import Import from '../pages/Import';
import Custos from '../pages/Custos';
import Prioridades from '../pages/Prioridades';
import PcsBloqueados from '../pages/PcsBloqueados';
import RelatorioPCO from '../pages/RelatorioPCO/index';
import { PcoProvider } from '../pages/RelatorioPCO/hooks/pco';

import PageBase from '../components/PageBase/index';
import TratativaSSs from '../pages/TratativaSSs';
import ComprasCustos from './../pages/ComprasCustos/index';

const Routes: React.FC = () => (
  <Switch>
    <Route
      path="/index"
      exact
      component={() => (
        <Providers>
          <ComprasCustos />
        </Providers>
      )}
    />
    <Route path="/" exact component={Dashboard} />
    <Route path="/list" exact component={Dashboard} />
    <Route path="/pcs-bloqueados" exact component={PcsBloqueados} />
    <Route path="/custos" exact component={Custos} />
    <Route path="/prioridades" exact component={Prioridades} />
    <Route path="/import" exact component={Import} />

    <Route
      path="/relatorio-pco"
      exact
      component={() => (
        <PcoProvider>
          <RelatorioPCO />
        </PcoProvider>
      )}
    />
    <Route path="/tratativas" exact component={TratativaSSs} />
  </Switch>
);

export default Routes;
