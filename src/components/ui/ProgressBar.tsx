import React from 'react';

interface ProgressBarProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  steps, 
  currentStep,
  className = ''
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <React.Fragment key={index}>
              {/* Step marker */}
              <div className="flex flex-col items-center">
                <div 
                  className={`
                    h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium
                    transition-all duration-300
                    ${isCompleted ? 'bg-blue-500 text-white' : ''}
                    ${isCurrent ? 'bg-blue-100 border-2 border-blue-500 text-blue-500' : ''}
                    ${!isCompleted && !isCurrent ? 'bg-gray-100 text-gray-500' : ''}
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={`
                  mt-2 text-xs
                  ${isCompleted ? 'text-blue-500 font-medium' : ''}
                  ${isCurrent ? 'text-blue-500 font-medium' : ''}
                  ${!isCompleted && !isCurrent ? 'text-gray-500' : ''}
                `}>
                  {step}
                </span>
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2">
                  <div className={`h-1 ${index < currentStep ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};