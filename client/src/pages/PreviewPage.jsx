import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import Navbar from '../components/layout/Navbar';
import { ArrowLeft, Download, Edit, Mail, Phone, MapPin, Linkedin, Globe, Github } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PreviewPage() {
  const { id } = useParams();
  const { currentResume, loading, fetchResume } = useResume();
  const resumeRef = useRef();

  useEffect(() => { if (id) fetchResume(id); }, [id]);

  const handleDownload = async () => {
    const html2pdf = (await import('html2pdf.js')).default;
    const opt = {
      margin: 0,
      filename: `${currentResume?.personalInfo?.fullName || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    toast.promise(
      html2pdf().set(opt).from(resumeRef.current).save(),
      { loading: 'Generating PDF...', success: 'PDF downloaded!', error: 'Failed to generate PDF' }
    );
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
    </div>
  );

  const r = currentResume;
  if (!r) return null;
  const p = r.personalInfo || {};

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="pt-24 pb-16 px-4 max-w-5xl mx-auto">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link to={`/builder/${id}`} className="btn-ghost p-2"><ArrowLeft className="w-5 h-5" /></Link>
            <h1 className="font-display text-2xl font-bold text-white">Preview</h1>
          </div>
          <div className="flex gap-3">
            <Link to={`/builder/${id}`} className="btn-secondary flex items-center gap-2 text-sm">
              <Edit className="w-4 h-4" /> Edit
            </Link>
            <button onClick={handleDownload} className="btn-primary flex items-center gap-2 text-sm">
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>
        </div>

        {/* Resume Preview */}
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div ref={resumeRef} className="bg-white text-gray-800 p-10 font-sans" style={{ minHeight: '11in', fontFamily: 'Georgia, serif' }}>
            {/* Header */}
            <div className="border-b-2 border-gray-800 pb-4 mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{p.fullName || 'Your Name'}</h1>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                {p.email && <span className="flex items-center gap-1"><Mail size={12} />{p.email}</span>}
                {p.phone && <span className="flex items-center gap-1"><Phone size={12} />{p.phone}</span>}
                {p.location && <span className="flex items-center gap-1"><MapPin size={12} />{p.location}</span>}
                {p.linkedin && <span className="flex items-center gap-1"><Linkedin size={12} />{p.linkedin}</span>}
                {p.github && <span className="flex items-center gap-1"><Github size={12} />{p.github}</span>}
                {p.website && <span className="flex items-center gap-1"><Globe size={12} />{p.website}</span>}
              </div>
            </div>

            {/* Summary */}
            {p.summary && (
              <div className="mb-4">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-2">Professional Summary</h2>
                <p className="text-sm text-gray-700 leading-relaxed">{p.summary}</p>
              </div>
            )}

            {/* Experience */}
            {r.experience?.length > 0 && (
              <div className="mb-4">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">Experience</h2>
                {r.experience.map((exp, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{exp.position}</p>
                        <p className="text-gray-600 text-sm">{exp.company}{exp.location ? ` — ${exp.location}` : ''}</p>
                      </div>
                      <p className="text-gray-500 text-xs whitespace-nowrap">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                    {exp.bullets?.filter(b => b).length > 0 && (
                      <ul className="mt-1.5 space-y-0.5">
                        {exp.bullets.filter(b => b).map((b, bi) => (
                          <li key={bi} className="text-sm text-gray-700 flex gap-2"><span className="flex-shrink-0">•</span>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {r.education?.length > 0 && (
              <div className="mb-4">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">Education</h2>
                {r.education.map((edu, i) => (
                  <div key={i} className="mb-2 flex justify-between">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                      <p className="text-gray-600 text-sm">{edu.institution}{edu.location ? ` — ${edu.location}` : ''}</p>
                      {(edu.gpa || edu.honors) && <p className="text-gray-500 text-xs">{edu.gpa && `GPA: ${edu.gpa}`}{edu.gpa && edu.honors && ' | '}{edu.honors}</p>}
                    </div>
                    <p className="text-gray-500 text-xs whitespace-nowrap">{edu.startDate} – {edu.endDate}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {r.skills && Object.values(r.skills).some(s => s?.length > 0) && (
              <div className="mb-4">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">Skills</h2>
                <div className="space-y-1">
                  {r.skills.technical?.length > 0 && <p className="text-sm"><span className="font-semibold text-gray-900">Technical: </span><span className="text-gray-700">{r.skills.technical.join(', ')}</span></p>}
                  {r.skills.tools?.length > 0 && <p className="text-sm"><span className="font-semibold text-gray-900">Tools: </span><span className="text-gray-700">{r.skills.tools.join(', ')}</span></p>}
                  {r.skills.soft?.length > 0 && <p className="text-sm"><span className="font-semibold text-gray-900">Soft Skills: </span><span className="text-gray-700">{r.skills.soft.join(', ')}</span></p>}
                  {r.skills.languages?.length > 0 && <p className="text-sm"><span className="font-semibold text-gray-900">Languages: </span><span className="text-gray-700">{r.skills.languages.join(', ')}</span></p>}
                </div>
              </div>
            )}

            {/* Projects */}
            {r.projects?.length > 0 && (
              <div className="mb-4">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">Projects</h2>
                {r.projects.map((proj, i) => (
                  <div key={i} className="mb-2">
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-gray-900 text-sm">{proj.name}</p>
                      <div className="flex gap-3 text-xs text-gray-500">
                        {proj.githubUrl && <span>{proj.githubUrl}</span>}
                        {proj.liveUrl && <span>{proj.liveUrl}</span>}
                      </div>
                    </div>
                    {proj.techStack?.length > 0 && <p className="text-xs text-gray-500 mb-1">{proj.techStack.join(' · ')}</p>}
                    {proj.bullets?.filter(b => b).length > 0 && (
                      <ul className="space-y-0.5">
                        {proj.bullets.filter(b => b).map((b, bi) => (
                          <li key={bi} className="text-sm text-gray-700 flex gap-2"><span>•</span>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
