import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { JobRole } from '../../types';
import { formatDate, formatSalary } from '../../utils/dateUtils';
import { MapPin, DollarSign, Clock } from 'lucide-react';

interface RecentJobsProps {
  jobs: JobRole[];
}

export const RecentJobs: React.FC<RecentJobsProps> = ({ jobs }) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Recent Job Openings</h2>
        <a href="/jobs" className="text-sm text-blue-800 hover:text-blue-900">View all</a>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          {jobs.map((job) => (
            <div key={job.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-base font-medium text-gray-900">{job.title}</h3>
                    {job.isNew && <Badge variant="new" className="ml-2">New</Badge>}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{job.company}</p>
                </div>
                <Badge variant={job.status === 'open' ? 'success' : 'secondary'}>
                  {job.status === 'open' ? 'Open' : job.status === 'filled' ? 'Filled' : 'Closed'}
                </Badge>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-y-2">
                <div className="flex items-center text-sm text-gray-500 mr-4">
                  <MapPin size={16} className="mr-1" />
                  {job.location}
                </div>
                <div className="flex items-center text-sm text-gray-500 mr-4">
                  <DollarSign size={16} className="mr-1" />
                  {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock size={16} className="mr-1" />
                  Posted {formatDate(job.postedDate)}
                </div>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {job.requirements.slice(0, 3).map((req, index) => (
                  <Badge key={index} variant="secondary">{req}</Badge>
                ))}
                {job.requirements.length > 3 && (
                  <Badge variant="secondary">+{job.requirements.length - 3} more</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};