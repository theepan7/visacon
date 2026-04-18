import React from 'react';
import { DeepDiveSchema } from '../../utils/validation';
import { DeepDiveData } from '../../types';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import {
  OCCUPATIONS,
  PURPOSE_OF_VISIT,
  STAY_DURATION,
} from '../../utils/constants';

interface DeepDiveFormProps {
  data: DeepDiveData;
  errors: Record<string, string>;
  onUpdate: (field: keyof DeepDiveData, value: any) => void;
  onNext: () => void;
  onBack: () => void;
  loading?: boolean;
}

export const DeepDiveForm: React.FC<DeepDiveFormProps> = ({
  data,
  errors,
  onUpdate,
  onNext,
  onBack,
  loading = false,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      DeepDiveSchema.parse(data);
      onNext();
    } catch (error: any) {
      // Errors handled by parent
    }
  };

  const formFields: Array<{
    key: keyof DeepDiveData;
    label: string;
    type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea' | 'checkbox';
    placeholder?: string;
    required?: boolean;
    options?: string[];
    helperText?: string;
  }> = [
    {
      key: 'fatherName',
      label: 'Father\'s Name',
      type: 'text',
      placeholder: 'Enter father\'s full name',
      required: true,
    },
    {
      key: 'motherName',
      label: 'Mother\'s Name',
      type: 'text',
      placeholder: 'Enter mother\'s full name',
      required: true,
    },
    {
      key: 'dateOfBirth',
      label: 'Date of Birth',
      type: 'date',
      required: true,
    },
    {
      key: 'gender',
      label: 'Gender',
      type: 'select',
      options: ['M', 'F', 'Other'],
      required: true,
    },
    {
      key: 'maritalStatus',
      label: 'Marital Status',
      type: 'select',
      options: ['Single', 'Married', 'Divorced', 'Widowed'],
      required: true,
    },
    {
      key: 'occupation',
      label: 'Occupation',
      type: 'select',
      options: OCCUPATIONS,
      required: true,
    },
    {
      key: 'companyName',
      label: 'Company/Organization Name',
      type: 'text',
      placeholder: 'Enter company name',
      required: true,
    },
    {
      key: 'address',
      label: 'Residential Address',
      type: 'textarea',
      placeholder: 'Enter full address',
      required: true,
    },
    {
      key: 'city',
      label: 'City',
      type: 'text',
      placeholder: 'Enter city',
      required: true,
    },
    {
      key: 'state',
      label: 'State',
      type: 'text',
      placeholder: 'Enter state',
      required: true,
    },
    {
      key: 'pincode',
      label: 'Pincode',
      type: 'text',
      placeholder: '000000',
      required: true,
      helperText: '6-digit Indian pincode',
    },
    {
      key: 'previousVisaRefusal',
      label: 'Previous Visa Refusal',
      type: 'checkbox',
      required: false,
    },
    {
      key: 'previousTravelCountries',
      label: 'Previous Travel Countries',
      type: 'text',
      placeholder: 'e.g., USA, UK, Singapore (comma-separated)',
      required: true,
    },
    {
      key: 'purposeOfVisit',
      label: 'Purpose of Visit',
      type: 'select',
      options: PURPOSE_OF_VISIT,
      required: true,
    },
    {
      key: 'estimatedStayDuration',
      label: 'Estimated Stay Duration',
      type: 'select',
      options: STAY_DURATION,
      required: true,
    },
    {
      key: 'hostName',
      label: 'Host Name (if applicable)',
      type: 'text',
      placeholder: 'Name of your host in India',
      required: false,
    },
    {
      key: 'hostPhone',
      label: 'Host Phone (if applicable)',
      type: 'tel',
      placeholder: 'Contact number',
      required: false,
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Detailed Information
        </h2>

        <div className="space-y-4">
          {formFields.map((field) => {
            const value = data[field.key];

            if (field.type === 'select') {
              const strValue = typeof value === 'string' ? value : '';
              return (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <select
                    value={strValue}
                    onChange={(e) => onUpdate(field.key, e.target.value)}
                    className={`w-full px-4 py-2.5 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                      errors[field.key] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required={field.required}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors[field.key] && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors[field.key]}
                    </p>
                  )}
                </div>
              );
            }

            if (field.type === 'textarea') {
              const strValue = typeof value === 'string' ? value : '';
              return (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <textarea
                    value={strValue}
                    onChange={(e) => onUpdate(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    rows={3}
                    className={`w-full px-4 py-2.5 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                      errors[field.key] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required={field.required}
                  />
                  {errors[field.key] && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors[field.key]}
                    </p>
                  )}
                </div>
              );
            }

            if (field.type === 'checkbox') {
              const boolValue = typeof value === 'boolean' ? value : false;
              return (
                <div key={field.key} className="flex items-center">
                  <input
                    type="checkbox"
                    id={field.key}
                    checked={boolValue}
                    onChange={(e) => onUpdate(field.key, e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={field.key}
                    className="ml-2 text-sm font-medium text-gray-700"
                  >
                    {field.label}
                  </label>
                </div>
              );
            }

            const strValue = typeof value === 'string' ? value : '';
            return (
              <Input
                key={field.key}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                value={strValue}
                onChange={(e) => onUpdate(field.key, e.target.value)}
                error={errors[field.key]}
                helperText={field.helperText}
                required={field.required}
              />
            );
          })}
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
          Continue to Documents
        </Button>
      </div>
    </form>
  );
};
