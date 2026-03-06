import { Link } from 'react-router-dom';
import { Sparkles, FileText, BarChart3, Download, CheckCircle2, Zap, Shield, Star } from 'lucide-react';
import Navbar from '../components/layout/Navbar';

const features = [
  { icon: FileText, title: 'Smart Resume Builder', desc: 'Step-by-step guided builder with real-time preview. Create stunning resumes in minutes.' },
  { icon: Sparkles, title: 'AI-Powered Analysis', desc: 'Claude AI analyzes your resume for ATS compatibility, tone, keywords, and impact.' },
  { icon: BarChart3, title: 'ATS Score & Keywords', desc: 'Know exactly how your resume scores against applicant tracking systems.' },
  { icon: Zap, title: 'Instant Improvements', desc: 'Get AI suggestions for every section. Rewrite weak bullets with one click.' },
  { icon: Download, title: 'PDF Export', desc: 'Download a pixel-perfect PDF ready to send to any employer.' },
  { icon: Shield, title: 'Multiple Templates', desc: 'Choose from professional templates optimized for different industries.' },
];

const stats = [
  { label: 'Resumes Created', value: '50K+' },
  { label: 'AI Suggestions', value: '2M+' },
  { label: 'Success Rate', value: '94%' },
  { label: 'Templates', value: '12+' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium px-4 py-2 rounded-full mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            Powered by Google Gemini AI
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6 animate-slide-up">
            Build Resumes That
            <span className="block bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
              Actually Get Hired
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            Create, analyze, and optimize your resume with AI. Get ATS scores, keyword suggestions, and instant improvements tailored to your target role.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link to="/register" className="btn-primary text-base px-8 py-4 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Start Building Free
            </Link>
            <Link to="/login" className="btn-secondary text-base px-8 py-4 flex items-center justify-center gap-2">
              <FileText className="w-5 h-5" />
              Sign In
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 mt-10 text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              No credit card required
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Free to start
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-400" />
              4.9 / 5 rating
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-slate-800 bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-white mb-4">Everything You Need to Land the Job</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              From blank page to interview-ready resume — powered by AI at every step.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="card hover:border-slate-700 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-4 group-hover:bg-brand-500/20 transition-all">
                  <feature.icon className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="card border-brand-500/30 bg-gradient-to-br from-brand-500/5 to-accent-500/5 p-12">
            <Sparkles className="w-10 h-10 text-brand-400 mx-auto mb-6" />
            <h2 className="font-display text-4xl font-bold text-white mb-4">Ready to Get Hired?</h2>
            <p className="text-slate-400 mb-8">Join thousands of job seekers using AI to land their dream jobs.</p>
            <Link to="/register" className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Create Your Resume Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p>© 2024 ResumeAI — Built with React, Node.js & Google Gemini AI</p>
      </footer>
    </div>
  );
}
