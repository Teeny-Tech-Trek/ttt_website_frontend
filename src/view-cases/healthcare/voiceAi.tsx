import React from 'react';
import { Phone, MessageCircle, Shield } from 'lucide-react';

const VoiceAISection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Visual elements */}
          <div className="relative">
            {/* Voice AI Card */}
            <div className="absolute top-0 left-0 bg-blue-600 text-white p-6 rounded-2xl shadow-lg max-w-xs z-10">
              <div className="flex items-center gap-3 mb-3">
                <Phone className="h-6 w-6" />
                <h3 className="font-bold text-lg">Voice AI</h3>
              </div>
              <p className="text-blue-100 text-sm">
                Voice calls to enhance patient care post-treatment
              </p>
            </div>

            {/* Main healthcare professional image */}
            <div className="mt-16 ml-8 relative">
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl p-8 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Healthcare Professional"
                  className="w-full h-80 object-cover rounded-2xl"
                />
                
                {/* HIPAA Badge */}
                <div className="absolute bottom-4 left-4 bg-white rounded-full p-3 shadow-lg">
                  <Shield className="h-6 w-6 text-blue-600" />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded">HIPAA</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient interaction card */}
            <div className="absolute bottom-0 right-0 bg-white rounded-2xl shadow-xl p-6 max-w-sm z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">A</span>
                </div>
                <div>
                  <div className="font-bold text-blue-600">AFC Urgent Care</div>
                  <div className="text-sm text-gray-500">Madison, WI</div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 mb-2">Feb 10, 3:45pm</div>
              <div className="text-sm mb-2">
                <span className="font-semibold">Patient:</span> Kelly
              </div>
              <div className="text-sm mb-3">
                <span className="font-semibold">Treatment:</span> Respiratory Infection
              </div>
              
              <div className="text-sm">
                <div className="font-semibold mb-2">Topics:</div>
                <ul className="space-y-1 text-gray-600">
                  <li>• Progress check-in</li>
                  <li>• Medication review</li>
                  <li>• Patient questions</li>
                  <li>• Follow-up appointment</li>
                </ul>
              </div>
            </div>

            {/* Background patient image */}
            <div className="absolute top-8 right-8 opacity-60">
              <img 
                src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                alt="Patient on phone"
                className="w-48 h-48 object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Meet Aimee ("Amy")
              </h2>
              <h3 className="text-2xl font-semibold text-blue-600 mb-6">
                Your Voice Care Coordinator
              </h3>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Aimee is a fully automated post-care voice coordinator
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-3"></div>
                <p className="text-gray-700 text-lg">
                  Contacts patients as part of follow-up engagement
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-3"></div>
                <p className="text-gray-700 text-lg">
                  Coordinates communication between patients, providers, and staff
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-3"></div>
                <p className="text-gray-700 text-lg">
                  Enhances the patient experience
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-3"></div>
                <p className="text-gray-700 text-lg">
                  Ensures continuity of care across services
                </p>
              </div>
            </div>

            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 mt-8">
              Talk with Aimee
              <MessageCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAISection;