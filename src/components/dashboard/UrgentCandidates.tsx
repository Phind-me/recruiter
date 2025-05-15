import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Candidate } from '../../types';
import { Button } from '../ui/Button';
import { formatDate } from '../../utils/dateUtils';
import { AlertCircle } from 'lucide-react';

interface UrgentCandidatesProps {
  candidates: Candidate[];
}

export const UrgentCandidates: React.FC<UrgentCandidatesProps> = ({ candidates }) => {
  // Filter and sort candidates by days since last job (most urgent first)
  const urgentCandidates = candidates
    .filter(candidate => candidate.daysSinceLastJob > 180 && candidate.status === 'active')
    .sort((a, b) => b.daysSinceLastJob - a.daysSinceLastJob);
  
  return (
    <Card>
      <CardHeader className="flex items-center justify-between bg-red-50">
        <div className="flex items-center">
          <AlertCircle size={20} className="text-red-600 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Urgent Placement Needed</h2>
        </div>
        <Badge variant="danger">{urgentCandidates.length} candidates</Badge>
      </CardHeader>
      
      <CardContent className="p-0">
        {urgentCandidates.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <p>No candidates currently need urgent placement</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {urgentCandidates.map((candidate) => (
              <div key={candidate.id} className="p-4 hover:bg-gray-50 transition-colors">
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
                  
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-medium text-gray-900">{candidate.name}</h3>
                      <Badge 
                        variant="danger"
                        className="animate-pulse"
                      >
                        {candidate.daysSinceLastJob} days
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Last employed: {formatDate(candidate.lastEmployed)}
                    </p>
                  </div>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {candidate.skills.slice(0, 4).map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill.name}</Badge>
                  ))}
                  {candidate.skills.length > 4 && (
                    <Badge variant="secondary">+{candidate.skills.length - 4} more</Badge>
                  )}
                </div>
                
                <div className="mt-4 flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    View Profile
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm"
                  >
                    Find Matches
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};