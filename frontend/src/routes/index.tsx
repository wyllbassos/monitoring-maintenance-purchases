import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/ComprasList';
import Import from '../pages/Import';
import Insert from '../pages/Insert';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/list" exact component={Dashboard} />
    <Route path="/import" component={Import} />
  </Switch>
);

export default Routes;
