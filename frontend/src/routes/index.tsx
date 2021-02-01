import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/ComprasList';
import Import from '../pages/Import';
import Custos from '../pages/Custos';
import Prioridades from '../pages/Prioridades';
import RelatorioNivel from '../pages/RelatorioNivel';
import RelatorioNivelV2 from '../pages/RelatorioNivelV2';

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

    <Route
      path="/nivel_v2"
      exact
      component={() => <RelatorioNivelV2 Nivel="nivel-1" />}
    />

    <Route path="/custos" exact component={Custos} />
    <Route path="/prioridades" exact component={Prioridades} />
    <Route path="/import" exact component={Import} />
  </Switch>
);

export default Routes;
