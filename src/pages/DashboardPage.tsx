import React from 'react';
import { DashboardStatsGrid } from '../components/dashboard/DashboardStatsGrid';
import { RecentJobs } from '../components/dashboard/RecentJobs';
import { UrgentCandidates } from '../components/dashboard/UrgentCandidates';
import { ActivePresentations } from '../components/dashboard/ActivePresentations';
import { dashboardMetrics, candidates, jobRoles, presentations } from '../data/mockData';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Recruitment Dashboard</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
      
      <DashboardStatsGrid metrics={dashboardMetrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UrgentCandidates candidates={candidates} />
        <RecentJobs jobs={jobRoles} />
      </div>
      
      <ActivePresentations 
        presentations={presentations} 
        candidates={candidates} 
        jobRoles={jobRoles}
      />
    </div>
  );
};