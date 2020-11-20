import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import CompanyContent from '../components/CompanyContent';

const ContentRoutes: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route
        exact
        path="/company/:companyId"
        render={() => <CompanyContent />}
      />
    </Switch>
  );
};

export default ContentRoutes;
