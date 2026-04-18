export interface BasicInfo {
  fullName: string;
  email: string;
  passportNumber: string;
  nationality: string;
  phone: string;
}

export interface DeepDiveData {
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  gender: 'M' | 'F' | 'Other';
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  occupation: string;
  companyName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  previousVisaRefusal: boolean;
  previousVisaRefusalReason?: string;
  previousTravelCountries: string;
  purposeOfVisit: string;
  estimatedStayDuration: string;
  hostName?: string;
  hostPhone?: string;
}

export interface DocumentData {
  photoUrl: string;
  passportBioUrl: string;
  photoFile?: File;
  passportBioFile?: File;
}

export interface ApplicationFormData extends BasicInfo, DeepDiveData, DocumentData {
  caseNumber?: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  adminNotes?: string;
  tempApplicationId?: string;
}

export interface AdminUser {
  uid: string;
  email: string;
  role: 'admin' | 'user';
}
