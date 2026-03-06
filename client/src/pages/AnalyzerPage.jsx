import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { useAI } from '../hooks/useAI';
import Navbar from '../components/layout/Navbar';
import { Sparkles, BarChart3, CheckCircle2, AlertCircle, Lightbulb, Tag, ArrowLeft, Target, RefreshCw } from 'lucide-react';

function ScoreRing({ score, size = 120, label }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? '#4ade80' : score >= 60 ? '#facc15' : '#f87171';

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#1e293b" strokeWidth="8" />
        <circle cx="50" cy="50" r={radius} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 50 50)"
          style={{ transition: 'stroke-dashoffset 1.5s ease' }} />
        <text x="50" y="47" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="Syne">{score}</text>
        <text x="50" y="62" textAnchor="middle" fill="#94a3b8" fontSize="9">/100</text>
      </svg>
      <span className="text-slate-400 text-sm">{label}</span>
    </div>
  );
}

export default function AnalyzerPage() {
  const { id } = useParams();
  const { currentResume, loading, fetchResume } = useResume();
  const { analyzeResume, loading: aiLoading } = useAI();
  const [analysis, setAnalysis] = useState(null);
  const [targetRole, setTargetRole] = useState('');

  useEffect(() => {
    if (id) fetchResume(id).then(r => {
      if (r?.aiAnalysis?.atsScore) setAnalysis(r.aiAnalysis);
      if (r?.targetRole) setTargetRole(r.targetRole);
    });
  }, [id]);

  const handleAnalyze = async () => {
    const result = await analyzeResume(id, targetRole);
    if (result) setAnalysis(result);
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="pt-24 pb-16 px-4 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to={`/builder/${id}`} className="btn-ghost p-2">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-display text-3xl font-bold text-white">AI Analysis</h1>
            <p className="text-slate-400 mt-1">{currentResume?.title || 'Resume Analysis'}</p>
          </div>
        </div>

        {/* Target Role + Analyze */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="label flex items-center gap-2">
                <Target className="w-4 h-4 text-brand-400" />
                Target Role (optional but recommended)
              </label>
              <input className="input" placeholder="e.g. Senior Frontend Engineer, Product Manager..."
                value={targetRole} onChange={e => setTargetRole(e.target.value)} />
            </div>
            <button onClick={handleAnalyze} disabled={aiLoading}
              className="btn-primary flex items-center gap-2 whitespace-nowrap">
              {aiLoading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing...</>
              ) : (
                <><Sparkles className="w-4 h-4" /> {analysis ? 'Re-analyze' : 'Analyze Resume'}</>
              )}
            </button>
          </div>
        </div>

        {!analysis && !aiLoading && (
          <div className="text-center py-20 card">
            <BarChart3 className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-white mb-2">No analysis yet</h3>
            <p className="text-slate-400 mb-6">Click "Analyze Resume" to get detailed AI feedback</p>
          </div>
        )}

        {aiLoading && (
          <div className="text-center py-20">
            <div className="w-12 h-12 rounded-full border-2 border-brand-500/30 border-t-brand-500 animate-spin mx-auto mb-4" />
            <p className="text-slate-400">Claude AI is analyzing your resume...</p>
            <p className="text-slate-600 text-sm mt-1">This usually takes 10-20 seconds</p>
          </div>
        )}

        {analysis && !aiLoading && (
          <div className="space-y-6 animate-fade-in">
            {/* Score Cards */}
            <div className="card">
              <h2 className="font-display text-xl font-bold text-white mb-6">Overall Scores</h2>
              <div className="flex flex-wrap justify-around gap-8">
                <ScoreRing score={analysis.atsScore || 0} label="ATS Score" />
                <ScoreRing score={analysis.overallScore || 0} label="Overall Score" />
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" /> Strengths
                </h3>
                <ul className="space-y-3">
                  {(analysis.strengths || []).map((s, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card">
                <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400" /> Areas to Improve
                </h3>
                <ul className="space-y-3">
                  {(analysis.weaknesses || []).map((w, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-300">
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Suggestions */}
            <div className="card">
              <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" /> AI Recommendations
              </h3>
              <div className="space-y-3">
                {(analysis.suggestions || []).map((s, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
                    <span className="w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-slate-300 text-sm">{s}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Keywords */}
            {analysis.keywords && (
              <div className="card">
                <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-brand-400" /> Keyword Analysis
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-green-400 text-sm font-semibold mb-2">✅ Present ({analysis.keywords.present?.length || 0})</p>
                    <div className="flex flex-wrap gap-2">
                      {(analysis.keywords.present || []).map(k => (
                        <span key={k} className="badge bg-green-500/10 text-green-400 border border-green-500/20">{k}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-red-400 text-sm font-semibold mb-2">❌ Missing ({analysis.keywords.missing?.length || 0})</p>
                    <div className="flex flex-wrap gap-2">
                      {(analysis.keywords.missing || []).map(k => (
                        <span key={k} className="badge bg-red-500/10 text-red-400 border border-red-500/20">{k}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Section Feedback */}
            {analysis.sectionFeedback && (
              <div className="card">
                <h3 className="font-display text-lg font-bold text-white mb-4">Section-by-Section Feedback</h3>
                <div className="space-y-4">
                  {Object.entries(analysis.sectionFeedback).map(([section, feedback]) => (
                    <div key={section} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                      <p className="text-brand-400 text-sm font-semibold capitalize mb-2">{section}</p>
                      <p className="text-slate-300 text-sm leading-relaxed">{feedback}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Link to={`/builder/${id}`} className="btn-secondary flex-1 text-center">← Back to Editor</Link>
              <Link to={`/preview/${id}`} className="btn-primary flex-1 text-center">Preview Resume →</Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
