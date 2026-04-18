import React from 'react';
import { CheckCircle2, Copy, Download } from 'lucide-react';
import { Button } from '../common/Button';

interface SuccessPageProps {
  caseNumber: string;
  email: string;
  onReset: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({
  caseNumber,
  email,
  onReset,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(caseNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Application Submitted!
        </h1>

        <p className="text-gray-600 mb-6">
          Your e-Visa application has been successfully submitted. Our team will
          review your documents and complete the official application.
        </p>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-2">Your Case Number</p>
          <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-blue-200">
            <code className="text-lg font-mono font-bold text-blue-600">
              {caseNumber}
            </code>
            <button
              onClick={handleCopy}
              className="text-blue-600 hover:text-blue-700 transition"
              title="Copy case number"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
          {copied && (
            <p className="text-sm text-green-600 mt-2">Copied to clipboard!</p>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold text-gray-900 mb-3">Next Steps:</h3>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="inline-block w-6 h-6 bg-blue-600 text-white rounded-full text-center text-xs leading-6 mr-3 flex-shrink-0">
                1
              </span>
              <span>
                Our team will review your documents within 24 hours
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-6 h-6 bg-blue-600 text-white rounded-full text-center text-xs leading-6 mr-3 flex-shrink-0">
                2
              </span>
              <span>
                We'll submit your application to the official portal
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-6 h-6 bg-blue-600 text-white rounded-full text-center text-xs leading-6 mr-3 flex-shrink-0">
                3
              </span>
              <span>
                You'll receive a "Temporary Application ID" via email
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-6 h-6 bg-blue-600 text-white rounded-full text-center text-xs leading-6 mr-3 flex-shrink-0">
                4
              </span>
              <span>
                Complete payment on the official government portal
              </span>
            </li>
          </ol>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          A confirmation email has been sent to <strong>{email}</strong>
        </p>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="lg"
            className="flex-1"
            onClick={() => window.print()}
          >
            <Download className="w-4 h-4 mr-2 inline" />
            Print
          </Button>
          <Button
            size="lg"
            className="flex-1"
            onClick={onReset}
          >
            New Application
          </Button>
        </div>
      </div>
    </div>
  );
};
