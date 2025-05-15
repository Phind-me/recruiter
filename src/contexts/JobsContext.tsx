import React, { createContext, useContext, useState, useEffect } from 'react';
import { JobRole } from '../types';
import { jobRoles as mockJobs } from '../data/mockData';

interface JobsContextType {
  jobs: JobRole[];
  activeJob: JobRole | null;
  activeJobId: string | null;
  setActiveJobId: (id: string | null) => void;
  createJob: (job: Omit<JobRole, 'id'>) => void;
  updateJob: (id: string, updates: Partial<JobRole>) => void;
  deleteJob: (id: string) => void;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const JobsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<JobRole[]>([]);
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [activeJob, setActiveJob] = useState<JobRole | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const active = jobs.find(j => j.id === activeJobId) || null;
    setActiveJob(active);
  }, [activeJobId, jobs]);

  const fetchJobs = async () => {
    // In a real app, this would be an API call
    setJobs(mockJobs);
  };

  const createJob = (jobData: Omit<JobRole, 'id'>) => {
    const newJob: JobRole = {
      ...jobData,
      id: crypto.randomUUID()
    };
    setJobs(prev => [...prev, newJob]);
  };

  const updateJob = (id: string, updates: Partial<JobRole>) => {
    setJobs(prev => 
      prev.map(job => 
        job.id === id ? { ...job, ...updates } : job
      )
    );
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
    if (activeJobId === id) {
      setActiveJobId(null);
    }
  };

  return (
    <JobsContext.Provider value={{
      jobs,
      activeJob,
      activeJobId,
      setActiveJobId,
      createJob,
      updateJob,
      deleteJob
    }}>
      {children}
    </JobsContext.Provider>
  );
};

export { JobsContext }