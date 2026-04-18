import { useState } from 'react';
import { ApplicationFormData } from '../types';

const initialState: ApplicationFormData = {
  fullName: '',
  email: '',
  passportNumber: '',
  nationality: '',
  phone: '',
  fatherName: '',
  motherName: '',
  dateOfBirth: '',
  gender: 'M',
  maritalStatus: 'Single',
  occupation: '',
  companyName: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  previousVisaRefusal: false,
  previousTravelCountries: '',
  purposeOfVisit: '',
  estimatedStayDuration: '',
  photoUrl: '',
  passportBioUrl: '',
  paymentStatus: 'pending',
};

export const useFormState = () => {
  const [formData, setFormData] = useState<ApplicationFormData>(initialState);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof ApplicationFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const setFieldErrors = (newErrors: Record<string, string>) => {
    setErrors(newErrors);
  };

  const resetForm = () => {
    setFormData(initialState);
    setCurrentStep(1);
    setErrors({});
  };

  return {
    formData,
    currentStep,
    setCurrentStep,
    errors,
    updateField,
    setFieldErrors,
    resetForm,
  };
};
