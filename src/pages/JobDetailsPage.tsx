import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useJobs, usePresentations, useCandidates } from '../hooks/useDashboard';
import { formatDate, formatSalary } from '../utils/dateUtils';
import { 
  ArrowLeft, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Clock, 
  Users,
  CheckCircle,
  XCircle,
  Briefcase
} from 'lucide-react';

export const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { jobs } = useJobs();
  const { presentations } = usePresentations();
  const { candidates } = useCandidates();

  const job = jobs.find(j => j.id === id);
  const jobPresentations = presentations.filter(p => p.jobRoleId === id);

  if (!job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Job not found</h2>
        <Button
          variant="primary"
          className="mt-4"
          onClick={() => navigate('/jobs')}
        >
          Back to Jobs
        </Button>
      </div>
    );
  }

  const stats = {
    totalCandidates: jobPresentations.length,
    inProgress: jobPresentations.filter(p => !['rejected', 'accepted'].includes(p.status)).length,
    accepted: jobPresentations.filter(p => p.status === 'accepted').length,
    rejected: jobPresentations.filter(p => p.status === 'rejected').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate('/jobs')}
          className="text-gray-600"
          leftIcon={<ArrowLeft size={20} />}
        >
          Back to Jobs
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Job Overview */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                    {job.isNew && <Badge variant="new">New</Badge>}
                  </div>
                  <p className="text-lg text-gray-600 mt-1">{job.company}</p>
                </div>
                <Badge 
                  variant={job.status === 'open' ? 'success' : 'secondary'}
                  className="text-sm"
                >
                  {job.status}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="flex items-center text-gray-600">
                  <MapPin size={18} className="mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign size={18} className="mr-2" />
                  <span>{formatSalary(job.salary.min, job.salary.max, job.salary.currency)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar size={18} className="mr-2" />
                  <span>Posted {formatDate(job.postedDate)}</span>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h2>
                <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Required Skills */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Required Skills</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.requirements.map((req, index) => (
                  <div
                    key={index}
                    className={`rounded-lg p-4 border ${
                      req.isRequired 
                        ? 'border-blue-100 bg-blue-50' 
                        : 'border-gray-100 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{req.name}</h3>
                      <Badge variant={req.isRequired ? 'primary' : 'secondary'}>
                        {req.isRequired ? 'Required' : 'Preferred'}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={16} className="mr-2" />
                      <span>{req.yearsRequired}+ years experience</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Candidate Applications */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Candidate Applications</h2>
            </CardHeader>
            <CardContent className="p-6">
              {jobPresentations.length === 0 ? (
                <p className="text-center text-gray-500">No applications yet</p>
              ) : (
                <div className="space-y-4">
                  {jobPresentations.map(presentation => {
                    const candidate = candidates.find(c => c.id === presentation.candidateId);
                    if (!candidate) return null;

                    return (
                      <div 
                        key={presentation.id}
                        className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center">
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
                          <div className="ml-4">
                            <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                            <p className="text-sm text-gray-500">
                              Applied {formatDate(presentation.submittedDate)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant={
                            presentation.status === 'rejected' ? 'danger' :
                            presentation.status === 'accepted' ? 'success' :
                            'primary'
                          }>
                            {presentation.status}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/candidates/${candidate.id}`)}
                          >
                            View Profile
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card>
            <CardContent className="p-6">
              <Button variant="primary" size="lg" className="w-full mb-3">
                Find Candidates
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                Edit Job
              </Button>
            </CardContent>
          </Card>

          {/* Job Stats */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Application Stats</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users size={20} className="text-gray-400 mr-2" />
                    <span className="text-gray-600">Total Candidates</span>
                  </div>
                  <span className="font-medium text-gray-900">{stats.totalCandidates}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Briefcase size={20} className="text-blue-400 mr-2" />
                    <span className="text-gray-600">In Progress</span>
                  </div>
                  <span className="font-medium text-blue-600">{stats.inProgress}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle size={20} className="text-green-400 mr-2" />
                    <span className="text-gray-600">Accepted</span>
                  </div>
                  <span className="font-medium text-green-600">{stats.accepted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <XCircle size={20} className="text-red-400 mr-2" />
                    <span className="text-gray-600">Rejected</span>
                  </div>
                  <span className="font-medium text-red-600">{stats.rejected}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deadline */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Important Dates</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Posted Date</p>
                  <div className="flex items-center mt-1">
                    <Calendar size={18} className="text-gray-400 mr-2" />
                    <span className="font-medium text-gray-900">
                      {formatDate(job.postedDate)}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Application Deadline</p>
                  <div className="flex items-center mt-1">
                    <Calendar size={18} className="text-gray-400 mr-2" />
                    <span className="font-medium text-gray-900">
                      {formatDate(job.deadlineDate)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};