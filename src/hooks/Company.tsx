import React, { createContext, useContext, useState } from 'react';

interface Company {
  name: string;
}

interface CompanyContextData {
  company: Company;
}

const CompanyContext = createContext<CompanyContextData>(
  {} as CompanyContextData,
);

export const CompanyProvider: React.FC = ({ children }) => {
  const [company, setCompany] = useState<Company>({} as Company);

  return (
    <CompanyContext.Provider value={{ company }}>
      {children}
    </CompanyContext.Provider>
  );
};

export function useCompany(): CompanyContextData {
  const context = useContext(CompanyContext);

  if (!context) {
    throw new Error('UseCompany must be used within CompanyProvider.');
  }

  return context;
}
