import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useEmployers, useJobs, usePresentations } from '../hooks/useDashboard';
import { 
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  MapPin,
  Users,
  Briefcase,
  Clock,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

export const EmployerDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { employers } = useEmployers();
  const { jobs } = useJobs();
  const { presentations } = usePresentations();

  const employer = employers.find(e => e.id === id);
  const employerJobs = jobs.filter(j => j.company === employer?.name);

  if (!employer) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Employer not found</h2>
        <Button
          variant="primary"
          className="mt-4"
          onClick={() => navigate('/employers')}
        >
          Back to Employers
        </Button>
      </div>
    );
  }

  // Calculate additional metrics
  const activeJobsCount = employerJobs.filter(j => j.status === 'open').length;
  const recentPlacements = presentations.filter(p => {
    const job = jobs.find(j => j.id === p.jobRoleId);
    return job?.company === employer.name && p.status === 'accepted';
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate('/employers')}
          className="text-gray-600"
          leftIcon={<ArrowLeft size={20} />}
        >
          Back to Employers
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Company Overview */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                {employer.logo ? (
                  <img
                    src={employer.logo}
                    alt={employer.name}
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Building2 size={40} className="text-blue-600" />
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{employer.name}</h1>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{employer.industry}</Badge>
                        <span className="text-gray-500">{employer.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-600">
                      <Mail size={18} className="mr-2" />
                      <a href={`mailto:${employer.contactInfo.email}`} className="hover:text-blue-600">
                        {employer.contactInfo.email}
                      </a>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone size={18} className="mr-2" />
                      <a href={`tel:${employer.contactInfo.phone}`} className="hover:text-blue-600">
                        {employer.contactInfo.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Performance Metrics</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-medium text-green-600">{employer.metrics.successRate}%</span>
                    </div>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-green-500 rounded-full"
                        style={{ width: `${employer.metrics.successRate}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Average Time to Hire</span>
                      <span className="font-medium text-blue-600">{employer.metrics.averageTimeToHire} days</span>
                    </div>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${(employer.metrics.averageTimeToHire / 60) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Placements</span>
                    <Badge variant="success">{employer.metrics.totalPlacements}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Active Candidates</span>
                    <Badge variant="primary">{employer.metrics.activeCandidates}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Fill Rate</span>
                    <Badge variant="secondary">
                      {Math.round((employer.metrics.totalPlacements / employer.metrics.totalJobs) * 100)}%
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Jobs */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Active Job Listings</h2>
            </CardHeader>
            <CardContent className="p-6">
              {employerJobs.length === 0 ? (
                <p className="text-center text-gray-500">No active job listings</p>
              ) : (
                <div className="space-y-4">
                  {employerJobs.map(job => (
                    <div 
                      key={job.id}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{job.title}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                            <div className="flex items-center">
                              <MapPin size={16} className="mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center">
                              <Clock size={16} className="mr-1" />
                              Posted {formatDate(job.postedDate)}
                            </div>
                          </div>
                        </div>
                        <Badge variant={job.status === 'open' ? 'success' : 'secondary'}>
                          {job.status}
                        </Badge>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {job.requirements.slice(0, 3).map((req, index) => (
                          <Badge key={index} variant="secondary">
                            {req.name} ({req.yearsRequired}+ years)
                          </Badge>
                        ))}
                        {job.requirements.length > 3 && (
                          <Badge variant="secondary">+{job.requirements.length - 3} more</Badge>
                        )}
                      </div>
                      <div className="mt-3 flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/jobs/${job.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Quick Stats</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Briefcase size={20} className="text-blue-500 mr-2" />
                    <span className="text-gray-600">Active Jobs</span>
                  </div>
                  <span className="font-medium text-gray-900">{activeJobsCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users size={20} className="text-green-500 mr-2" />
                    <span className="text-gray-600">Active Candidates</span>
                  </div>
                  <span className="font-medium text-gray-900">{employer.metrics.activeCandidates}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle size={20} className="text-purple-500 mr-2" />
                    <span className="text-gray-600">Recent Placements</span>
                  </div>
                  <span className="font-medium text-gray-900">{recentPlacements}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Primary Contact</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Name</label>
                  <p className="font-medium text-gray-900">{employer.contactInfo.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Role</label>
                  <p className="font-medium text-gray-900">{employer.contactInfo.role}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p>
                    <a 
                      href={`mailto:${employer.contactInfo.email}`}
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      {employer.contactInfo.email}
                    </a>
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Phone</label>
                  <p>
                    <a 
                      href={`tel:${employer.contactInfo.phone}`}
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      {employer.contactInfo.phone}
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                <Button variant="primary" size="lg" className="w-full">
                  Create New Job
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  Schedule Meeting
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};