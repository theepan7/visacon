# Visa Concierge - Indian e-Visa Application System

A complete React + TypeScript application for managing Indian e-Visa applications with payment processing, document upload, and admin dashboard.

## Features

- ✅ **Multi-step Form**: 4-step application process (Basic Info → Payment → Details → Documents)
- ✅ **Payment Integration**: Stripe checkout integration
- ✅ **Document Upload**: Firebase Storage for secure document handling
- ✅ **Admin Dashboard**: Review and manage applications
- ✅ **Validation**: Comprehensive form validation using Zod
- ✅ **Image Validation**: Photo and passport document validation
- ✅ **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- ✅ **Authentication**: Firebase Auth integration
- ✅ **Database**: Firestore for application storage

## Project Structure

```
src/
├── types/              # TypeScript interfaces
├── utils/              # Validation, constants
├── services/           # Firebase config, image validation
├── hooks/              # Custom React hooks
├── context/            # React context
├── components/
│   ├── common/         # Reusable components
│   ├── forms/          # Form components
│   ├── payment/        # Payment components
│   ├── admin/          # Admin dashboard
│   └── success/        # Success page
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

Create a `.env.local` file and add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### 3. Set Up Firebase

1. Create a Firebase project at https://firebase.google.com
2. Enable Authentication, Firestore, and Cloud Storage
3. Copy credentials to `.env.local`

### 4. Configure Stripe

1. Create a Stripe account at https://stripe.com
2. Get your public key from the dashboard
3. Add to `.env.local`

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Application Flow

### User Journey

1. **Landing Page**: Overview of the service
2. **Step 1 - Basic Info**: Full name, email, passport, nationality, phone
3. **Step 2 - Payment**: Pay service fee via Stripe
4. **Step 3 - Details**: Extended information (parents, address, occupation, travel history)
5. **Step 4 - Documents**: Upload photo and passport bio page
6. **Success Page**: Confirmation with case number

### Admin Access

Users with email ending in `@visaconcierge.admin` see the admin dashboard instead of the application form.

**Admin Dashboard Features:**
- View all applications
- Search by name, email, or passport
- Filter by payment status
- Download photos and documents
- View detailed application information

## API Integration

### Backend Requirements

The application expects these backend endpoints:

#### Create Checkout Session
```
POST /api/create-checkout-session
Body: { email: string, amount: number }
Response: { sessionId: string }
```

## Component Documentation

### Forms

- **BasicInfoForm**: Collects basic applicant information
- **DeepDiveForm**: Detailed personal and travel information
- **DocumentUploadForm**: Photo and passport upload
- **StripeCheckout**: Payment processing

### Common Components

- **Button**: Customizable button with variants
- **Input**: Text input with validation
- **Modal**: Reusable modal dialog
- **StepIndicator**: Multi-step form indicator

### Admin Components

- **AdminDashboard**: Main admin interface
- **ApplicationCard**: Individual application card with details

## Validation

The application uses Zod for validation:

- **BasicInfoSchema**: Validates basic information
- **DeepDiveSchema**: Validates detailed information
- **ImageValidation**: Validates photo dimensions and file size

### Passport Format
- Format: 1 letter + 7 digits (e.g., A12345678)
- Example: A12345678

### Phone Number
- 10-digit Indian mobile number
- Must start with 6-9

### Pincode
- 6-digit Indian pincode

### Photo Requirements
- Square (1:1 ratio)
- Minimum 200x200 pixels
- Maximum 1MB
- JPG or PNG

### Passport Bio
- PDF or image file
- Maximum 5MB

## Environment Variables

```env
# Firebase
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID

# Stripe
VITE_STRIPE_PUBLIC_KEY
```

## Database Structure

### Firestore Collections

**applications**
```typescript
{
  fullName: string
  email: string
  passportNumber: string
  nationality: string
  phone: string
  fatherName: string
  motherName: string
  dateOfBirth: string
  gender: 'M' | 'F' | 'Other'
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed'
  occupation: string
  companyName: string
  address: string
  city: string
  state: string
  pincode: string
  previousVisaRefusal: boolean
  previousTravelCountries: string
  purposeOfVisit: string
  estimatedStayDuration: string
  photoUrl: string
  passportBioUrl: string
  caseNumber: string
  paymentStatus: 'pending' | 'completed' | 'failed'
  paymentId?: string
  createdAt: Timestamp
  updatedAt: Timestamp
  adminNotes?: string
  tempApplicationId?: string
}
```

## Storage Structure

Firebase Storage buckets:
- `photos/{uuid}_{filename}` - Passport photos
- `passports/{uuid}_{filename}` - Passport documents

## Build & Deploy

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Technologies Used

- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **Firebase**: Backend services
- **Stripe**: Payment processing
- **Zod**: Schema validation
- **Lucide React**: Icons

## Customization

### Update Service Fee

Edit `src/utils/constants.ts`:
```typescript
export const SERVICE_FEE = 4999; // in paise
export const SERVICE_FEE_DISPLAY = '₹49.99';
```

### Update Form Fields

- Nationalities: `src/utils/constants.ts` → `NATIONALITIES`
- Occupations: `src/utils/constants.ts` → `OCCUPATIONS`
- Visit purposes: `src/utils/constants.ts` → `PURPOSE_OF_VISIT`
- Stay durations: `src/utils/constants.ts` → `STAY_DURATION`

### Change Admin Email Domain

Edit `src/utils/constants.ts`:
```typescript
export const ADMIN_EMAIL_DOMAIN = '@yourdomain.admin';
```

## Testing

### Manual Testing Checklist

- [ ] Form validation works correctly
- [ ] File upload validation works
- [ ] Stripe checkout redirects properly
- [ ] Admin dashboard loads applications
- [ ] Search and filter work in admin
- [ ] Documents download correctly
- [ ] Case number copy functionality works
- [ ] Responsive design on mobile

### Test Data

Use Stripe test cards:
- Valid: 4242 4242 4242 4242
- Declined: 4000 0000 0000 0002

## Troubleshooting

### Firebase Connection Issues
- Verify environment variables are correct
- Check Firebase project settings
- Ensure Firestore is enabled
- Verify Storage bucket exists

### Stripe Integration Issues
- Verify public key is correct
- Check Stripe account status
- Ensure backend endpoint exists

### Image Validation Issues
- Check file size limits
- Verify image format (JPG/PNG)
- Check aspect ratio for photos

## Contributing

1. Create a new branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## License

MIT

## Support

For issues or questions, contact: support@visaconcierge.com
