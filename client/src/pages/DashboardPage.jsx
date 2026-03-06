import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import { Plus, FileText, BarChart3, Eye, Trash2, Clock, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { resumes, loading, fetchResumes, createResume, deleteResume } = useResume();
  const navigate = useNavigate();

  useEffect(() => { fetchResumes(); }, []);

  const handleCreate = async () => {
    const resume = await createResume();
    if (resume) navigate(`/builder/${resume._id}`);
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (window.confirm('Delete this resume?')) await deleteResume(id);
  };

  const getScore = (resume) => resume.aiAnalysis?.atsScore;
  const getScoreColor = (score) => {
    if (!score) return 'text-slate-500';
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">
              Welcome back, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="text-slate-400 mt-1">Manage and optimize your resumes</p>
          </div>
          <button onClick={handleCreate} className="btn-primary flex items-center gap-2 self-start md:self-auto">
            <Plus className="w-5 h-5" />
            New Resume
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Resumes', value: resumes.length, icon: FileText, color: 'brand' },
            { label: 'Analyzed', value: resumes.filter(r => r.aiAnalysis?.atsScore).length, icon: BarChart3, color: 'accent' },
            { label: 'Avg ATS Score', value: resumes.length ? Math.round(resumes.filter(r => r.aiAnalysis?.atsScore).reduce((acc, r) => acc + r.aiAnalysis.atsScore, 0) / (resumes.filter(r => r.aiAnalysis?.atsScore).length || 1)) + '%' : '—', icon: Sparkles, color: 'green' },
            { label: 'Last Updated', value: resumes[0] ? new Date(resumes[0].updatedAt).toLocaleDateString() : '—', icon: Clock, color: 'yellow' },
          ].map((stat) => (
            <div key={stat.label} className="card">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg bg-${stat.color === 'brand' ? 'brand' : stat.color === 'accent' ? 'accent' : stat.color}-500/10 flex items-center justify-center`}>
                  <stat.icon className={`w-4 h-4 text-${stat.color === 'brand' ? 'brand' : stat.color === 'accent' ? 'accent' : stat.color}-400`} />
                </div>
                <div>
                  <div className="font-display text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-slate-500 text-xs">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumes Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
          </div>
        ) : resumes.length === 0 ? (
          <div className="text-center py-24 card">
            <FileText className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-white mb-2">No resumes yet</h3>
            <p className="text-slate-400 mb-6">Create your first AI-powered resume</p>
            <button onClick={handleCreate} className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Create Resume
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => {
              const score = getScore(resume);
              return (
                <div key={resume._id} className="card hover:border-slate-700 transition-all duration-300 group relative">
                  {/* Score Badge */}
                  {score && (
                    <div className={`absolute top-4 right-4 badge bg-slate-800 ${getScoreColor(score)}`}>
                      ATS {score}%
                    </div>
                  )}

                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-brand-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">{resume.title || 'Untitled Resume'}</h3>
                      <p className="text-slate-500 text-sm mt-0.5">
                        {resume.personalInfo?.fullName || 'No name set'}
                      </p>
                    </div>
                  </div>

                  {resume.targetRole && (
                    <div className="badge bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4">
                      {resume.targetRole}
                    </div>
                  )}

                  <div className="text-slate-500 text-xs mb-4 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Updated {new Date(resume.updatedAt).toLocaleDateString()}
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/builder/${resume._id}`} className="flex-1 btn-secondary text-sm flex items-center justify-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" /> Edit
                    </Link>
                    <Link to={`/analyzer/${resume._id}`} className="flex-1 btn-secondary text-sm flex items-center justify-center gap-1.5 text-accent-400 border-accent-500/30 hover:border-accent-500/50">
                      <Sparkles className="w-3.5 h-3.5" /> Analyze
                    </Link>
                    <Link to={`/preview/${resume._id}`} className="btn-ghost text-sm px-3">
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button onClick={(e) => handleDelete(e, resume._id)} className="btn-ghost text-sm px-3 text-red-400 hover:text-red-300 hover:bg-red-500/10">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Add new card */}
            <button onClick={handleCreate} className="card border-dashed border-slate-700 hover:border-brand-500/50 flex flex-col items-center justify-center gap-3 min-h-[200px] text-slate-600 hover:text-brand-400 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6" />
              </div>
              <span className="font-medium text-sm">New Resume</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
