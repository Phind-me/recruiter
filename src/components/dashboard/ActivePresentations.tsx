import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Presentation, Candidate, JobRole } from '../../types';
import { timeAgo } from '../../utils/dateUtils';

interface ActivePresentationsProps {
  presentations: Presentation[];
  candidates: Candidate[];
  jobRoles: JobRole[];
}

export const ActivePresentations: React.FC<ActivePresentationsProps> = ({ 
  presentations, 
  candidates, 
  jobRoles 
}) => {
  // Filter active presentations (not rejected or accepted)
  const activePresentations = presentations
    .filter(p => !['rejected', 'accepted'].includes(p.status))
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
  
  // Define the steps in the hiring process
  const hiringSteps = ['Submitted', 'Screening', 'Interview', 'Technical', 'Offer'];
  
  // Map status to step index
  const statusToStepIndex = {
    'submitted': 0,
    'screening': 1,
    'interview': 2,
    'technical': 3,
    'offer': 4,
    'rejected': -1,
    'accepted': 5
  };
  
  // Helper to get candidate and job details
  const getDetails = (presentation: Presentation) => {
    const candidate = candidates.find(c => c.id === presentation.candidateId);
    const job = jobRoles.find(j => j.id === presentation.jobRoleId);
    return { candidate, job };
  };
  
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Active Presentations</h2>
        <a href="/presentations" className="text-sm text-blue-800 hover:text-blue-900">View all</a>
      </CardHeader>
      
      <CardContent className="p-0">
        {activePresentations.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <p>No active presentations at this time</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {activePresentations.slice(0, 3).map((presentation) => {
              const { candidate, job } = getDetails(presentation);
              const currentStep = statusToStepIndex[presentation.status];
              
              if (!candidate || !job) return null;
              
              return (
                <div key={presentation.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-base font-medium text-gray-900">{candidate.name}</h3>
                      <p className="text-sm text-gray-600">{job.title} at {job.company}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      Updated {timeAgo(presentation.lastUpdated)}
                    </span>
                  </div>
                  
                  <ProgressBar 
                    steps={hiringSteps}
                    currentStep={currentStep}
                    className="mb-3"
                  />
                  
                  {presentation.nextStep && (
                    <div className="mt-3 text-sm">
                      <span className="font-medium text-blue-800">Next: </span>
                      <span>{presentation.nextStep.type} on {new Date(presentation.nextStep.date).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};