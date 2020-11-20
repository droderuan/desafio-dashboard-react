import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../screens/Home';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" render={() => <Home />} />
  </Switch>
);

export default Routes;
