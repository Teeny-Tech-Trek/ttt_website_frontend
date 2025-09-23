import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Target, FileText, Settings, Shield, Code, Database, Users, BarChart3, Rocket, MessageSquare, Calculator, Cloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  icon: React.ReactNode;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Do we have 1–2 measurable outcomes for AI in the next 90 days (e.g., \"deflect 40% FAQs\", \"reduce touches/shipment 30%\")?",
    icon: <Target className="w-5 h-5" />
  },
  {
    id: 2,
    text: "Have we identified our top repetitive processes (volume/month, SLA impact, handle time)?",
    icon: <BarChart3 className="w-5 h-5" />
  },
  {
    id: 3,
    text: "Is there a single high-impact process we're willing to pilot in 4 weeks?",
    icon: <Rocket className="w-5 h-5" />
  },
  {
    id: 4,
    text: "Are policies/FAQs/docs centralized and current, and exportable (PDF/text/Notion/Drive)?",
    icon: <FileText className="w-5 h-5" />
  },
  {
    id: 5,
    text: "Do we know where sensitive/PII data lives and the rules for handling/redaction?",
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: 6,
    text: "Can we access core tools via API or service accounts (e.g., HubSpot/Zendesk/Gmail/Sheets)?",
    icon: <Code className="w-5 h-5" />
  },
  {
    id: 7,
    text: "Do we have sample data and test accounts for safe development/UAT?",
    icon: <Database className="w-5 h-5" />
  },
  {
    id: 8,
    text: "Are refusal rules (no medical/legal/financial advice, risky actions) and escalation paths defined?",
    icon: <AlertTriangle className="w-5 h-5" />
  },
  {
    id: 9,
    text: "Can we log every agent/tool action with inputs/outputs (audit trail)?",
    icon: <FileText className="w-5 h-5" />
  },
  {
    id: 10,
    text: "Is an internal owner assigned (with time for reviews during both sprints)?",
    icon: <Users className="w-5 h-5" />
  },
  {
    id: 11,
    text: "Are success metrics agreed and easy to track (e.g., deflection %, first-response time, touches/shipment, speed-to-lead)?",
    icon: <BarChart3 className="w-5 h-5" />
  },
  {
    id: 12,
    text: "Have we selected 8–10 intents/actions to automate in Sprint 1?",
    icon: <Settings className="w-5 h-5" />
  },
  {
    id: 13,
    text: "Do we have a go-live comms & training plan for affected teams?",
    icon: <MessageSquare className="w-5 h-5" />
  },
  {
    id: 14,
    text: "Have we estimated LLM/voice costs and set quotas/rate limits to control spend?",
    icon: <Calculator className="w-5 h-5" />
  },
  {
    id: 15,
    text: "Are we comfortable with least-privilege access in vendor cloud, or do we prefer deployment in our cloud/VPC?",
    icon: <Cloud className="w-5 h-5" />
  }
];

type Answer = 'yes' | 'partial' | 'no' | null;

const AuditForm: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, Answer>>(
    Object.fromEntries(questions.map(q => [q.id, null]))
  );
const navigate = useNavigate();
  const handleAnswerChange = (questionId: number, answer: Answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateScore = (): number => {
    return Object.values(answers).reduce((sum, answer) => {
      if (answer === 'yes') return sum + 1;
      if (answer === 'partial') return sum + 0.5;
      return sum;
    }, 0);
  };

  const getScoreBadge = (score: number): { icon: React.ReactNode; bgColor: string; textColor: string } => {
    if (score >= 12) return { icon: <CheckCircle className="w-5 h-5" />, bgColor: 'bg-emerald-100', textColor: 'text-emerald-800' };
    if (score >= 8) return { icon: <AlertTriangle className="w-5 h-5" />, bgColor: 'bg-amber-100', textColor: 'text-amber-800' };
    return { icon: <XCircle className="w-5 h-5" />, bgColor: 'bg-red-100', textColor: 'text-red-800' };
  };

  const getScoreMessage = (score: number): string => {
    if (score >= 12) return "Ready to start a 4-week pilot";
    if (score >= 8) return "Close—address gaps in data, access, or guardrails first";
    return "Do a short readiness sprint (docs, access, owner, metrics) before piloting";
  };

  const score = calculateScore();
  const scoreBadge = getScoreBadge(score);
  const answeredQuestions = Object.values(answers).filter(a => a !== null).length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full mb-6">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Readiness Audit</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Evaluate your organization's readiness to implement AI solutions with this comprehensive 15-question assessment.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-500">{answeredQuestions}/15 questions</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-600 to-teal-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(answeredQuestions / 15) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6 mb-10">
        {questions.map((q, i) => (
          <div key={q.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-100 to-teal-100 rounded-lg flex items-center justify-center text-blue-600">
                {q.icon}
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  <span className="text-blue-600 mr-2">Q{i + 1}.</span>
                  {q.text}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {[
                    { value: 'yes', label: 'Yes', color: 'emerald' },
                    { value: 'partial', label: 'Partially', color: 'amber' },
                    { value: 'no', label: 'No', color: 'red' }
                  ].map(opt => (
                    <label key={opt.value} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={opt.value}
                        checked={answers[q.id] === opt.value}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value as Answer)}
                        className="sr-only"
                      />
                      <div className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-all duration-200
                        ${answers[q.id] === opt.value ? `border-${opt.color}-500 bg-${opt.color}-500` : `border-gray-300 group-hover:border-${opt.color}-300`}
                      `}>
                        {answers[q.id] === opt.value && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <span className={`
                        font-medium transition-colors duration-200
                        ${answers[q.id] === opt.value ? `text-${opt.color}-700` : 'text-gray-700 group-hover:text-gray-900'}
                      `}>
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Score Display */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-8 border border-blue-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your AI Readiness Score</h2>
          <div className="flex items-center justify-center mb-6">
            <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">{score.toFixed(1)}</div>
            <div className="text-2xl text-gray-400 ml-2">/15</div>
          </div>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${scoreBadge.bgColor} ${scoreBadge.textColor} font-semibold mb-4`}>
            {scoreBadge.icon} <span>{getScoreMessage(score)}</span>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Take the Next Step?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Based on your assessment results, we can help you create a customized AI implementation roadmap 
            tailored to your organization's specific needs and readiness level.
          </p>
          
<button
  onClick={() => navigate("/#contact")}
  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
>
  <MessageSquare className="w-5 h-5 mr-2" />
  Get Your Personalized Roadmap
</button>

        </div>
      </div>
    </div>
  );
};

export default AuditForm;
