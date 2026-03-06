import { Plus, Trash2, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const emptyEdu = { institution: '', degree: '', field: '', location: '', startDate: '', endDate: '', gpa: '', honors: '' };

export default function EducationForm({ data, onChange }) {
  const [expanded, setExpanded] = useState(0);

  const addEdu = () => { onChange([...data, { ...emptyEdu }]); setExpanded(data.length); };
  const removeEdu = (i) => onChange(data.filter((_, idx) => idx !== i));
  const updateEdu = (i, field, value) => {
    const updated = [...data];
    updated[i] = { ...updated[i], [field]: value };
    onChange(updated);
  };

  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="section-title">Education</h2>
          <p className="text-slate-400 text-sm mt-1">Add your educational background</p>
        </div>
        <button onClick={addEdu} className="btn-primary text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Education
        </button>
      </div>

      {data.length === 0 && (
        <div className="card border-dashed border-slate-700 text-center py-12">
          <GraduationCap className="w-10 h-10 text-slate-700 mx-auto mb-3" />
          <p className="text-slate-500">No education added yet</p>
          <button onClick={addEdu} className="btn-primary text-sm mt-4 inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Education
          </button>
        </div>
      )}

      <div className="space-y-4">
        {data.map((edu, i) => (
          <div key={i} className="card">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpanded(expanded === i ? -1 : i)}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent-500/10 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-accent-400" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{edu.degree || 'Degree'} {edu.field && `in ${edu.field}`}</p>
                  <p className="text-slate-500 text-xs">{edu.institution || 'Institution'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); removeEdu(i); }} className="text-slate-600 hover:text-red-400 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
                {expanded === i ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </div>
            </div>

            {expanded === i && (
              <div className="mt-5 space-y-4 border-t border-slate-800 pt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: 'institution', label: 'Institution', placeholder: 'MIT' },
                    { key: 'degree', label: 'Degree', placeholder: 'Bachelor of Science' },
                    { key: 'field', label: 'Field of Study', placeholder: 'Computer Science' },
                    { key: 'location', label: 'Location', placeholder: 'Cambridge, MA' },
                    { key: 'startDate', label: 'Start Date', placeholder: 'Sep 2018' },
                    { key: 'endDate', label: 'End Date', placeholder: 'May 2022' },
                    { key: 'gpa', label: 'GPA (optional)', placeholder: '3.8/4.0' },
                    { key: 'honors', label: 'Honors (optional)', placeholder: 'Magna Cum Laude' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="label">{field.label}</label>
                      <input className="input" placeholder={field.placeholder} value={edu[field.key]} onChange={e => updateEdu(i, field.key, e.target.value)} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
