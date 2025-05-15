import React, { createContext, useState, useEffect } from 'react';
import { Employer } from '../types';
import { employers as mockEmployers } from '../data/mockData';

interface EmployersContextType {
  employers: Employer[];
  activeEmployer: Employer | null;
  activeEmployerId: string | null;
  setActiveEmployerId: (id: string | null) => void;
  createEmployer: (employer: Omit<Employer, 'id'>) => void;
  updateEmployer: (id: string, updates: Partial<Employer>) => void;
  deleteEmployer: (id: string) => void;
}

const EmployersContext = createContext<EmployersContextType | undefined>(undefined);

export const EmployersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [activeEmployerId, setActiveEmployerId] = useState<string | null>(null);
  const [activeEmployer, setActiveEmployer] = useState<Employer | null>(null);

  useEffect(() => {
    fetchEmployers();
  }, []);

  useEffect(() => {
    const active = employers.find(e => e.id === activeEmployerId) || null;
    setActiveEmployer(active);
  }, [activeEmployerId, employers]);

  const fetchEmployers = async () => {
    // In a real app, this would be an API call
    setEmployers(mockEmployers);
  };

  const createEmployer = (employerData: Omit<Employer, 'id'>) => {
    const newEmployer: Employer = {
      ...employerData,
      id: crypto.randomUUID()
    };
    setEmployers(prev => [...prev, newEmployer]);
  };

  const updateEmployer = (id: string, updates: Partial<Employer>) => {
    setEmployers(prev => 
      prev.map(employer => 
        employer.id === id ? { ...employer, ...updates } : employer
      )
    );
  };

  const deleteEmployer = (id: string) => {
    setEmployers(prev => prev.filter(employer => employer.id !== id));
    if (activeEmployerId === id) {
      setActiveEmployerId(null);
    }
  };

  return (
    <EmployersContext.Provider value={{
      employers,
      activeEmployer,
      activeEmployerId,
      setActiveEmployerId,
      createEmployer,
      updateEmployer,
      deleteEmployer
    }}>
      {children}
    </EmployersContext.Provider>
  );
};

export { EmployersContext };