import { useContext } from 'react';
import { CandidatesContext } from '../contexts/CandidatesContext';
import { JobsContext } from '../contexts/JobsContext';
import { PresentationsContext } from '../contexts/PresentationsContext';
import { EmployersContext } from '../contexts/EmployersContext';
import { MessagesContext } from '../contexts/MessagesContext';

export const useCandidates = () => {
  const context = useContext(CandidatesContext);
  if (context === undefined) {
    throw new Error('useCandidates must be used within a CandidatesProvider');
  }
  return context;
};

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};

export const usePresentations = () => {
  const context = useContext(PresentationsContext);
  if (context === undefined) {
    throw new Error('usePresentations must be used within a PresentationsProvider');
  }
  return context;
};

export const useEmployers = () => {
  const context = useContext(EmployersContext);
  if (context === undefined) {
    throw new Error('useEmployers must be used within a EmployersProvider');
  }
  return context;
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
};