import React, { useState, useEffect } from 'react';
import { useFormState } from './hooks/useFormState';
import { useFirestore } from './hooks/useFirestore';
import { useAuth } from './hooks/useAuth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './services/firebaseConfig';

// Components
import { Landing } from './components/Landing';
import { StepIndicator } from './components/StepIndicator';
import { BasicInfoForm } from './components/forms/BasicInfoForm';
import { DeepDiveForm } from './components/forms/DeepDiveForm';
import { DocumentUploadForm } from './components/forms/DocumentUploadForm';
import { StripeCheckout } from './components/payment/StripeCheckout';
import { SuccessPage } from './components/success/SuccessPage';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Types & Validation
import { BasicInfoSchema, DeepDiveSchema } from './utils/validation';
import { ApplicationFormData } from './types';

export const App: React.FC = () => {
  const {
    formData,
    currentStep,
    setCurrentStep,
    errors,
    updateField,
    setFieldErrors,
    resetForm,
  } = useFormState();

  const { saveApplication } = useFirestore();
  const { user } = useAuth();

  const [appLoading, setAppLoading] = useState(false);
  const [appError, setAppError] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin
  useEffect(() => {
    if (user?.email?.endsWith('@visaconcierge.admin')) {
      setIsAdmin(true);
    }
  }, [user]);

  // Push a history entry whenever step changes (except initial load)
  useEffect(() => {
    // Replace state for step 0 (landing), push for all others
    if (currentStep === 0) {
      window.history.replaceState({ step: 0 }, '');
    } else {
      window.history.pushState({ step: currentStep }, '');
    }
    // Scroll to top on every step change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Listen for browser back/forward button
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const step = e.state?.step ?? 0;
      // Don't allow going back from success page via browser button — reset instead
      if (currentStep === 5) {
        resetForm();
        setCurrentStep(0);
        setCaseNumber('');
      } else {
        setCurrentStep(step);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentStep]);

  // Show admin dashboard
  if (isAdmin && user) {
    return <AdminDashboard />;
  }

  // Show landing page
  if (currentStep === 0) {
    return <Landing onStart={() => setCurrentStep(1)} />;
  }

  const stepLabels = ['Basic Info', 'Payment', 'Details', 'Documents'];

  const FormWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <StepIndicator
          currentStep={currentStep}
          totalSteps={4}
          steps={stepLabels}
        />
        {children}
      </div>
    </div>
  );

  // Step 1: Basic Info
  if (currentStep === 1) {
    const handleNext = () => {
      try {
        BasicInfoSchema.parse({
          fullName: formData.fullName,
          email: formData.email,
          passportNumber: formData.passportNumber,
          nationality: formData.nationality,
          phone: formData.phone,
        });
        setCurrentStep(2);
      } catch (error: any) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setFieldErrors(fieldErrors);
      }
    };

    return (
      <FormWrapper>
        <BasicInfoForm
          data={{
            fullName: formData.fullName,
            email: formData.email,
            passportNumber: formData.passportNumber,
            nationality: formData.nationality,
            phone: formData.phone,
          }}
          errors={errors}
          onUpdate={updateField}
          onNext={handleNext}
        />
      </FormWrapper>
    );
  }

  // Step 2: Payment
  if (currentStep === 2) {
    const handlePaymentSuccess = (paymentId: string) => {
      updateField('paymentStatus', 'completed');
      updateField('paymentId', paymentId);
      setCurrentStep(3);
    };

    return (
      <FormWrapper>
        <StripeCheckout
          onPaymentSuccess={handlePaymentSuccess}
          onBack={() => setCurrentStep(1)}
          loading={appLoading}
        />
        {appError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {appError}
          </div>
        )}
      </FormWrapper>
    );
  }

  // Step 3: Deep Dive Form
  if (currentStep === 3) {
    const handleNext = () => {
      try {
        DeepDiveSchema.parse({
          fatherName: formData.fatherName,
          motherName: formData.motherName,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          maritalStatus: formData.maritalStatus,
          occupation: formData.occupation,
          companyName: formData.companyName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          previousVisaRefusal: formData.previousVisaRefusal,
          previousTravelCountries: formData.previousTravelCountries,
          purposeOfVisit: formData.purposeOfVisit,
          estimatedStayDuration: formData.estimatedStayDuration,
        });
        setCurrentStep(4);
      } catch (error: any) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setFieldErrors(fieldErrors);
      }
    };

    return (
      <FormWrapper>
        <DeepDiveForm
          data={{
            fatherName: formData.fatherName,
            motherName: formData.motherName,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            maritalStatus: formData.maritalStatus,
            occupation: formData.occupation,
            companyName: formData.companyName,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            previousVisaRefusal: formData.previousVisaRefusal,
            previousVisaRefusalReason: formData.previousVisaRefusalReason,
            previousTravelCountries: formData.previousTravelCountries,
            purposeOfVisit: formData.purposeOfVisit,
            estimatedStayDuration: formData.estimatedStayDuration,
            hostName: formData.hostName,
            hostPhone: formData.hostPhone,
          }}
          errors={errors}
          onUpdate={updateField}
          onNext={handleNext}
          onBack={() => setCurrentStep(2)}
        />
      </FormWrapper>
    );
  }

  // Step 4: Document Upload
  if (currentStep === 4) {
    const handleNext = async () => {
      setAppLoading(true);
      setAppError('');

      try {
        if (formData.photoFile) {
          const photoRef = ref(
            storage,
            `photos/${crypto.randomUUID()}_${formData.photoFile.name}`
          );
          await uploadBytes(photoRef, formData.photoFile);
          const photoUrl = await getDownloadURL(photoRef);
          updateField('photoUrl', photoUrl);
        }

        if (formData.passportBioFile) {
          const passportRef = ref(
            storage,
            `passports/${crypto.randomUUID()}_${formData.passportBioFile.name}`
          );
          await uploadBytes(passportRef, formData.passportBioFile);
          const passportUrl = await getDownloadURL(passportRef);
          updateField('passportBioUrl', passportUrl);
        }

        const generatedCaseNumber = `VC-${Date.now()}-${Math.random()
          .toString(36)
          .substring(7)
          .toUpperCase()}`;
        updateField('caseNumber', generatedCaseNumber);
        setCaseNumber(generatedCaseNumber);

        await saveApplication(formData as ApplicationFormData);

        setCurrentStep(5);
      } catch (error: any) {
        setAppError(error.message || 'Failed to upload documents');
      } finally {
        setAppLoading(false);
      }
    };

    return (
      <FormWrapper>
        <DocumentUploadForm
          onPhotoUpload={(file) => updateField('photoFile', file)}
          onPassportUpload={(file) => updateField('passportBioFile', file)}
          onNext={handleNext}
          onBack={() => setCurrentStep(3)}
          loading={appLoading}
        />
        {appError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {appError}
          </div>
        )}
      </FormWrapper>
    );
  }

  // Step 5: Success
  if (currentStep === 5) {
    return (
      <SuccessPage
        caseNumber={caseNumber}
        email={formData.email}
        onReset={() => {
          resetForm();
          setCaseNumber('');
          setCurrentStep(0);
        }}
      />
    );
  }

  return null;
};

export default App;
