import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

import { IRequestCompany } from '../dtos/IRequestCompany';

export interface Company {
  _id: string;
  name: string;
  employeers: { name: string }[];
  units: {
    name: string;
    countAssets: number;
    assets: {
      name: string;
      type: string;
      modelName: string;
      description: string;
      state: string;
      healthscore: number;
      image: {
        url: string;
        name: string;
      };
    }[];
  }[];
}

interface CompanyContextData {
  company: Company;
  loading: boolean;
  fetchCompany: (companyId: string) => void;
}

const CompanyContext = createContext<CompanyContextData>(
  {} as CompanyContextData,
);

export const CompanyProvider: React.FC = ({ children }) => {
  const [company, setCompany] = useState<Company>({} as Company);
  const [loading, setLoading] = useState(false);

  const fetchCompany = useCallback((companyId: string) => {
    setLoading(true);
    api
      .get<IRequestCompany>(`/company/${companyId}`)
      .then(response => {
        setCompany(response.data);
        setLoading(false);
      })
      .catch(error => setLoading(false));
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
