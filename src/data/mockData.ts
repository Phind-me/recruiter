import { Candidate, JobRole, Presentation, DashboardMetrics, Employer } from '../types';

export const candidates: Candidate[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '(555) 123-4567',
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
    experience: 5,
    lastEmployed: '2023-02-15',
    daysSinceLastJob: 410,
    status: 'active',
    notes: 'Looking for remote opportunities in tech',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    name: 'Samantha Chen',
    email: 'samantha.chen@example.com',
    phone: '(555) 987-6543',
    skills: ['Product Management', 'Agile', 'Data Analysis', 'UX Research'],
    experience: 7,
    lastEmployed: '2023-11-30',
    daysSinceLastJob: 130,
    status: 'active',
    notes: 'Prefers roles in fintech or healthtech',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '3',
    name: 'Marcus Williams',
    email: 'marcus.williams@example.com',
    phone: '(555) 234-5678',
    skills: ['Java', 'Spring Boot', 'Microservices', 'AWS'],
    experience: 8,
    lastEmployed: '2023-08-15',
    daysSinceLastJob: 237,
    status: 'active',
    notes: 'Interested in senior engineering roles',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '4',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    phone: '(555) 876-5432',
    skills: ['Data Science', 'Python', 'Machine Learning', 'SQL'],
    experience: 4,
    lastEmployed: '2024-02-28',
    daysSinceLastJob: 40,
    status: 'active',
    notes: 'PhD in Computer Science, seeking data science roles',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '5',
    name: 'David Kim',
    email: 'david.kim@example.com',
    phone: '(555) 345-6789',
    skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Prototyping'],
    experience: 6,
    lastEmployed: '2023-05-10',
    daysSinceLastJob: 334,
    status: 'active',
    notes: 'Portfolio showcases strong mobile design work',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
];

export const jobRoles: JobRole[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA (Remote)',
    description: 'Seeking an experienced frontend developer to join our product team.',
    requirements: ['5+ years experience', 'React expertise', 'TypeScript', 'Performance optimization'],
    salary: {
      min: 120000,
      max: 160000,
      currency: 'USD'
    },
    postedDate: '2024-03-20',
    deadlineDate: '2024-04-20',
    status: 'open',
    isNew: true
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'FinanceApp Inc',
    location: 'New York, NY (Hybrid)',
    description: 'Lead product development for our consumer finance application.',
    requirements: ['3+ years PM experience', 'Finance industry knowledge', 'Data-driven decision making'],
    salary: {
      min: 110000,
      max: 140000,
      currency: 'USD'
    },
    postedDate: '2024-03-15',
    deadlineDate: '2024-04-15',
    status: 'open',
    isNew: true
  },
  {
    id: '3',
    title: 'Backend Engineer',
    company: 'DataFlow Systems',
    location: 'Austin, TX (On-site)',
    description: 'Develop and maintain APIs and microservices for our enterprise platform.',
    requirements: ['Java/Spring Boot', 'Microservices architecture', 'AWS', 'Performance optimization'],
    salary: {
      min: 130000,
      max: 170000,
      currency: 'USD'
    },
    postedDate: '2024-03-05',
    deadlineDate: '2024-04-05',
    status: 'open',
    isNew: false
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'HealthTech Innovations',
    location: 'Boston, MA (Remote)',
    description: 'Apply machine learning to healthcare data to improve patient outcomes.',
    requirements: ['ML expertise', 'Python', 'Healthcare experience preferred', 'PhD a plus'],
    salary: {
      min: 125000,
      max: 155000,
      currency: 'USD'
    },
    postedDate: '2024-03-18',
    deadlineDate: '2024-04-18',
    status: 'open',
    isNew: true
  },
  {
    id: '5',
    title: 'UX Designer',
    company: 'Creative Digital Agency',
    location: 'Los Angeles, CA (Hybrid)',
    description: 'Design intuitive user experiences for various client projects.',
    requirements: ['3+ years UX experience', 'Portfolio of work', 'User research skills', 'Figma expertise'],
    salary: {
      min: 95000,
      max: 130000,
      currency: 'USD'
    },
    postedDate: '2024-03-10',
    deadlineDate: '2024-04-10',
    status: 'open',
    isNew: false
  },
];

