import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useCandidates, usePresentations } from '../hooks/useDashboard';
import { formatDate } from '../utils/dateUtils';
import { ArrowLeft, Mail, Phone, Calendar, Briefcase, GraduationCap, Award, Clock } from 'lucide-react';

export const CandidateDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { candidates } = useCandidates();
  const { presentations } = usePresentations();

  const candidate = candidates.find(c => c.id === id);
  const candidatePresentations = presentations.filter(p => p.candidateId === id);

  if (!candidate) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Candidate not found</h2>
        <Button
          variant="primary"
          className="mt-4"
          onClick={() => navigate('/candidates')}
        >
          Back to Candidates
        </Button>
      </div>
    );
  }

  // Mock education data (in a real app, this would come from the API)
  const education = [
    {
      degree: "Master's in Computer Science",
      institution: "Stanford University",
      year: "2018-2020"
    },
    {
      degree: "Bachelor's in Software Engineering",
      institution: "University of California, Berkeley",
      year: "2014-2018"
    }
  ];

  // Mock work experience data
  const experience = [
    {
      role: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      period: "2020-2023",
      description: "Led development of cloud-based applications using React and Node.js"
    },
    {
      role: "Software Engineer",
      company: "Innovation Labs",
      period: "2018-2020",
      description: "Developed and maintained multiple web applications"
    }
  ];

  // Mock certifications
  const certifications = [
    "AWS Certified Solutions Architect",
    "Google Cloud Professional Developer",
    "MongoDB Certified Developer"
  ];

  const hiringSteps = ['Submitted', 'Screening', 'Interview', 'Technical', 'Offer'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate('/candidates')}
          className="text-gray-600"
          leftIcon={<ArrowLeft size={20} />}
        >
          Back to Candidates
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Profile Section */}
        <div className="col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                {candidate.avatar ? (
                  <img
                    src={candidate.avatar}
                    alt={candidate.name}
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-lg bg-blue-100 flex items-center justify-center">
                    <span className="text-2xl font-semibold text-blue-600">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{candidate.name}</h1>
                      <p className="text-gray-600 mt-1">Software Engineer • {candidate.experience} years experience</p>
                    </div>
                    <Badge
                      variant={candidate.status === 'active' ? 'success' : 'secondary'}
                      className="text-sm"
                    >
                      {candidate.status}
                    </Badge>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-600">
                      <Mail size={18} className="mr-2" />
                      <a href={`mailto:${candidate.email}`} className="hover:text-blue-600">
                        {candidate.email}
                      </a>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone size={18} className="mr-2" />
                      <a href={`tel:${candidate.phone}`} className="hover:text-blue-600">
                        {candidate.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Skills & Experience</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {candidate.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{skill.name}</h3>
                        <Badge variant="primary">{skill.years} years</Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock size={16} className="mr-2" />
                        <span>
                          {new Date(skill.startDate).toLocaleDateString('en-US', { 
                            year: 'numeric',
                            month: 'short'
                          })} 
                          {' - '}
                          {new Date(skill.endDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short'
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Notes</h2>
                <p className="text-gray-600">{candidate.notes}</p>
              </div>
            </CardContent>
          </Card>

          {/* Work Experience */}
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Briefcase size={20} className="text-gray-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Work Experience</h2>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4 pb-6 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{exp.role}</h3>
                        <p className="text-gray-600">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500">{exp.period}</span>
                    </div>
                    <p className="mt-2 text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <GraduationCap size={20} className="text-gray-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Education</h2>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4 pb-6 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                        <p className="text-gray-600">{edu.institution}</p>
                      </div>
                      <span className="text-sm text-gray-500">{edu.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Current Status</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Last Employed</p>
                  <div className="flex items-center mt-1">
                    <Calendar size={18} className="text-gray-400 mr-2" />
                    <span className="font-medium text-gray-900">
                      {formatDate(candidate.lastEmployed)}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Days Since Last Job</p>
                  <p className={`font-medium ${
                    candidate.daysSinceLastJob > 180 ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {candidate.daysSinceLastJob} days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Award size={20} className="text-gray-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Certifications</h2>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-center">
                    <Badge variant="success" className="mr-2">✓</Badge>
                    <span className="text-gray-700">{cert}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Active Presentations */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Active Presentations</h2>
            </CardHeader>
            <CardContent className="p-6">
              {candidatePresentations.length === 0 ? (
                <p className="text-gray-500 text-center">No active presentations</p>
              ) : (
                <div className="space-y-6">
                  {candidatePresentations.map((presentation) => (
                    <div key={presentation.id} className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Badge variant={
                          presentation.status === 'rejected' ? 'danger' :
                          presentation.status === 'accepted' ? 'success' :
                          'primary'
                        }>
                          {presentation.status}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {formatDate(presentation.lastUpdated)}
                        </span>
                      </div>

                      {presentation.status !== 'rejected' && (
                        <ProgressBar
                          steps={hiringSteps}
                          currentStep={hiringSteps.indexOf(presentation.status)}
                        />
                      )}

                      {presentation.nextStep && (
                        <div className="text-sm">
                          <span className="font-medium text-blue-600">Next: </span>
                          {presentation.nextStep.type} on {formatDate(presentation.nextStep.date)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};