import React from 'react';
import { BasicInfoSchema } from '../../utils/validation';
import { BasicInfo } from '../../types';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { NATIONALITIES } from '../../utils/constants';

interface BasicInfoFormProps {
  data: BasicInfo;
  errors: Record<string, string>;
  onUpdate: (field: keyof BasicInfo, value: string) => void;
  onNext: () => void;
  loading?: boolean;
}

export const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  data,
  errors,
  onUpdate,
  onNext,
  loading = false,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      BasicInfoSchema.parse(data);
      onNext();
    } catch (error: any) {
      const fieldErrors: Record<string, string> = {};
      error.errors.forEach((err: any) => {
        fieldErrors[err.path[0]] = err.message;
      });
      // Errors are handled by parent component
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Your Basic Information
        </h2>

        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={data.fullName}
          onChange={(e) => onUpdate('fullName', e.target.value)}
          error={errors.fullName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          value={data.email}
          onChange={(e) => onUpdate('email', e.target.value)}
          error={errors.email}
          className="mt-4"
          required
        />

        <Input
          label="Passport Number"
          type="text"
          placeholder="A12345678"
          value={data.passportNumber}
          onChange={(e) => onUpdate('passportNumber', e.target.value.toUpperCase())}
          error={errors.passportNumber}
          className="mt-4"
          helperText="Format: 1 letter + 7 digits (e.g., A12345678)"
          required
        />

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nationality
          </label>
          <select
            value={data.nationality}
            onChange={(e) => onUpdate('nationality', e.target.value)}
            className={`w-full px-4 py-2.5 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
              errors.nationality ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          >
            <option value="">Select Nationality</option>
            {NATIONALITIES.map((nat) => (
              <option key={nat} value={nat}>
                {nat}
              </option>
            ))}
          </select>
          {errors.nationality && (
            <p className="mt-1 text-sm text-red-600">{errors.nationality}</p>
          )}
        </div>

        <Input
          label="Phone Number"
          type="tel"
          placeholder="9876543210"
          value={data.phone}
          onChange={(e) => onUpdate('phone', e.target.value)}
          error={errors.phone}
          className="mt-4"
          helperText="10-digit Indian mobile number"
          required
        />
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          size="lg"
          className="flex-1"
          loading={loading}
        >
          Continue to Payment
        </Button>
      </div>
    </form>
  );
};