export const presentations: Presentation[] = [
  {
    id: '1',
    candidateId: '1',
    jobRoleId: '1',
    status: 'interview',
    submittedDate: '2024-03-21',
    lastUpdated: '2024-03-25',
    notes: 'Technical interview scheduled for next week',
    nextStep: {
      type: 'Technical Interview',
      date: '2024-04-05'
    }
  },
  {
    id: '2',
    candidateId: '2',
    jobRoleId: '2',
    status: 'screening',
    submittedDate: '2024-03-16',
    lastUpdated: '2024-03-22',
    notes: 'Passed initial recruiter screening, waiting for hiring manager review',
    nextStep: {
      type: 'Manager Screen',
      date: '2024-04-01'
    }
  },
  {
    id: '3',
    candidateId: '3',
    jobRoleId: '3',
    status: 'technical',
    submittedDate: '2024-03-10',
    lastUpdated: '2024-03-20',
    notes: 'Completed technical assessment, awaiting feedback',
    nextStep: {
      type: 'Final Interview',
      date: '2024-03-30'
    }
  },
  {
    id: '4',
    candidateId: '4',
    jobRoleId: '4',
    status: 'submitted',
    submittedDate: '2024-03-19',
    lastUpdated: '2024-03-19',
    notes: 'Resume submitted, waiting for initial feedback',
    nextStep: {
      type: 'Initial Screening',
      date: '2024-03-28'
    }
  },
  {
    id: '5',
    candidateId: '5',
    jobRoleId: '5',
    status: 'offer',
    submittedDate: '2024-03-12',
    lastUpdated: '2024-03-26',
    notes: 'Verbal offer extended, waiting for formal offer letter',
    nextStep: {
      type: 'Offer Acceptance',
      date: '2024-04-02'
    }
  },
  {
    id: '6',
    candidateId: '1',
    jobRoleId: '3',
    status: 'rejected',
    submittedDate: '2024-03-05',
    lastUpdated: '2024-03-15',
    notes: 'Client felt candidate lacked sufficient Java experience',
    nextStep: undefined
  },
];

export const dashboardMetrics: DashboardMetrics = {
  activeCandidates: candidates.filter(c => c.status === 'active').length,
  openRoles: jobRoles.filter(j => j.status === 'open').length,
  pendingPresentations: presentations.filter(p => !['rejected', 'accepted'].includes(p.status)).length,
  recentPlacements: presentations.filter(p => p.status === 'accepted').length,
  urgentCandidates: candidates.filter(c => c.daysSinceLastJob > 180 && c.status === 'active').length,
  upcomingInterviews: presentations.filter(p => 
    p.nextStep && 
    new Date(p.nextStep.date) > new Date() && 
    new Date(p.nextStep.date) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  ).length
};

export const employers: Employer[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    logo: 'https://images.pexels.com/photos/2977565/pexels-photo-2977565.jpeg?auto=compress&cs=tinysrgb&w=300',
    industry: 'Technology',
    location: 'San Francisco, CA',
    metrics: {
      totalJobs: 15,
      activeJobs: 8,
      totalPlacements: 12,
      activeCandidates: 6,
      successRate: 80,
      averageTimeToHire: 25
    },
    contactInfo: {
      name: 'Sarah Chen',
      email: 'sarah.chen@techcorp.com',
      phone: '(555) 123-4567',
      role: 'Head of Talent Acquisition'
    }
  },
  {
    id: '2',
    name: 'FinanceApp Inc',
    logo: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=300',
    industry: 'FinTech',
    location: 'New York, NY',
    metrics: {
      totalJobs: 10,
      activeJobs: 4,
      totalPlacements: 8,
      activeCandidates: 5,
      successRate: 75,
      averageTimeToHire: 30
    },
    contactInfo: {
      name: 'Michael Rodriguez',
      email: 'm.rodriguez@financeapp.com',
      phone: '(555) 987-6543',
      role: 'Recruiting Manager'
    }
  },
  {
    id: '3',
    name: 'HealthTech Innovations',
    logo: 'https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=300',
    industry: 'Healthcare Technology',
    location: 'Boston, MA',
    metrics: {
      totalJobs: 8,
      activeJobs: 3,
      totalPlacements: 6,
      activeCandidates: 4,
      successRate: 85,
      averageTimeToHire: 28
    },
    contactInfo: {
      name: 'Emily Thompson',
      email: 'e.thompson@healthtech.com',
      phone: '(555) 234-5678',
      role: 'Senior Technical Recruiter'
    }
  }
];