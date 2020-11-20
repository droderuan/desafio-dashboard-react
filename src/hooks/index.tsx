import React from 'react';

import { CompanyProvider } from './Company';

const AppProvider: React.FC = ({ children }) => {
  return <CompanyProvider>{children}</CompanyProvider>;
};

export default AppProvider;
