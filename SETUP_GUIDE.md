# Visa Concierge - Complete Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Firebase Setup](#firebase-setup)
3. [Stripe Setup](#stripe-setup)
4. [Project Setup](#project-setup)
5. [Backend Setup](#backend-setup)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js 16+ and npm/yarn
- Firebase account (free tier available)
- Stripe account (free tier available)
- Git (optional)

## Firebase Setup

### Step 1: Create Firebase Project

1. Go to https://firebase.google.com
2. Click "Get Started" or "Go to console"
3. Click "Create a project"
4. Enter project name: "visa-concierge"
5. Continue through setup (disable analytics for now)
6. Click "Create project"

### Step 2: Enable Authentication

1. In Firebase console, go to "Build" → "Authentication"
2. Click "Get Started"
3. Enable "Email/Password" provider
4. Save

### Step 3: Create Firestore Database

1. Go to "Build" → "Firestore Database"
2. Click "Create database"
3. Choose location closest to your users
4. Start in "Test mode" (for development)
5. Create database

### Step 4: Set Up Storage

1. Go to "Build" → "Storage"
2. Click "Get started"
3. Start in test mode
4. Choose location (same as Firestore)
5. Done

### Step 5: Get Credentials

1. Click the gear icon → "Project settings"
2. Scroll to "Your apps"
3. Click the web icon (</>) or "Add App"
4. Register app as "visa-concierge-web"
5. Copy the Firebase config
6. Save for later

## Stripe Setup

### Step 1: Create Stripe Account

1. Go to https://stripe.com
2. Click "Sign up"
3. Complete account setup
4. Verify email

### Step 2: Get API Keys

1. Go to Dashboard → Developers → API keys
2. Find "Publishable key"
3. Copy and save (this is VITE_STRIPE_PUBLIC_KEY)

### Step 3: Create Product

1. Go to Products → Add product
2. Name: "Visa Concierge Service"
3. Price: $49.99 (or your amount)
4. Save product

## Project Setup

### Step 1: Clone/Download Project

```bash
# Option 1: Clone (if using git)
git clone https://github.com/yourusername/visa-concierge.git
cd visa-concierge

# Option 2: Extract downloaded files
unzip visa-concierge.zip
cd visa-concierge
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create `.env.local` file in project root:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Stripe Configuration
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx or pk_live_xxxxx
```

**Where to get these values:**

- **Firebase keys**: Firebase Console → Project Settings → Web app config
- **Stripe Public Key**: Stripe Dashboard → Developers → API Keys

### Step 4: Run Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## Backend Setup

### Node.js/Express Example

Create `backend/api/checkout.js` (or similar for your framework):

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  const { email, amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'Visa Concierge Service Fee',
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

### Firestore Rules (Development)

In Firebase Console → Firestore → Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /applications/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Storage Rules (Development)

In Firebase Console → Storage → Rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Select your repository
5. Add environment variables from `.env.local`
6. Deploy

### Deploy to Netlify

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables
5. Deploy

### Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## Production Checklist

- [ ] Firebase project deployed
- [ ] Stripe account activated (not test mode)
- [ ] Backend API deployed
- [ ] Environment variables set correctly
- [ ] Admin email domain configured
- [ ] Email verification set up
- [ ] Error tracking configured (Sentry, etc.)
- [ ] SSL/HTTPS enabled
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Database backups scheduled
- [ ] Monitoring alerts set up

## Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Firebase connection fails
- Check `.env.local` values are correct
- Verify Firebase project exists
- Check network connectivity
- Review Firebase console for errors

### Stripe integration fails
- Verify Stripe public key (should start with `pk_`)
- Check if backend API is accessible
- Review browser console for errors
- Test with Stripe test keys first

### Image upload fails
- Check Firebase Storage is enabled
- Verify Storage bucket exists
- Review Storage Rules
- Check file size limits

### Admin dashboard doesn't load
- Verify user email ends with `@visaconcierge.admin`
- Check Firestore has permissions
- Review browser console for errors

### Payment redirect issues
- Check Stripe callback URLs
- Verify backend endpoint `/api/create-checkout-session` exists
- Test with Stripe test card: 4242 4242 4242 4242
- Check CORS settings

## Security Considerations

1. **Never commit `.env.local`** - Already in `.gitignore`
2. **Use environment variables** for all secrets
3. **Set up Firestore Rules** for production
4. **Enable HTTPS** in production
5. **Set up reCAPTCHA** for forms (optional)
6. **Regular backups** of Firestore data
7. **Monitor for suspicious activity** in logs
8. **Update dependencies** regularly

## Support & Documentation

- [Firebase Documentation](https://firebase.google.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)

## Getting Help

1. Check README.md
2. Review error messages in browser console
3. Check Firebase logs
4. Contact support or create an issue
