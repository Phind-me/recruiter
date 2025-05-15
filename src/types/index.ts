import { ReactNode } from 'react';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: SkillExperience[];
  experience: number;
  lastEmployed: string;
  daysSinceLastJob: number;
  status: 'active' | 'placed' | 'on hold';
  notes: string;
  avatar?: string;
}

export interface SkillExperience {
  name: string;
  years: number;
  startDate: string;
  endDate: string;
}

export interface JobRole {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: SkillRequirement[];
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  postedDate: string;
  deadlineDate: string;
  status: 'open' | 'filled' | 'closed';
  isNew: boolean;
}

export interface SkillRequirement {
  name: string;
  yearsRequired: number;
  isRequired: boolean;
}

export interface Presentation {
  id: string;
  candidateId: string;
  jobRoleId: string;
  status: 'submitted' | 'screening' | 'interview' | 'technical' | 'offer' | 'rejected' | 'accepted';
  submittedDate: string;
  lastUpdated: string;
  notes: string;
  nextStep?: {
    type: string;
    date: string;
  };
}

export interface DashboardMetrics {
  activeCandidates: number;
  openRoles: number;
  pendingPresentations: number;
  recentPlacements: number;
  urgentCandidates: number;
  upcomingInterviews: number;
}

export interface Employer {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  location: string;
  metrics: {
    totalJobs: number;
    activeJobs: number;
    totalPlacements: number;
    activeCandidates: number;
    successRate: number;
    averageTimeToHire: number;
  };
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    role: string;
  };
}

export interface Message {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  link?: {
    text: string;
    url: string;
  };
}