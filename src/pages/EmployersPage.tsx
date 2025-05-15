import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useEmployers } from '../hooks/useDashboard';
import { Search, Plus, Filter, Building2, Users, Clock, TrendingUp, Phone, Mail } from 'lucide-react';

export const EmployersPage: React.FC = () => {
  const { employers } = useEmployers();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployers = employers.filter(employer =>
    employer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employer.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Employers</h1>
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search employers..."
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
            Add Employer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredEmployers.map(employer => (
          <Card key={employer.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center space-x-4">
                  {employer.logo ? (
                    <img
                      src={employer.logo}
                      alt={employer.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Building2 size={32} className="text-blue-600" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{employer.name}</h2>
                    <div className="flex items-center mt-1 space-x-2">
                      <Badge variant="secondary">{employer.industry}</Badge>
                      <span className="text-sm text-gray-500">{employer.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="primary" size="sm">Manage Jobs</Button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Pipeline Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Active Jobs</span>
                      <Badge variant="primary">{employer.metrics.activeJobs}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Active Candidates</span>
                      <Badge variant="secondary">{employer.metrics.activeCandidates}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Placements</span>
                      <Badge variant="success">{employer.metrics.totalPlacements}</Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Performance Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Success Rate</span>
                      <span className="font-medium text-green-600">{employer.metrics.successRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg. Time to Hire</span>
                      <span className="font-medium text-blue-600">{employer.metrics.averageTimeToHire} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Fill Rate</span>
                      <span className="font-medium text-purple-600">
                        {Math.round((employer.metrics.totalPlacements / employer.metrics.totalJobs) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Users size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{employer.contactInfo.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail size={16} className="text-gray-400 mr-2" />
                      <a href={`mailto:${employer.contactInfo.email}`} className="text-sm text-blue-600 hover:text-blue-800">
                        {employer.contactInfo.email}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Phone size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{employer.contactInfo.phone}</span>
                    </div>
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