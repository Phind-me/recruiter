import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { usePresentations, useCandidates, useJobs } from '../hooks/useDashboard';
import { formatDate } from '../utils/dateUtils';
import { 
  ArrowLeft,
  Users,
  Briefcase,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

export const PresentationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { presentations } = usePresentations();
  const { candidates } = useCandidates();
  const { jobs } = useJobs();

  const presentation = presentations.find(p => p.id === id);
  const candidate = presentation ? candidates.find(c => c.id === presentation.candidateId) : null;
  const job = presentation ? jobs.find(j => j.id === presentation.jobRoleId) : null;

  if (!presentation || !candidate || !job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Presentation not found</h2>
        <Button
          variant="primary"
          className="mt-4"
          onClick={() => navigate('/presentations')}
        >
          Back to Presentations
        </Button>
      </div>
    );
  }

  const hiringSteps = ['Submitted', 'Screening', 'Interview', 'Technical', 'Offer'];
  const currentStep = hiringSteps.indexOf(presentation.status);

  // Create a map of job requirements by skill name for easy lookup
  const jobRequirements = job.requirements.reduce((acc, req) => {
    acc[req.name] = req;
    return acc;
  }, {} as Record<string, any>);

  // Analyze skill match
  const skillAnalysis = candidate.skills.map(skill => {
    const requirement = jobRequirements[skill.name];
    return {
      ...skill,
      match: requirement ? {
        required: requirement.isRequired,
        meetsYears: skill.years >= requirement.yearsRequired,
        yearsRequired: requirement.yearsRequired
      } : null
    };
  });

  // Calculate match statistics
  const matchStats = {
    total: job.requirements.length,
    matched: skillAnalysis.filter(s => s.match).length,
    exceeds: skillAnalysis.filter(s => s.match && s.years > s.match.yearsRequired).length,
    missing: job.requirements.filter(req => 
      !candidate.skills.some(s => s.name === req.name)
    ).length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate('/presentations')}
          className="text-gray-600"
          leftIcon={<ArrowLeft size={20} />}
        >
          Back to Presentations
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Overview */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {candidate.name} → {job.title}
                    </h1>
                  </div>
                  <p className="text-lg text-gray-600 mt-1">{job.company}</p>
                </div>
                <Badge 
                  variant={
                    presentation.status === 'rejected' ? 'danger' :
                    presentation.status === 'accepted' ? 'success' :
                    'primary'
                  }
                >
                  {presentation.status}
                </Badge>
              </div>

              {presentation.status !== 'rejected' && (
                <div className="mt-6">
                  <ProgressBar 
                    steps={hiringSteps}
                    currentStep={currentStep}
                  />
                </div>
              )}

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="flex items-center text-gray-600">
                  <Calendar size={18} className="mr-2" />
                  <span>Submitted: {formatDate(presentation.submittedDate)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={18} className="mr-2" />
                  <span>Updated: {formatDate(presentation.lastUpdated)}</span>
                </div>
                {presentation.nextStep && (
                  <div className="flex items-center text-blue-600 font-medium">
                    <Calendar size={18} className="mr-2" />
                    <span>Next: {presentation.nextStep.type} ({formatDate(presentation.nextStep.date)})</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Skills Comparison */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Skills Analysis</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Candidate Skills */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Candidate Skills</h3>
                  <div className="space-y-4">
                    {skillAnalysis.map((skill, index) => (
                      <div 
                        key={index}
                        className="p-4 border rounded-lg bg-gray-50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{skill.name}</h4>
                          <Badge variant={
                            !skill.match ? 'secondary' :
                            skill.match.meetsYears ? 'success' : 'danger'
                          }>
                            {skill.years} years
                          </Badge>
                        </div>
                        {skill.match && (
                          <div className="text-sm">
                            {skill.match.meetsYears ? (
                              <span className="text-green-600">
                                Meets requirement ({skill.match.yearsRequired}+ years)
                              </span>
                            ) : (
                              <span className="text-red-600">
                                Below requirement ({skill.match.yearsRequired}+ years needed)
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Job Requirements */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Job Requirements</h3>
                  <div className="space-y-4">
                    {job.requirements.map((req, index) => {
                      const candidateSkill = candidate.skills.find(
                        s => s.name === req.name
                      );
                      
                      return (
                        <div 
                          key={index}
                          className="p-4 border rounded-lg bg-gray-50"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{req.name}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant={req.isRequired ? 'primary' : 'secondary'}>
                                {req.isRequired ? 'Required' : 'Preferred'}
                              </Badge>
                              <Badge variant="secondary">
                                {req.yearsRequired}+ years
                              </Badge>
                            </div>
                          </div>
                          {candidateSkill ? (
                            <div className="text-sm">
                              {candidateSkill.years >= req.yearsRequired ? (
                                <span className="text-green-600">
                                  Candidate exceeds requirement ({candidateSkill.years} years)
                                </span>
                              ) : (
                                <span className="text-red-600">
                                  Candidate has {candidateSkill.years} years (needs {req.yearsRequired}+)
                                </span>
                              )}
                            </div>
                          ) : (
                            <div className="text-sm text-red-600">
                              Skill not found in candidate profile
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {presentation.notes && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Notes</h2>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 whitespace-pre-line">{presentation.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Match Summary */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Match Summary</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle2 size={20} className="text-green-500 mr-2" />
                    <span className="text-gray-600">Skills Matched</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {matchStats.matched}/{matchStats.total}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertCircle size={20} className="text-yellow-500 mr-2" />
                    <span className="text-gray-600">Missing Skills</span>
                  </div>
                  <span className="font-medium text-gray-900">{matchStats.missing}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users size={20} className="text-blue-500 mr-2" />
                    <span className="text-gray-600">Exceeds Requirements</span>
                  </div>
                  <span className="font-medium text-gray-900">{matchStats.exceeds}</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-green-500 rounded-full"
                    style={{ 
                      width: `${(matchStats.matched / matchStats.total) * 100}%` 
                    }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Overall match score: {Math.round((matchStats.matched / matchStats.total) * 100)}%
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full"
                  onClick={() => navigate(`/candidates/${candidate.id}`)}
                >
                  View Candidate Profile
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={() => navigate(`/jobs/${job.id}`)}
                >
                  View Job Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};