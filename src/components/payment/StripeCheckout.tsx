import React, { useState } from 'react';
import { Button } from '../common/Button';
import { CheckCircle2, CreditCard, Lock } from 'lucide-react';
import { SERVICE_FEE_DISPLAY } from '../../utils/constants';

interface StripeCheckoutProps {
  onPaymentSuccess: (paymentId: string) => void;
  onBack: () => void;
  loading?: boolean;
}

export const StripeCheckout: React.FC<StripeCheckoutProps> = ({
  onPaymentSuccess,
  onBack,
  loading = false,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paid, setPaid] = useState(false);

  // TODO: Replace this with real Stripe integration before going live.
  // Install: npm install @stripe/stripe-js
  // Then update this function to call your backend /api/create-checkout-session
  const handleCheckout = async () => {
    setIsProcessing(true);
    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const simulatedPaymentId = `sim_${Date.now()}`;
    setPaid(true);
    setIsProcessing(false);
    onPaymentSuccess(simulatedPaymentId);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Service Payment
        </h2>

        {/* Dev notice banner */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mb-6 flex items-start gap-2">
          <CreditCard className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-yellow-800">
            <strong>Development mode:</strong> Payment is simulated. Connect real Stripe before going live.
          </p>
        </div>

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
            {['Pay our service fee', 'Upload your documents', 'Our team submits your application', 'Pay government fees on official portal'].map((step, i) => (
              <li key={i} className="flex items-start">
                <span className="inline-block w-5 h-5 bg-blue-600 text-white rounded-full text-center text-xs leading-5 mr-3 flex-shrink-0">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {paid && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 rounded-lg p-3">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">Payment simulated successfully — proceeding…</p>
          </div>
        )}

        <div className="mt-4 flex items-center gap-1 text-gray-400 text-xs justify-center">
          <Lock className="w-3 h-3" />
          <span>Payments secured with 256-bit SSL encryption</span>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={onBack}
          className="flex-1"
          disabled={isProcessing || paid}
        >
          Back
        </Button>
        <Button
          type="button"
          size="lg"
          className="flex-1"
          loading={isProcessing || loading}
          disabled={paid}
          onClick={handleCheckout}
        >
          {paid ? 'Proceeding…' : `Pay ${SERVICE_FEE_DISPLAY}`}
        </Button>
      </div>
    </div>
  );
};
