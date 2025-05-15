import React from 'react';
import { DashboardStatsGrid } from '../components/dashboard/DashboardStatsGrid';
import { RecentJobs } from '../components/dashboard/RecentJobs';
import { UrgentCandidates } from '../components/dashboard/UrgentCandidates';
import { ActivePresentations } from '../components/dashboard/ActivePresentations';
import { useCandidates, useJobs, usePresentations } from '../hooks/useDashboard';

export const DashboardPage: React.FC = () => {
  const { candidates } = useCandidates();
  const { jobs } = useJobs();
  const { presentations } = usePresentations();

  const metrics = {
    activeCandidates: candidates.filter(c => c.status === 'active').length,
    openRoles: jobs.filter(j => j.status === 'open').length,
    pendingPresentations: presentations.filter(p => !['rejected', 'accepted'].includes(p.status)).length,
    recentPlacements: presentations.filter(p => p.status === 'accepted').length,
    urgentCandidates: candidates.filter(c => c.daysSinceLastJob > 180 && c.status === 'active').length,
    upcomingInterviews: presentations.filter(p => 
      p.nextStep && 
      new Date(p.nextStep.date) > new Date() && 
      new Date(p.nextStep.date) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    ).length
  };

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
      
      <DashboardStatsGrid metrics={metrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UrgentCandidates candidates={candidates} />
        <RecentJobs jobs={jobs} />
      </div>
      
      <ActivePresentations 
        presentations={presentations} 
        candidates={candidates} 
        jobRoles={jobs}
      />
    </div>
  );
};