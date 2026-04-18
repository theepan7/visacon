import React, { useState } from 'react';
import { ApplicationFormData } from '../../types';
import { Copy, Download, Eye, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

interface ApplicationCardProps {
  application: ApplicationFormData & { id: string };
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState('');

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleDownloadPhoto = async () => {
    if (!application.photoUrl) return;
    const link = document.createElement('a');
    link.href = application.photoUrl;
    link.download = `${application.passportNumber}_photo.jpg`;
    link.click();
  };

  const handleDownloadPassport = async () => {
    if (!application.passportBioUrl) return;
    const link = document.createElement('a');
    link.href = application.passportBioUrl;
    link.download = `${application.passportNumber}_passport.pdf`;
    link.click();
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-4 border-b border-gray-100">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {application.fullName}
              </h3>
              <p className="text-sm text-gray-600">{application.email}</p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                application.paymentStatus === 'completed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {application.paymentStatus === 'completed' ? (
                <>
                  <CheckCircle2 className="w-3 h-3" />
                  Paid
                </>
              ) : (
                <>
                  <Clock className="w-3 h-3" />
                  Pending
                </>
              )}
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-gray-500">Passport</p>
              <p className="font-mono font-semibold text-gray-900">
                {application.passportNumber}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Nationality</p>
              <p className="font-semibold text-gray-900">
                {application.nationality}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Case Number */}
          {application.caseNumber && (
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs text-gray-600 mb-1">Case Number</p>
              <div className="flex items-center justify-between">
                <code className="text-sm font-mono font-bold text-blue-600">
                  {application.caseNumber}
                </code>
                <button
                  onClick={() =>
                    handleCopy(application.caseNumber!, 'caseNumber')
                  }
                  className="text-blue-600 hover:text-blue-700 transition"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              {copied === 'caseNumber' && (
                <p className="text-xs text-green-600 mt-1">Copied!</p>
              )}
            </div>
          )}

          {/* Temp Application ID */}
          {application.tempApplicationId && (
            <div className="bg-purple-50 rounded-lg p-3">
              <p className="text-xs text-gray-600 mb-1">
                Temporary Application ID
              </p>
              <div className="flex items-center justify-between">
                <code className="text-sm font-mono font-bold text-purple-600">
                  {application.tempApplicationId}
                </code>
                <button
                  onClick={() =>
                    handleCopy(application.tempApplicationId!, 'tempId')
                  }
                  className="text-purple-600 hover:text-purple-700 transition"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              {copied === 'tempId' && (
                <p className="text-xs text-green-600 mt-1">Copied!</p>
              )}
            </div>
          )}

          {/* Key Details */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-gray-500">Father's Name</p>
              <p className="font-semibold text-gray-900">
                {application.fatherName}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Mother's Name</p>
              <p className="font-semibold text-gray-900">
                {application.motherName}
              </p>
            </div>
            <div>
              <p className="text-gray-500">DOB</p>
              <p className="font-semibold text-gray-900">
                {new Date(application.dateOfBirth).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Purpose</p>
              <p className="font-semibold text-gray-900">
                {application.purposeOfVisit}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gray-50 border-t border-gray-100 p-4 flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 flex items-center justify-center gap-2"
            onClick={() => setShowDetails(true)}
          >
            <Eye className="w-4 h-4" />
            View Details
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownloadPhoto}
            disabled={!application.photoUrl}
            title="Download photo"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownloadPassport}
            disabled={!application.passportBioUrl}
            title="Download passport bio"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        title="Application Details"
      >
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Personal Information
            </h4>
            <dl className="space-y-1 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-600">Full Name:</dt>
                <dd className="font-semibold text-gray-900">
                  {application.fullName}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Email:</dt>
                <dd className="font-semibold text-gray-900">
                  {application.email}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Phone:</dt>
                <dd className="font-semibold text-gray-900">
                  {application.phone}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Passport:</dt>
                <dd className="font-semibold text-gray-900">
                  {application.passportNumber}
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
            <p className="text-sm text-gray-700">{application.address}</p>
            <p className="text-sm text-gray-700">
              {application.city}, {application.state} {application.pincode}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Travel Information
            </h4>
            <dl className="space-y-1 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-600">Purpose:</dt>
                <dd className="font-semibold text-gray-900">
                  {application.purposeOfVisit}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Duration:</dt>
                <dd className="font-semibold text-gray-900">
                  {application.estimatedStayDuration}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Previous Travel:</dt>
                <dd className="font-semibold text-gray-900">
                  {application.previousTravelCountries}
                </dd>
              </div>
            </dl>
          </div>

          {application.adminNotes && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Admin Notes</h4>
              <p className="text-sm text-gray-700">{application.adminNotes}</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
