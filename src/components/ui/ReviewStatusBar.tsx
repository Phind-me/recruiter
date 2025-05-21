import React from 'react';
import { Check, X } from 'lucide-react';

interface ReviewStatusBarProps {
  currentStatus: 'received' | 'reviewed' | 'firstMeet' | 'accepted' | 'rejected';
  onStatusChange: (newStatus: 'received' | 'reviewed' | 'firstMeet' | 'accepted' | 'rejected') => void;
}

export const ReviewStatusBar: React.FC<ReviewStatusBarProps> = ({
  currentStatus,
  onStatusChange
}) => {
  const statuses = ['received', 'reviewed', 'firstMeet', 'accepted'];
  const statusIndex = statuses.indexOf(currentStatus);

  const handleAction = (status: string, action: 'approve' | 'reject') => {
    if (action === 'approve') {
      const nextStatus = statuses[statuses.indexOf(status) + 1];
      if (nextStatus) {
        onStatusChange(nextStatus as any);
      }
    } else {
      onStatusChange('rejected');
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {statuses.map((status, index) => (
          <div 
            key={status}
            className="flex-1 relative"
          >
            <div className={`
              h-2 
              ${index === 0 ? 'rounded-l-full' : ''} 
              ${index === statuses.length - 1 ? 'rounded-r-full' : ''}
              ${index <= statusIndex ? 'bg-blue-500' : 'bg-gray-200'}
              ${currentStatus === 'rejected' ? 'bg-red-500' : ''}
            `} />
            
            <div className="absolute top-2 left-0 right-0 text-center">
              <span className={`
                text-sm font-medium capitalize
                ${index <= statusIndex ? 'text-blue-600' : 'text-gray-500'}
                ${currentStatus === 'rejected' ? 'text-red-600' : ''}
              `}>
                {status}
              </span>
            </div>

            {currentStatus === status && currentStatus !== 'accepted' && currentStatus !== 'rejected' && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-2">
                <button
                  onClick={() => handleAction(status, 'approve')}
                  className="p-1 bg-green-100 rounded-full text-green-600 hover:bg-green-200"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => handleAction(status, 'reject')}
                  className="p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};