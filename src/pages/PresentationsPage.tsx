import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { presentations, candidates, jobRoles } from '../data/mockData';
import { formatDate } from '../utils/dateUtils';
import { Search, Plus, Filter, ArrowUpDown } from 'lucide-react';

export const PresentationsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Define the steps in the hiring process
  const hiringSteps = ['Submitted', 'Screening', 'Interview', 'Technical', 'Offer'];
  
  // Map status to step index and badge variant
  const statusConfig: Record<string, { stepIndex: number, variant: string }> = {
    'submitted': { stepIndex: 0, variant: 'primary' },
    'screening': { stepIndex: 1, variant: 'primary' },
    'interview': { stepIndex: 2, variant: 'primary' },
    'technical': { stepIndex: 3, variant: 'primary' },
    'offer': { stepIndex: 4, variant: 'success' },
    'rejected': { stepIndex: -1, variant: 'danger' },
    'accepted': { stepIndex: 5, variant: 'success' }
  };
  
  const filteredPresentations = presentations
    .filter(presentation => {
      if (statusFilter && presentation.status !== statusFilter) return false;
      
      const candidate = candidates.find(c => c.id === presentation.candidateId);
      const job = jobRoles.find(j => j.id === presentation.jobRoleId);
      
      if (!candidate || !job) return false;
      
      return (
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
  
  // Helper to get candidate and job details
  const getDetails = (presentation: any) => {
    const candidate = candidates.find(c => c.id === presentation.candidateId);
    const job = jobRoles.find(j => j.id === presentation.jobRoleId);
    return { candidate, job };
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Presentations</h1>
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search presentations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <select
            className="border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
            value={statusFilter || ''}
            onChange={(e) => setStatusFilter(e.target.value || null)}
          >
            <option value="">All Statuses</option>
            <option value="submitted">Submitted</option>
            <option value="screening">Screening</option>
            <option value="interview">Interview</option>
            <option value="technical">Technical</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
            <option value="accepted">Accepted</option>
          </select>
          
          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus size={16} />}
          >
            New Presentation
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {filteredPresentations.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              <p>No presentations found matching your criteria</p>
            </CardContent>
          </Card>
        ) : (
          filteredPresentations.map(presentation => {
            const { candidate, job } = getDetails(presentation);
            if (!candidate || !job) return null;
            
            const config = statusConfig[presentation.status];
            
            return (
              <Card key={presentation.id} className="hover:shadow-md transition-shadow overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        {candidate.avatar ? (
                          <img 
                            src={candidate.avatar} 
                            alt={candidate.name} 
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-800 font-medium">
                              {candidate.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{candidate.name}</h3>
                          <p className="text-sm text-gray-600">Candidate</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company}</p>
                      </div>
                      
                      <Badge variant={config.variant}>
                        {presentation.status.charAt(0).toUpperCase() + presentation.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  
                  {presentation.status !== 'rejected' && (
                    <ProgressBar 
                      steps={hiringSteps}
                      currentStep={config.stepIndex}
                      className="mb-4"
                    />
                  )}
                  
                  <div className="flex flex-wrap justify-between items-center gap-4 mt-4">
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-gray-500">Submitted:</span> {formatDate(presentation.submittedDate)}
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Last updated:</span> {formatDate(presentation.lastUpdated)}
                      </div>
                      {presentation.nextStep && (
                        <div className="text-sm font-medium text-blue-800">
                          Next: {presentation.nextStep.type} on {formatDate(presentation.nextStep.date)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="primary" size="sm">Update Status</Button>
                    </div>
                  </div>
                  
                  {presentation.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm text-gray-700">
                      <p className="font-medium text-gray-900 mb-1">Notes:</p>
                      {presentation.notes}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};