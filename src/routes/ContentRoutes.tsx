import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CompanyContent from '../components/CompanyContent';

const ContentRoutes: React.FC = () => {
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
