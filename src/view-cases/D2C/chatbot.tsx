import React from 'react';
import { 
  MessageCircle,
  TrendingUp,
  ArrowRight,
  Clock,
  Zap,
  Brain,
  Target,
  DollarSign,
  BarChart3
} from 'lucide-react';

const ChatbotSolutionsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-black">
            <span className="text-blue-900">D2C Chatbot Solutions</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-black">
            Intelligent chatbot systems designed specifically for direct-to-consumer e-commerce businesses
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Customer Support Chatbot */}
          <div className="h-full p-8 bg-white border border-gray-200 shadow-sm rounded-3xl">
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-blue-900 rounded-2xl">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-4 text-3xl font-bold text-blue-900">
                Customer Support Chatbot
              </h3>
              <p className="text-lg leading-relaxed text-black">
                AI-powered chatbot that handles customer inquiries, order tracking, returns, and support tickets with instant, accurate responses.
              </p>
            </div>

            <div className="mb-8 space-y-6">
              <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-gray-100 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">24/7 Availability</h4>
                    <p className="text-sm text-black">Round-the-clock customer support</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-gray-100 rounded-lg">
                    <Zap className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Instant Responses</h4>
                    <p className="text-sm text-black">Sub-5 second response times</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-gray-100 rounded-lg">
                    <Brain className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Smart Learning</h4>
                    <p className="text-sm text-black">Continuously improves responses</p>
                  </div>
                </div>
              </div>
            </div>

            <button className="flex items-center justify-center w-full px-6 py-3 font-semibold text-white transition-colors bg-blue-900 rounded-xl hover:bg-blue-800 group">
              Try Support Chatbot
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Sales Conversion Chatbot */}
          <div className="h-full p-8 bg-white border border-gray-200 shadow-sm rounded-3xl">
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-blue-900 rounded-2xl">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-4 text-3xl font-bold text-blue-900">
                Sales Conversion Chatbot
              </h3>
              <p className="text-lg leading-relaxed text-black">
                Intelligent sales assistant that provides personalized product recommendations, handles objections, and guides customers to purchase.
              </p>
            </div>

            <div className="mb-8 space-y-6">
              <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-gray-100 rounded-lg">
                    <Target className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Personalized Recommendations</h4>
                    <p className="text-sm text-black">AI-driven product suggestions</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-gray-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Upselling & Cross-selling</h4>
                    <p className="text-sm text-black">Intelligent product bundling</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-gray-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Conversion Analytics</h4>
                    <p className="text-sm text-black">Real-time sales insights</p>
                  </div>
                </div>
              </div>
            </div>

            <button className="flex items-center justify-center w-full px-6 py-3 font-semibold text-white transition-colors bg-blue-900 rounded-xl hover:bg-blue-800 group">
              Boost Sales Now
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatbotSolutionsSection;