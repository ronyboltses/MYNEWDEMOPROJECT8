import React from 'react';
import { Mail } from 'lucide-react';

export default function FeedbackForm() {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Mail className="w-8 h-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
      </div>

      <div className="text-center py-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Send us your feedback</h3>
        <p className="text-gray-600 mb-6">
          We value your feedback! Please send us an email at:
        </p>
        <a
          href="mailto:feedback@constructioncalculator.com"
          className="text-blue-600 font-semibold text-lg hover:text-blue-700"
        >
          feedback@constructioncalculator.com
        </a>
        <p className="mt-6 text-sm text-gray-500">
          We'll get back to you as soon as possible.
        </p>
      </div>
    </div>
  );
}