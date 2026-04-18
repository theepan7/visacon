import React from 'react';
import { CheckCircle2, Clock, Shield, Users } from 'lucide-react';
import { Button } from './common/Button';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">VC</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Visa Concierge
            </span>
          </div>
          <Button onClick={onStart}>Get Started</Button>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Your Indian e-Visa,
          <br />
          Simplified
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Let our expert team handle your e-Visa application. We'll collect
          your information, submit to the official portal, and guide you
          through the process.
        </p>
        <Button size="lg" onClick={onStart}>
          Start Your Application
        </Button>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Clock,
              title: 'Fast & Easy',
              description: 'Complete your application in minutes',
            },
            {
              icon: Shield,
              title: 'Secure',
              description: 'Your data is encrypted and protected',
            },
            {
              icon: Users,
              title: 'Expert Support',
              description: 'Our team handles the official submission',
            },
            {
              icon: CheckCircle2,
              title: 'Transparent',
              description: 'Track your application status anytime',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center"
            >
              <feature.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: 'Provide Info',
                description: 'Share your basic details and passport info',
              },
              {
                step: 2,
                title: 'Pay Service Fee',
                description: 'Secure payment for our application service',
              },
              {
                step: 3,
                title: 'Upload Docs',
                description: 'Submit your photo and passport bio page',
              },
              {
                step: 4,
                title: 'We Submit',
                description: 'Our team completes the official application',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Apply?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Start your Indian e-Visa application today
        </p>
        <Button size="lg" onClick={onStart}>
          Begin Application
        </Button>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 text-center text-sm">
        <p>© 2024 Visa Concierge. All rights reserved.</p>
      </div>
    </div>
  );
};
