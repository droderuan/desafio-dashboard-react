import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

import { ICompany } from '../dtos/ICompany';
import { IRequestCompany } from '../dtos/IRequestCompany';

interface CompanyContextData {
  company: ICompany;
  loading: boolean;
  fetchCompany: (companyId: string) => void;
}

const CompanyContext = createContext<CompanyContextData>(
  {} as CompanyContextData,
);

export const CompanyProvider: React.FC = ({ children }) => {
  const [company, setCompany] = useState<ICompany>({} as ICompany);
  const [loading, setLoading] = useState(false);

  const fetchCompany = useCallback((companyId: string) => {
    setLoading(true);
    api
      .get<IRequestCompany>(`/company/${companyId}`)
      .then(response => {
        setCompany(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <CompanyContext.Provider value={{ company, loading, fetchCompany }}>
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
