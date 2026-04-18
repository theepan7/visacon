import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  steps,
}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const stepNum = index + 1;
        const isCompleted = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;

        return (
          <div key={stepNum} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition ${
                  isCompleted
                    ? 'bg-blue-600 border-blue-600'
                    : isCurrent
                    ? 'border-blue-600 bg-white'
                    : 'border-gray-300 bg-white'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-white" />
                ) : (
                  <span
                    className={`text-sm font-semibold ${
                      isCurrent ? 'text-blue-600' : 'text-gray-400'
                    }`}
                  >
                    {stepNum}
                  </span>
                )}
              </div>
              <p
                className={`mt-2 text-xs font-medium text-center ${
                  isCurrent ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {step}
              </p>
            </div>

            {stepNum < totalSteps && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  isCompleted ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
