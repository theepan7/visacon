import React, { useState } from 'react';
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
  React.useEffect(() => {
    if (user?.email?.endsWith('@visaconcierge.admin')) {
      setIsAdmin(true);
    }
  }, [user]);

  // Show admin dashboard
  if (isAdmin && user) {
    return <AdminDashboard />;
  }

  // Show landing page
  if (currentStep === 0) {
    return <Landing onStart={() => setCurrentStep(1)} />;
  }

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
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <StepIndicator
            currentStep={1}
            totalSteps={4}
            steps={['Basic Info', 'Payment', 'Details', 'Documents']}
          />
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
        </div>
      </div>
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
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <StepIndicator
            currentStep={2}
            totalSteps={4}
            steps={['Basic Info', 'Payment', 'Details', 'Documents']}
          />
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
        </div>
      </div>
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
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <StepIndicator
            currentStep={3}
            totalSteps={4}
            steps={['Basic Info', 'Payment', 'Details', 'Documents']}
          />
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
        </div>
      </div>
    );
  }

  // Step 4: Document Upload
  if (currentStep === 4) {
    const handlePhotoUpload = (file: File) => {
      updateField('photoFile', file);
    };

    const handlePassportUpload = (file: File) => {
      updateField('passportBioFile', file);
    };

    const handleNext = async () => {
      setAppLoading(true);
      setAppError('');

      try {
        // Upload photo
        if (formData.photoFile) {
          const photoRef = ref(
            storage,
            `photos/${crypto.randomUUID()}_${formData.photoFile.name}`
          );
          await uploadBytes(photoRef, formData.photoFile);
          const photoUrl = await getDownloadURL(photoRef);
          updateField('photoUrl', photoUrl);
        }

        // Upload passport bio
        if (formData.passportBioFile) {
          const passportRef = ref(
            storage,
            `passports/${crypto.randomUUID()}_${formData.passportBioFile.name}`
          );
          await uploadBytes(passportRef, formData.passportBioFile);
          const passportUrl = await getDownloadURL(passportRef);
          updateField('passportBioUrl', passportUrl);
        }

        // Generate case number
        const generatedCaseNumber = `VC-${Date.now()}-${Math.random()
          .toString(36)
          .substring(7)
          .toUpperCase()}`;
        updateField('caseNumber', generatedCaseNumber);
        setCaseNumber(generatedCaseNumber);

        // Save to Firestore
        await saveApplication(formData as ApplicationFormData);

        setCurrentStep(5);
      } catch (error: any) {
        setAppError(error.message || 'Failed to upload documents');
      } finally {
        setAppLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <StepIndicator
            currentStep={4}
            totalSteps={4}
            steps={['Basic Info', 'Payment', 'Details', 'Documents']}
          />
          <DocumentUploadForm
            onPhotoUpload={handlePhotoUpload}
            onPassportUpload={handlePassportUpload}
            onNext={handleNext}
            onBack={() => setCurrentStep(3)}
            loading={appLoading}
          />
          {appError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {appError}
            </div>
          )}
        </div>
      </div>
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
          setCurrentStep(0);
          setCaseNumber('');
        }}
      />
    );
  }

  return null;
};

export default App;
