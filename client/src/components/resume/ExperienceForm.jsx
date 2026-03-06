import { Plus, Trash2, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const emptyExp = { company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '', bullets: [''] };

export default function ExperienceForm({ data, onChange }) {
  const [expanded, setExpanded] = useState(0);

  const addExp = () => {
    onChange([...data, { ...emptyExp }]);
    setExpanded(data.length);
  };

  const removeExp = (i) => onChange(data.filter((_, idx) => idx !== i));

  const updateExp = (i, field, value) => {
    const updated = [...data];
    updated[i] = { ...updated[i], [field]: value };
    onChange(updated);
  };

  const addBullet = (i) => {
    const updated = [...data];
    updated[i].bullets = [...(updated[i].bullets || []), ''];
    onChange(updated);
  };

  const updateBullet = (expIdx, bulletIdx, value) => {
    const updated = [...data];
    updated[expIdx].bullets[bulletIdx] = value;
    onChange(updated);
  };

  const removeBullet = (expIdx, bulletIdx) => {
    const updated = [...data];
    updated[expIdx].bullets = updated[expIdx].bullets.filter((_, i) => i !== bulletIdx);
    onChange(updated);
  };

  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="section-title">Work Experience</h2>
          <p className="text-slate-400 text-sm mt-1">Add your relevant work history (most recent first)</p>
        </div>
        <button onClick={addExp} className="btn-primary text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Job
        </button>
      </div>

      {data.length === 0 && (
        <div className="card border-dashed border-slate-700 text-center py-12">
          <Briefcase className="w-10 h-10 text-slate-700 mx-auto mb-3" />
          <p className="text-slate-500">No experience added yet</p>
          <button onClick={addExp} className="btn-primary text-sm mt-4 inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add First Job
          </button>
        </div>
      )}

      <div className="space-y-4">
        {data.map((exp, i) => (
          <div key={i} className="card">
            {/* Header */}
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpanded(expanded === i ? -1 : i)}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-brand-400" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{exp.position || 'New Position'}</p>
                  <p className="text-slate-500 text-xs">{exp.company || 'Company Name'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); removeExp(i); }} className="text-slate-600 hover:text-red-400 transition-colors p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
                {expanded === i ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </div>
            </div>

            {expanded === i && (
              <div className="mt-5 space-y-4 border-t border-slate-800 pt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Job Title</label>
                    <input className="input" placeholder="Software Engineer" value={exp.position} onChange={e => updateExp(i, 'position', e.target.value)} />
                  </div>
                  <div>
                    <label className="label">Company</label>
                    <input className="input" placeholder="Google" value={exp.company} onChange={e => updateExp(i, 'company', e.target.value)} />
                  </div>
                  <div>
                    <label className="label">Location</label>
                    <input className="input" placeholder="San Francisco, CA" value={exp.location} onChange={e => updateExp(i, 'location', e.target.value)} />
                  </div>
                  <div>
                    <label className="label">Start Date</label>
                    <input className="input" placeholder="Jan 2022" value={exp.startDate} onChange={e => updateExp(i, 'startDate', e.target.value)} />
                  </div>
                  <div>
                    <label className="label">End Date</label>
                    <input className="input" placeholder="Present" disabled={exp.current} value={exp.current ? 'Present' : exp.endDate} onChange={e => updateExp(i, 'endDate', e.target.value)} />
                  </div>
                  <div className="flex items-center gap-3 pt-6">
                    <input type="checkbox" id={`current-${i}`} checked={exp.current} onChange={e => updateExp(i, 'current', e.target.checked)} className="w-4 h-4 accent-brand-500" />
                    <label htmlFor={`current-${i}`} className="text-slate-300 text-sm">Currently working here</label>
                  </div>
                </div>

                {/* Bullet Points */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="label mb-0">Key Achievements & Responsibilities</label>
                    <button onClick={() => addBullet(i)} className="text-brand-400 hover:text-brand-300 text-xs font-medium flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Add bullet
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(exp.bullets || ['']).map((bullet, bi) => (
                      <div key={bi} className="flex gap-2">
                        <span className="text-slate-500 mt-3 text-sm">•</span>
                        <input className="input flex-1 text-sm" placeholder="Increased revenue by 30% by implementing automated testing..." value={bullet} onChange={e => updateBullet(i, bi, e.target.value)} />
                        {exp.bullets?.length > 1 && (
                          <button onClick={() => removeBullet(i, bi)} className="text-slate-600 hover:text-red-400 mt-3">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-600 text-xs mt-2">💡 Use action verbs + quantified results (e.g., "Reduced load time by 40%")</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
