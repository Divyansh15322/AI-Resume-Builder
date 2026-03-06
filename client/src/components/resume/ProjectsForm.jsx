import { Plus, Trash2, FolderGit2, ChevronDown, ChevronUp, ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';

const emptyProject = { name: '', description: '', techStack: [], liveUrl: '', githubUrl: '', bullets: [''] };

export default function ProjectsForm({ data, onChange }) {
  const [expanded, setExpanded] = useState(0);
  const [techInput, setTechInput] = useState({});

  const addProject = () => { onChange([...data, { ...emptyProject, techStack: [] }]); setExpanded(data.length); };
  const removeProject = (i) => onChange(data.filter((_, idx) => idx !== i));
  const updateProject = (i, field, value) => {
    const updated = [...data];
    updated[i] = { ...updated[i], [field]: value };
    onChange(updated);
  };
  const addTech = (i) => {
    const val = (techInput[i] || '').trim();
    if (!val) return;
    const updated = [...data];
    if (!updated[i].techStack.includes(val)) updated[i].techStack = [...updated[i].techStack, val];
    onChange(updated);
    setTechInput(prev => ({ ...prev, [i]: '' }));
  };
  const removeTech = (projIdx, tech) => {
    const updated = [...data];
    updated[projIdx].techStack = updated[projIdx].techStack.filter(t => t !== tech);
    onChange(updated);
  };
  const updateBullet = (pi, bi, val) => {
    const updated = [...data];
    updated[pi].bullets[bi] = val;
    onChange(updated);
  };
  const addBullet = (i) => {
    const updated = [...data];
    updated[i].bullets = [...(updated[i].bullets || []), ''];
    onChange(updated);
  };
  const removeBullet = (pi, bi) => {
    const updated = [...data];
    updated[pi].bullets = updated[pi].bullets.filter((_, i) => i !== bi);
    onChange(updated);
  };

  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="section-title">Projects</h2>
          <p className="text-slate-400 text-sm mt-1">Showcase your best work</p>
        </div>
        <button onClick={addProject} className="btn-primary text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {data.length === 0 && (
        <div className="card border-dashed border-slate-700 text-center py-12">
          <FolderGit2 className="w-10 h-10 text-slate-700 mx-auto mb-3" />
          <p className="text-slate-500">No projects added yet</p>
          <button onClick={addProject} className="btn-primary text-sm mt-4 inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>
      )}

      <div className="space-y-4">
        {data.map((proj, i) => (
          <div key={i} className="card">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpanded(expanded === i ? -1 : i)}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <FolderGit2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{proj.name || 'New Project'}</p>
                  <p className="text-slate-500 text-xs">{proj.techStack?.join(', ') || 'No tech stack'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); removeProject(i); }} className="text-slate-600 hover:text-red-400 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
                {expanded === i ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </div>
            </div>

            {expanded === i && (
              <div className="mt-5 space-y-4 border-t border-slate-800 pt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="label">Project Name</label>
                    <input className="input" placeholder="E-Commerce Platform" value={proj.name} onChange={e => updateProject(i, 'name', e.target.value)} />
                  </div>
                  <div>
                    <label className="label"><ExternalLink className="inline w-3.5 h-3.5 mr-1" />Live URL</label>
                    <input className="input" placeholder="https://myproject.com" value={proj.liveUrl} onChange={e => updateProject(i, 'liveUrl', e.target.value)} />
                  </div>
                  <div>
                    <label className="label"><Github className="inline w-3.5 h-3.5 mr-1" />GitHub URL</label>
                    <input className="input" placeholder="https://github.com/user/project" value={proj.githubUrl} onChange={e => updateProject(i, 'githubUrl', e.target.value)} />
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <label className="label">Tech Stack</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {(proj.techStack || []).map(tech => (
                      <span key={tech} className="badge bg-green-500/10 text-green-400 border border-green-500/20">
                        {tech} <button onClick={() => removeTech(i, tech)} className="ml-1"><Plus className="w-3 h-3 rotate-45" /></button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input className="input flex-1 text-sm" placeholder="React, Node.js..." value={techInput[i] || ''}
                      onChange={e => setTechInput(prev => ({ ...prev, [i]: e.target.value }))}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTech(i); }}} />
                    <button onClick={() => addTech(i)} className="btn-secondary text-sm px-4">Add</button>
                  </div>
                </div>

                {/* Bullets */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="label mb-0">Description Bullets</label>
                    <button onClick={() => addBullet(i)} className="text-brand-400 text-xs font-medium flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Add
                    </button>
                  </div>
                  {(proj.bullets || ['']).map((b, bi) => (
                    <div key={bi} className="flex gap-2 mb-2">
                      <span className="text-slate-500 mt-3 text-sm">•</span>
                      <input className="input flex-1 text-sm" placeholder="Built a scalable REST API serving 10k+ daily users..."
                        value={b} onChange={e => updateBullet(i, bi, e.target.value)} />
                      {(proj.bullets?.length > 1) && (
                        <button onClick={() => removeBullet(i, bi)} className="text-slate-600 hover:text-red-400 mt-3">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
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
