import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { jobRoles } from '../data/mockData';
import { formatDate, formatSalary } from '../utils/dateUtils';
import { Search, Plus, Filter, ArrowUpDown, MapPin, DollarSign, Calendar } from 'lucide-react';

export const JobsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('postedDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };
  
  const filteredJobs = jobRoles
    .filter(job => 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requirements.some(req => req.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      const factor = sortDirection === 'asc' ? 1 : -1;
      
      switch (sortBy) {
        case 'title':
          return factor * a.title.localeCompare(b.title);
        case 'company':
          return factor * a.company.localeCompare(b.company);
        case 'postedDate':
          return factor * (new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime());
        case 'salary':
          return factor * (a.salary.max - b.salary.max);
        default:
          return 0;
      }
    });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Job Roles</h1>
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button
            variant="outline"
            size="md"
            leftIcon={<Filter size={16} />}
          >
            Filter
          </Button>
          
          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus size={16} />}
          >
            Add Job
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {filteredJobs.map(job => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center flex-wrap gap-2">
                    <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                    {job.isNew && <Badge variant="new">New</Badge>}
                  </div>
                  
                  <div className="flex items-center mt-2">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-700 font-medium">
                        {job.company.slice(0, 2)}
                      </span>
                    </div>
                    <span className="ml-3 text-lg text-gray-700">{job.company}</span>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-y-2">
                    <div className="flex items-center text-sm text-gray-500 mr-4">
                      <MapPin size={16} className="mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mr-4">
                      <DollarSign size={16} className="mr-1" />
                      {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={16} className="mr-1" />
                      Posted {formatDate(job.postedDate)}
                    </div>
                  </div>
                  
                  <p className="mt-4 text-sm text-gray-600">{job.description}</p>
                  
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Requirements:</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="secondary">{req}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 sm:items-end">
                  <Badge 
                    variant={job.status === 'open' ? 'success' : 'secondary'}
                    className="mb-2"
                  >
                    {job.status === 'open' ? 'Open' : job.status === 'filled' ? 'Filled' : 'Closed'}
                  </Badge>
                  
                  <div className="flex gap-2 mt-auto">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="primary" size="sm">Find Candidates</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};