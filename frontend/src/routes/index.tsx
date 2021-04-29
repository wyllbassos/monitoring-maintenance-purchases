import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Providers from '../hooks';

import ComprasCustos from '../pages/ComprasCustos/index';

import Import from '../pages/Import/index';

const Routes: React.FC = () => (
  <Switch>
    <Providers>
      <Route path="/" exact component={ComprasCustos} />
      <Route path="/import" exact component={Import} />
    </Providers>

    {/* <Route path="/prioridades" exact component={Prioridades} /> */}

    {/* <Route path="/import" exact component={Import} /> */}

    {/* <Route path="/tratativas" exact component={TratativaSSs} /> */}
  </Switch>
);

export default Routes;
