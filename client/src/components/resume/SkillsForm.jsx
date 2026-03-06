import { Plus, X, Code2 } from 'lucide-react';
import { useState } from 'react';

const SKILL_CATEGORIES = [
  { key: 'technical', label: 'Technical Skills', color: 'brand', placeholder: 'e.g. React, Node.js, Python' },
  { key: 'tools', label: 'Tools & Platforms', color: 'accent', placeholder: 'e.g. Docker, AWS, Git' },
  { key: 'soft', label: 'Soft Skills', color: 'green', placeholder: 'e.g. Leadership, Communication' },
  { key: 'languages', label: 'Languages', color: 'yellow', placeholder: 'e.g. English (Native), Spanish' },
];

const colorMap = {
  brand: 'bg-brand-500/10 text-brand-400 border-brand-500/20',
  accent: 'bg-accent-500/10 text-accent-400 border-accent-500/20',
  green: 'bg-green-500/10 text-green-400 border-green-500/20',
  yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
};

export default function SkillsForm({ data, onChange }) {
  const [inputs, setInputs] = useState({ technical: '', tools: '', soft: '', languages: '' });

  const addSkill = (category) => {
    const val = inputs[category].trim();
    if (!val) return;
    const current = data[category] || [];
    if (!current.includes(val)) {
      onChange({ ...data, [category]: [...current, val] });
    }
    setInputs(prev => ({ ...prev, [category]: '' }));
  };

  const removeSkill = (category, skill) => {
    onChange({ ...data, [category]: (data[category] || []).filter(s => s !== skill) });
  };

  const handleKeyDown = (e, category) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(category);
    }
  };

  return (
    <div className="animate-slide-up">
      <div className="mb-6">
        <h2 className="section-title">Skills</h2>
        <p className="text-slate-400 text-sm mt-1">Type a skill and press Enter or comma to add it</p>
      </div>

      <div className="space-y-6">
        {SKILL_CATEGORIES.map(({ key, label, color, placeholder }) => (
          <div key={key} className="card">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-7 h-7 rounded-lg ${colorMap[color].split(' ')[0]} flex items-center justify-center`}>
                <Code2 className={`w-3.5 h-3.5 ${colorMap[color].split(' ')[1]}`} />
              </div>
              <h3 className="font-semibold text-white text-sm">{label}</h3>
              <span className="ml-auto badge bg-slate-800 text-slate-400">{(data[key] || []).length}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3 min-h-[32px]">
              {(data[key] || []).map((skill) => (
                <span key={skill} className={`badge border ${colorMap[color]} pr-1`}>
                  {skill}
                  <button onClick={() => removeSkill(key, skill)} className="ml-1 hover:opacity-70">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                className="input flex-1 text-sm"
                placeholder={placeholder}
                value={inputs[key]}
                onChange={(e) => setInputs(prev => ({ ...prev, [key]: e.target.value }))}
                onKeyDown={(e) => handleKeyDown(e, key)}
              />
              <button onClick={() => addSkill(key)} className="btn-secondary text-sm px-4 flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
