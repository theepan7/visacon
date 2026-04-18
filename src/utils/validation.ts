import { z } from 'zod';

export const BasicInfoSchema = z.object({
  fullName: z.string().min(3, 'Name must be at least 3 characters').max(100),
  email: z.string().email('Invalid email address'),
  passportNumber: z
    .string()
    .regex(/^[A-Z]{1}[0-9]{7}$/, 'Invalid Indian passport format'),
  nationality: z.string().min(2, 'Select a valid nationality'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number'),
});

export const DeepDiveSchema = z.object({
  fatherName: z.string().min(2, 'Father\'s name required'),
  motherName: z.string().min(2, 'Mother\'s name required'),
  dateOfBirth: z.string().refine(
    (date) => {
      const age = new Date().getFullYear() - new Date(date).getFullYear();
      return age >= 18 && age <= 120;
    },
    'Age must be between 18 and 120'
  ),
  gender: z.enum(['M', 'F', 'Other']),
  maritalStatus: z.enum(['Single', 'Married', 'Divorced', 'Widowed']),
  occupation: z.string().min(2),
  companyName: z.string().min(2),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  pincode: z
    .string()
    .regex(/^\d{6}$/, 'Invalid Indian pincode'),
  previousVisaRefusal: z.boolean(),
  previousVisaRefusalReason: z.string().optional(),
  previousTravelCountries: z.string(),
  purposeOfVisit: z.string().min(3),
  estimatedStayDuration: z.string().min(1),
  hostName: z.string().optional(),
  hostPhone: z.string().optional(),
});

export const DocumentSchema = z.object({
  photoUrl: z.string().url('Invalid photo URL'),
  passportBioUrl: z.string().url('Invalid passport bio URL'),
});
