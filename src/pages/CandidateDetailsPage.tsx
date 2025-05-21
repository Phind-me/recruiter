import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ReviewStatusBar } from '../components/ui/ReviewStatusBar';
import { useCandidates, usePresentations } from '../hooks/useDashboard';
import { formatDate } from '../utils/dateUtils';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Clock,
  Plus,
  Save,
  X
} from 'lucide-react';

export const CandidateDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { candidates, createCandidate, updateCandidate } = useCandidates();
  const { presentations } = usePresentations();
  const isCreateMode = id === 'new';
  const [isEditMode, setIsEditMode] = useState(isCreateMode);
  const [reviewStatus, setReviewStatus] = useState<'received' | 'reviewed' | 'firstMeet' | 'accepted' | 'rejected'>('received');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: [] as any[],
    experience: 0,
    lastEmployed: new Date().toISOString().split('T')[0],
    status: 'active' as 'active' | 'placed' | 'on hold',
    notes: '',
    education: [] as any[],
    certifications: [] as string[]
  });

  useEffect(() => {
    if (!isCreateMode && id) {
      const candidate = candidates.find(c => c.id === id);
      if (candidate) {
        setFormData({
          name: candidate.name,
          email: candidate.email,
          phone: candidate.phone,
          skills: candidate.skills,
          experience: candidate.experience,
          lastEmployed: candidate.lastEmployed.split('T')[0],
          status: candidate.status,
          notes: candidate.notes,
          education: [
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
          ],
          certifications: [
            "AWS Certified Solutions Architect",
            "Google Cloud Professional Developer",
            "MongoDB Certified Developer"
          ]
        });
      }
    }
  }, [id, isCreateMode, candidates]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, {
        name: '',
        years: 0,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
      }]
    }));
  };

  const handleSkillChange = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => 
        i === index ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const handleRemoveSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    const candidateData = {
      ...formData,
      daysSinceLastJob: Math.floor((Date.now() - new Date(formData.lastEmployed).getTime()) / (1000 * 60 * 60 * 24))
    };

    if (isCreateMode) {
      createCandidate(candidateData);
      navigate('/candidates');
    } else if (id) {
      updateCandidate(id, candidateData);
      setIsEditMode(false);
    }
  };

  const handleStatusChange = (newStatus: 'received' | 'reviewed' | 'firstMeet' | 'accepted' | 'rejected') => {
    setReviewStatus(newStatus);
    if (id) {
      updateCandidate(id, { status: newStatus === 'accepted' ? 'placed' : 'active' });
    }
  };

  const candidate = !isCreateMode && id ? candidates.find(c => c.id === id) : null;
  const candidatePresentations = !isCreateMode && id ? presentations.filter(p => p.candidateId === id) : [];

  if (!isCreateMode && !candidate) {
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
        {!isCreateMode && !isEditMode && (
          <Button
            variant="primary"
            onClick={() => setIsEditMode(true)}
          >
            Edit Candidate
          </Button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Profile Section */}
        <div className="col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                {!isEditMode && candidate?.avatar ? (
                  <img
                    src={candidate.avatar}
                    alt={candidate.name}
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-lg bg-blue-100 flex items-center justify-center">
                    <span className="text-2xl font-semibold text-blue-600">
                      {formData.name ? formData.name.split(' ').map(n => n[0]).join('') : '?'}
                    </span>
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="text-2xl font-bold text-gray-900 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                          placeholder="Candidate Name"
                        />
                      ) : (
                        <h1 className="text-2xl font-bold text-gray-900">{formData.name}</h1>
                      )}
                      {isEditMode ? (
                        <div className="flex items-center gap-2 mt-1">
                          <input
                            type="number"
                            value={formData.experience}
                            onChange={(e) => handleInputChange('experience', parseInt(e.target.value))}
                            className="w-16 text-gray-600 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                          />
                          <span className="text-gray-600">years experience</span>
                        </div>
                      ) : (
                        <p className="text-gray-600 mt-1">
                          Software Engineer • {formData.experience} years experience
                        </p>
                      )}
                    </div>
                    {isEditMode ? (
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="border border-gray-300 rounded-md px-2 py-1"
                      >
                        <option value="active">Active</option>
                        <option value="placed">Placed</option>
                        <option value="on hold">On Hold</option>
                      </select>
                    ) : (
                      <Badge
                        variant={formData.status === 'active' ? 'success' : 'secondary'}
                        className="text-sm"
                      >
                        {formData.status}
                      </Badge>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-600">
                      <Mail size={18} className="mr-2" />
                      {isEditMode ? (
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                          placeholder="Email"
                        />
                      ) : (
                        <a href={`mailto:${formData.email}`} className="hover:text-blue-600">
                          {formData.email}
                        </a>
                      )}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone size={18} className="mr-2" />
                      {isEditMode ? (
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                          placeholder="Phone"
                        />
                      ) : (
                        <a href={`tel:${formData.phone}`} className="hover:text-blue-600">
                          {formData.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Status Bar */}
              {!isCreateMode && !isEditMode && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Review Status</h3>
                  <ReviewStatusBar
                    currentStatus={reviewStatus}
                    onStatusChange={handleStatusChange}
                  />
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-gray-900">Skills & Experience</h2>
                  {isEditMode && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddSkill}
                      leftIcon={<Plus size={16} />}
                    >
                      Add Skill
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-100"
                    >
                      {isEditMode ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                              className="font-medium text-gray-900 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                              placeholder="Skill name"
                            />
                            <button
                              onClick={() => handleRemoveSkill(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={skill.years}
                              onChange={(e) => handleSkillChange(index, 'years', parseInt(e.target.value))}
                              className="w-16 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                            />
                            <span className="text-gray-600">years</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-xs text-gray-500">Start Date</label>
                              <input
                                type="date"
                                value={skill.startDate}
                                onChange={(e) => handleSkillChange(index, 'startDate', e.target.value)}
                                className="w-full border rounded-md px-2 py-1 mt-1"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-500">End Date</label>
                              <input
                                type="date"
                                value={skill.endDate}
                                onChange={(e) => handleSkillChange(index, 'endDate', e.target.value)}
                                className="w-full border rounded-md px-2 py-1 mt-1"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
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
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Notes</h2>
                {isEditMode ? (
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="w-full h-32 border rounded-md p-2 focus:border-blue-500 focus:outline-none"
                    placeholder="Add notes about the candidate..."
                  />
                ) : (
                  <p className="text-gray-600">{formData.notes}</p>
                )}
              </div>

              {isEditMode && (
                <div className="mt-6 flex justify-end gap-2">
                  {!isCreateMode && (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditMode(false)}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    onClick={handleSave}
                    leftIcon={<Save size={16} />}
                  >
                    {isCreateMode ? 'Create Candidate' : 'Save Changes'}
                  </Button>
                </div>
              )}
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
                {formData.education.map((exp, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4 pb-6 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{exp.degree}</h3>
                        <p className="text-gray-600">{exp.institution}</p>
                      </div>
                      <span className="text-sm text-gray-500">{exp.year}</span>
                    </div>
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
                {formData.education.map((edu, index) => (
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
        {!isCreateMode && (
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
                      {isEditMode ? (
                        <input
                          type="date"
                          value={formData.lastEmployed}
                          onChange={(e) => handleInputChange('lastEmployed', e.target.value)}
                          className="border rounded-md px-2 py-1"
                        />
                      ) : (
                        <span className="font-medium text-gray-900">
                          {formatDate(formData.lastEmployed)}
                        </span>
                      )}
                    </div>
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
                  {formData.certifications.map((cert, index) => (
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
        )}
      </div>
    </div>
  );
};

export default CandidateDetailsPage;