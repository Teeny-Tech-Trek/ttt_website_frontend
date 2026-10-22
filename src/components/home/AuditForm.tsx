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
    text: "Does your organisation have a clearly defined AI strategy that is aligned with its current business priorities?",
    icon: <Target className="w-5 h-5" />
  },
  {
    id: 2,
    text: "Have you identified the business processes where AI could create the greatest measurable impact?",
    icon: <BarChart3 className="w-5 h-5" />
  },
  {
    id: 3,
    text: "Do you have a clear understanding of how much time your teams currently spend on repetitive or manual tasks?",
    icon: <Rocket className="w-5 h-5" />
  },
  {
    id: 4,
    text: "Have you identified at least one high-impact workflow that could realistically be improved with AI within the next 90 days?",
    icon: <FileText className="w-5 h-5" />
  },
  {
    id: 5,
    text: "Does your organisation have access to the data required to support its planned AI initiatives?",
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: 6,
    text: "Is your business data organised, accurate, and consistent enough to be reliably used by AI systems?",
    icon: <Code className="w-5 h-5" />
  },
  {
    id: 7,
    text: "Do your employees have access to approved AI tools for their day-to-day work?",
    icon: <Database className="w-5 h-5" />
  },
  {
    id: 8,
    text: "Does your organisation have visibility into which AI tools and platforms employees are currently using?",
    icon: <AlertTriangle className="w-5 h-5" />
  },
  {
    id: 9,
    text: "Does your organisation have clear guidelines defining what company or customer information can and cannot be shared with AI tools?",
    icon: <FileText className="w-5 h-5" />
  },
  {
    id: 10,
    text: "Do you have a defined process for reviewing and approving new AI tools before they are introduced into your organisation?",
    icon: <Users className="w-5 h-5" />
  },
  {
    id: 11,
    text: "Is there a clearly identified person or team responsible for leading and managing your AI initiatives?",
    icon: <BarChart3 className="w-5 h-5" />
  },
  {
    id: 12,
    text: "Do your teams have the skills and training required to use AI effectively and responsibly?",
    icon: <Settings className="w-5 h-5" />
  },
  {
    id: 13,
    text: "Are your existing business systems and software capable of integrating with AI tools or automation platforms?",
    icon: <MessageSquare className="w-5 h-5" />
  },
  {
    id: 14,
    text: "Does your organisation have a way to measure the business impact and ROI of its current or planned AI initiatives?",
    icon: <Calculator className="w-5 h-5" />
  },
  {
    id: 15,
    text: "Is your organisation ready to move from experimenting with AI to implementing a real AI-powered workflow or solution?",
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

  const COLOR_STYLES = {
    emerald: {
      activeCircle: 'border-emerald-500 bg-emerald-500',
      hoverBorder: 'group-hover:border-emerald-300',
      activeText: 'text-emerald-700',
    },
    amber: {
      activeCircle: 'border-amber-500 bg-amber-500',
      hoverBorder: 'group-hover:border-amber-300',
      activeText: 'text-amber-700',
    },
    red: {
      activeCircle: 'border-red-500 bg-red-500',
      hoverBorder: 'group-hover:border-red-300',
      activeText: 'text-red-700',
    },
  } as const;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 mt-20 sm:mt-24">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full mb-6">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">AI Readiness Audit</h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
          <div key={q.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-100 to-teal-100 rounded-lg flex items-center justify-center text-blue-600">
                {q.icon}
              </div>
              <div className="flex-grow">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                  <span className="text-blue-600 mr-2">Q{i + 1}.</span>
                  {q.text}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {[
                    { value: 'yes', label: 'Yes', color: 'emerald' as const },
                    { value: 'partial', label: 'Partially', color: 'amber' as const },
                    { value: 'no', label: 'No', color: 'red' as const }
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
                        ${answers[q.id] === opt.value ? COLOR_STYLES[opt.color].activeCircle : `border-gray-300 ${COLOR_STYLES[opt.color].hoverBorder}`}
                      `}>
                        {answers[q.id] === opt.value && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <span className={`
                        font-medium transition-colors duration-200
                        ${answers[q.id] === opt.value ? COLOR_STYLES[opt.color].activeText : 'text-gray-700 group-hover:text-gray-900'}
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
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-5 sm:p-8 border border-blue-100">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Your AI Readiness Score</h2>
          <div className="flex items-center justify-center mb-6">
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">{score.toFixed(1)}</div>
            <div className="text-xl sm:text-2xl text-gray-400 ml-2">/15</div>
          </div>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${scoreBadge.bgColor} ${scoreBadge.textColor} text-xs sm:text-sm font-semibold mb-4`}>
            {scoreBadge.icon} <span>{getScoreMessage(score)}</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AuditForm;
