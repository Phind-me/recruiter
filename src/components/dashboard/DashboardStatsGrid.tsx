import React from 'react';
import { StatCard } from '../ui/StatCard';
import { Users, Briefcase, PresentationIcon, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { DashboardMetrics } from '../../types';

interface DashboardStatsGridProps {
  metrics: DashboardMetrics;
}

export const DashboardStatsGrid: React.FC<DashboardStatsGridProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title="Active Candidates"
        value={metrics.activeCandidates}
        icon={<Users size={24} className="text-blue-800" />}
        description="Total candidates actively seeking placement"
        trend={{ value: 12, isPositive: true }}
      />
      
      <StatCard
        title="Open Job Roles"
        value={metrics.openRoles}
        icon={<Briefcase size={24} className="text-blue-800" />}
        description="Positions needing candidates"
        trend={{ value: 5, isPositive: true }}
      />
      
      <StatCard
        title="Pending Presentations"
        value={metrics.pendingPresentations}
        icon={<PresentationIcon size={24} className="text-blue-800" />}
        description="Candidates in the hiring process"
      />
      
      <StatCard
        title="Recent Placements"
        value={metrics.recentPlacements}
        icon={<CheckCircle size={24} className="text-green-600" />}
        description="Successful placements this month"
        trend={{ value: 20, isPositive: true }}
      />
      
      <StatCard
        title="Urgent Candidates"
        value={metrics.urgentCandidates}
        icon={<AlertCircle size={24} className="text-red-600" />}
        description="Candidates unemployed for >180 days"
        className={metrics.urgentCandidates > 0 ? "border-l-4 border-red-500" : ""}
      />
      
      <StatCard
        title="Upcoming Interviews"
        value={metrics.upcomingInterviews}
        icon={<Calendar size={24} className="text-blue-800" />}
        description="Scheduled in the next 7 days"
      />
    </div>
  );
};