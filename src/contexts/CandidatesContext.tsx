import React, { createContext, useContext, useState, useEffect } from 'react';
import { Candidate } from '../types';
import { candidates as mockCandidates } from '../data/mockData';

interface CandidatesContextType {
  candidates: Candidate[];
  activeCandidate: Candidate | null;
  activeCandidateId: string | null;
  setActiveCandidateId: (id: string | null) => void;
  createCandidate: (candidate: Omit<Candidate, 'id'>) => void;
  updateCandidate: (id: string, updates: Partial<Candidate>) => void;
  deleteCandidate: (id: string) => void;
}

const CandidatesContext = createContext<CandidatesContextType | undefined>(undefined);

export const CandidatesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [activeCandidateId, setActiveCandidateId] = useState<string | null>(null);
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  useEffect(() => {
    const active = candidates.find(c => c.id === activeCandidateId) || null;
    setActiveCandidate(active);
  }, [activeCandidateId, candidates]);

  const fetchCandidates = async () => {
    // In a real app, this would be an API call
    setCandidates(mockCandidates);
  };

  const createCandidate = (candidateData: Omit<Candidate, 'id'>) => {
    const newCandidate: Candidate = {
      ...candidateData,
      id: crypto.randomUUID()
    };
    setCandidates(prev => [...prev, newCandidate]);
  };

  const updateCandidate = (id: string, updates: Partial<Candidate>) => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === id ? { ...candidate, ...updates } : candidate
      )
    );
  };

  const deleteCandidate = (id: string) => {
    setCandidates(prev => prev.filter(candidate => candidate.id !== id));
    if (activeCandidateId === id) {
      setActiveCandidateId(null);
    }
  };

  return (
    <CandidatesContext.Provider value={{
      candidates,
      activeCandidate,
      activeCandidateId,
      setActiveCandidateId,
      createCandidate,
      updateCandidate,
      deleteCandidate
    }}>
      {children}
    </CandidatesContext.Provider>
  );
};

export { CandidatesContext }