import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import Navbar from '../components/layout/Navbar';
import PersonalInfoForm from '../components/resume/PersonalInfoForm';
import ExperienceForm from '../components/resume/ExperienceForm';
import EducationForm from '../components/resume/EducationForm';
import SkillsForm from '../components/resume/SkillsForm';
import ProjectsForm from '../components/resume/ProjectsForm';
import { Save, Eye, BarChart3, ChevronRight, User, Briefcase, GraduationCap, Code2, FolderGit2, Award } from 'lucide-react';
import toast from 'react-hot-toast';

const STEPS = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
];

export default function BuilderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentResume, loading, saving, fetchResume, saveResume, updateCurrent } = useResume();
  const [activeStep, setActiveStep] = useState('personal');
  const [localData, setLocalData] = useState({});

  useEffect(() => {
    if (id) fetchResume(id);
  }, [id]);

  useEffect(() => {
    if (currentResume) setLocalData(currentResume);
  }, [currentResume]);

  const handleSave = async () => {
    await saveResume(id, localData);
  };

  const handleUpdate = (field, value) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
  };

  const handleTitleChange = (e) => {
    setLocalData(prev => ({ ...prev, title: e.target.value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  const activeComponent = {
    personal: <PersonalInfoForm data={localData.personalInfo || {}} onChange={(v) => handleUpdate('personalInfo', v)} />,
    experience: <ExperienceForm data={localData.experience || []} onChange={(v) => handleUpdate('experience', v)} />,
    education: <EducationForm data={localData.education || []} onChange={(v) => handleUpdate('education', v)} />,
    skills: <SkillsForm data={localData.skills || {}} onChange={(v) => handleUpdate('skills', v)} />,
    projects: <ProjectsForm data={localData.projects || []} onChange={(v) => handleUpdate('projects', v)} />,
  }[activeStep];

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="pt-16">
        {/* Builder Toolbar */}
        <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <input
              type="text"
              value={localData.title || ''}
              onChange={handleTitleChange}
              placeholder="Resume Title"
              className="bg-transparent text-white font-semibold text-lg focus:outline-none placeholder-slate-600 border-b border-transparent focus:border-brand-500 transition-colors pb-0.5"
            />
            <div className="flex items-center gap-2">
              <Link to={`/analyzer/${id}`} className="btn-ghost text-sm flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> Analyze
              </Link>
              <Link to={`/preview/${id}`} className="btn-ghost text-sm flex items-center gap-2">
                <Eye className="w-4 h-4" /> Preview
              </Link>
              <button onClick={handleSave} disabled={saving} className="btn-primary text-sm flex items-center gap-2">
                {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
          {/* Sidebar Steps */}
          <aside className="w-56 flex-shrink-0 hidden md:block">
            <div className="sticky top-32">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Sections</p>
              <nav className="flex flex-col gap-1">
                {STEPS.map((step, i) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                      activeStep === step.id
                        ? 'bg-brand-500/15 text-brand-400 border border-brand-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <step.icon className="w-4 h-4 flex-shrink-0" />
                    {step.label}
                  </button>
                ))}
              </nav>

              <div className="mt-8 p-4 rounded-xl bg-accent-500/10 border border-accent-500/20">
                <p className="text-accent-400 text-xs font-semibold mb-1">💡 Pro Tip</p>
                <p className="text-slate-400 text-xs leading-relaxed">After filling all sections, use the Analyze button to get AI feedback and improve your ATS score.</p>
              </div>
            </div>
          </aside>

          {/* Form Content */}
          <div className="flex-1 max-w-3xl">
            {/* Mobile step tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6 md:hidden">
              {STEPS.map((step) => (
                <button key={step.id} onClick={() => setActiveStep(step.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    activeStep === step.id ? 'bg-brand-500/15 text-brand-400 border border-brand-500/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                  <step.icon className="w-3.5 h-3.5" />
                  {step.label}
                </button>
              ))}
            </div>

            {activeComponent}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-slate-800">
              <button
                onClick={() => {
                  const currentIndex = STEPS.findIndex(s => s.id === activeStep);
                  if (currentIndex > 0) setActiveStep(STEPS[currentIndex - 1].id);
                }}
                disabled={STEPS.findIndex(s => s.id === activeStep) === 0}
                className="btn-secondary text-sm disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              <button
                onClick={async () => {
                  await handleSave();
                  const currentIndex = STEPS.findIndex(s => s.id === activeStep);
                  if (currentIndex < STEPS.length - 1) {
                    setActiveStep(STEPS[currentIndex + 1].id);
                  } else {
                    navigate(`/analyzer/${id}`);
                  }
                }}
                className="btn-primary text-sm flex items-center gap-2"
              >
                {STEPS.findIndex(s => s.id === activeStep) === STEPS.length - 1 ? 'Analyze with AI →' : 'Save & Next →'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
