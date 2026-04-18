import React, { useState } from 'react';
import { Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import { validatePhotoImage, validatePassportBio } from '../../services/imageValidation';
import { Button } from '../common/Button';

interface DocumentUploadFormProps {
  onPhotoUpload: (file: File) => void;
  onPassportUpload: (file: File) => void;
  onNext: () => void;
  onBack: () => void;
  loading?: boolean;
  photoUrl?: string;
  passportBioUrl?: string;
}

export const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({
  onPhotoUpload,
  onPassportUpload,
  onNext,
  onBack,
  loading = false,
  photoUrl,
  passportBioUrl,
}) => {
  const [photoError, setPhotoError] = useState('');
  const [passportError, setPassportError] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [passportPreview, setPassportPreview] = useState<string | null>(null);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoError('');
    const validation = await validatePhotoImage(file);

    if (!validation.isValid) {
      setPhotoError(validation.error || 'Invalid photo');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPhotoPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    onPhotoUpload(file);
  };

  const handlePassportChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPassportError('');
    const validation = await validatePassportBio(file);

    if (!validation.isValid) {
      setPassportError(validation.error || 'Invalid document');
      return;
    }

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPassportPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPassportPreview('PDF uploaded');
    }

    onPassportUpload(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!photoPreview && !photoUrl) {
      setPhotoError('Photo is required');
      return;
    }

    if (!passportPreview && !passportBioUrl) {
      setPassportError('Passport bio page is required');
      return;
    }

    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Upload Documents
        </h2>

        {/* Photo Upload */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Passport Photo
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer">
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handlePhotoChange}
              className="hidden"
              id="photo-input"
            />
            <label htmlFor="photo-input" className="cursor-pointer">
              {photoPreview ? (
                <div className="flex flex-col items-center">
                  <img
                    src={photoPreview}
                    alt="Photo preview"
                    className="w-32 h-32 object-cover rounded-lg mb-4"
                  />
                  <CheckCircle2 className="w-6 h-6 text-green-600 mb-2" />
                  <p className="text-sm text-green-600 font-medium">
                    Photo uploaded successfully
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG/PNG, Square (1:1), Min 200x200px, Max 1MB
                  </p>
                </div>
              )}
            </label>
          </div>
          {photoError && (
            <div className="mt-2 flex items-center gap-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <p className="text-sm">{photoError}</p>
            </div>
          )}
        </div>

        {/* Passport Bio Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Passport Bio Page
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer">
            <input
              type="file"
              accept="application/pdf,image/jpeg,image/jpg,image/png"
              onChange={handlePassportChange}
              className="hidden"
              id="passport-input"
            />
            <label htmlFor="passport-input" className="cursor-pointer">
              {passportPreview ? (
                <div className="flex flex-col items-center">
                  {passportPreview !== 'PDF uploaded' ? (
                    <img
                      src={passportPreview}
                      alt="Passport preview"
                      className="w-32 h-40 object-cover rounded-lg mb-4"
                    />
                  ) : (
                    <div className="w-32 h-40 bg-red-50 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-red-600 font-bold">PDF</span>
                    </div>
                  )}
                  <CheckCircle2 className="w-6 h-6 text-green-600 mb-2" />
                  <p className="text-sm text-green-600 font-medium">
                    Document uploaded successfully
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF or JPG/PNG, Max 5MB
                  </p>
                </div>
              )}
            </label>
          </div>
          {passportError && (
            <div className="mt-2 flex items-center gap-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <p className="text-sm">{passportError}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={onBack}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          type="submit"
          size="lg"
          className="flex-1"
          loading={loading}
        >
          Review & Pay
        </Button>
      </div>
    </form>
  );
};
