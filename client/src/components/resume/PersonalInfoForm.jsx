import { User, Mail, Phone, MapPin, Linkedin, Github, Globe, FileText } from 'lucide-react';

const fields = [
  { key: 'fullName', label: 'Full Name', icon: User, placeholder: 'John Doe', full: true },
  { key: 'email', label: 'Email', icon: Mail, placeholder: 'john@example.com', type: 'email' },
  { key: 'phone', label: 'Phone', icon: Phone, placeholder: '+1 (555) 000-0000' },
  { key: 'location', label: 'Location', icon: MapPin, placeholder: 'New York, NY' },
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'linkedin.com/in/johndoe' },
  { key: 'github', label: 'GitHub', icon: Github, placeholder: 'github.com/johndoe' },
  { key: 'website', label: 'Website', icon: Globe, placeholder: 'johndoe.dev' },
];

export default function PersonalInfoForm({ data, onChange }) {
  const handleChange = (key, value) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="animate-slide-up">
      <div className="mb-6">
        <h2 className="section-title">Personal Information</h2>
        <p className="text-slate-400 text-sm mt-1">Add your contact details and professional links</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map((field) => (
          <div key={field.key} className={field.full ? 'md:col-span-2' : ''}>
            <label className="label">{field.label}</label>
            <div className="relative">
              <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={field.type || 'text'}
                className="input pl-10"
                placeholder={field.placeholder}
                value={data[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
            </div>
          </div>
        ))}

        {/* Professional Summary */}
        <div className="md:col-span-2">
          <label className="label">Professional Summary</label>
          <div className="relative">
            <FileText className="absolute left-3 top-4 w-4 h-4 text-slate-500" />
            <textarea
              className="input pl-10 min-h-[120px] resize-y"
              placeholder="Results-driven software engineer with 5+ years of experience building scalable web applications..."
              value={data.summary || ''}
              onChange={(e) => handleChange('summary', e.target.value)}
            />
          </div>
          <p className="text-slate-500 text-xs mt-1.5">💡 Aim for 3-4 sentences highlighting your key value proposition</p>
        </div>
      </div>
    </div>
  );
}
