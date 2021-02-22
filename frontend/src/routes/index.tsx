import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/ComprasList';
import Import from '../pages/Import';
import Custos from '../pages/Custos';
import Prioridades from '../pages/Prioridades';
import RelatorioNivel from '../pages/RelatorioNivel';
import RelatorioNivelV2 from '../draft/RelatorioNivelV2';
import RelatorioPCO from '../draft/RelatorioPCO/index';
import { PcoProvider } from '../draft/RelatorioPCO/hooks/pco';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/list" exact component={Dashboard} />
    <Route
      path="/nivel-1"
      exact
      component={() => <RelatorioNivel Nivel="nivel-1" />}
    />
    <Route
      path="/nivel-2"
      exact
      component={() => <RelatorioNivel Nivel="nivel-2" />}
    />

    <Route path="/custos" exact component={Custos} />
    <Route path="/prioridades" exact component={Prioridades} />
    <Route path="/import" exact component={Import} />

    <Route
      path="/testes/pc"
      exact
      component={() => <RelatorioNivelV2 Nivel="nivel-1" />}
    />
    <Route
      path="/testes/pco"
      exact
      component={() => (
        <PcoProvider>
          <RelatorioPCO />
        </PcoProvider>
      )}
    />
  </Switch>
);

export default Routes;
