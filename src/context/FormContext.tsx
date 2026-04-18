import React, { createContext, useContext } from 'react';
import { ApplicationFormData } from '../types';

interface FormContextType {
  formData: ApplicationFormData;
  currentStep: number;
  errors: Record<string, string>;
  updateField: (field: keyof ApplicationFormData, value: any) => void;
  setFieldErrors: (errors: Record<string, string>) => void;
  setCurrentStep: (step: number) => void;
  resetForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // This will be implemented in App.tsx with actual state management
  return <FormContext.Provider value={undefined as any}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
};
