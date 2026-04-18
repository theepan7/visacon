import { z } from 'zod';

export const BasicInfoSchema = z.object({
  fullName: z.string().min(3, 'Name must be at least 3 characters').max(100),
  email: z.string().email('Invalid email address'),
  passportNumber: z
    .string()
    .min(6, 'Passport number must be at least 6 characters')
    .max(20, 'Passport number must be under 20 characters')
    .regex(/^[A-Z0-9]+$/, 'Passport number must contain only letters and numbers'),
  nationality: z.string().min(2, 'Select a valid nationality'),
  phone: z
    .string()
    .min(7, 'Phone number must be at least 7 digits')
    .max(15, 'Phone number must be under 15 digits')
    .regex(/^[0-9+\s\-()]+$/, 'Invalid phone number'),
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
