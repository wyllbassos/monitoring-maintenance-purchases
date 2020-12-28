import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/ComprasList';
import Import from '../pages/Import';
import Insert from '../pages/Insert';
import RelatorioNivel from '../pages/RelatorioNivel';

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
    <Route path="/import" exact component={Import} />
  </Switch>
);

export default Routes;
