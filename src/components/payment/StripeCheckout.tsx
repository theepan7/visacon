import React, { useState } from 'react';
import { loadStripe } from '@stripe/js';
import { Button } from '../common/Button';
import { AlertCircle } from 'lucide-react';
import { SERVICE_FEE_DISPLAY, SERVICE_FEE } from '../../utils/constants';

interface StripeCheckoutProps {
  email: string;
  onPaymentSuccess: (paymentId: string) => void;
  onPaymentError: (error: string) => void;
  onBack: () => void;
  loading?: boolean;
}

export const StripeCheckout: React.FC<StripeCheckoutProps> = ({
  email,
  onPaymentSuccess,
  onPaymentError,
  onBack,
  loading = false,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);

    try {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLIC_KEY
      );

      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      // Call your backend to create a Stripe Checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          amount: SERVICE_FEE,
        }),
      });

      const { sessionId } = await response.json();

      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        onPaymentError(result.error.message || 'Payment failed');
      }
    } catch (error: any) {
      onPaymentError(error.message || 'An error occurred');
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Service Payment
        </h2>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700 mb-4">
            Our expert team will review your documents and submit your e-Visa
            application to the official Indian government portal.
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Service Fee</span>
              <span className="font-semibold text-gray-900">
                {SERVICE_FEE_DISPLAY}
              </span>
            </div>
            <div className="border-t border-blue-200 pt-2 flex justify-between text-base font-bold">
              <span className="text-gray-900">Total</span>
              <span className="text-blue-600">{SERVICE_FEE_DISPLAY}</span>
            </div>
          </div>

          <p className="text-xs text-gray-600">
            After payment, you'll proceed to upload your documents. Our team
            will then handle the official government e-Visa fees separately.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            What happens next:
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="inline-block w-5 h-5 bg-blue-600 text-white rounded-full text-center text-xs leading-5 mr-3 flex-shrink-0">
                1
              </span>
              <span>Pay our service fee</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-5 h-5 bg-blue-600 text-white rounded-full text-center text-xs leading-5 mr-3 flex-shrink-0">
                2
              </span>
              <span>Upload your documents</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-5 h-5 bg-blue-600 text-white rounded-full text-center text-xs leading-5 mr-3 flex-shrink-0">
                3
              </span>
              <span>Our team submits your application</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-5 h-5 bg-blue-600 text-white rounded-full text-center text-xs leading-5 mr-3 flex-shrink-0">
                4
              </span>
              <span>Pay government fees on official portal</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={onBack}
          className="flex-1"
          disabled={isProcessing}
        >
          Back
        </Button>
        <Button
          type="button"
          size="lg"
          className="flex-1"
          loading={isProcessing || loading}
          onClick={handleCheckout}
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};
