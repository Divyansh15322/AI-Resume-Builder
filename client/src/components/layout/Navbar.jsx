import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FileText, LayoutDashboard, LogOut, Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = user
    ? [{ to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }]
    : [
        { to: '/login', label: 'Login' },
        { to: '/register', label: 'Get Started', primary: true },
      ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:shadow-brand-500/50 transition-all">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold text-white">
              Resume<span className="text-brand-400">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-3">
            {user && (
              <div className="flex items-center gap-2 mr-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-slate-300 text-sm font-medium">{user.name}</span>
              </div>
            )}
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={link.primary ? 'btn-primary flex items-center gap-2 text-sm' : 'btn-ghost text-sm flex items-center gap-2'}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
            {user && (
              <button onClick={handleLogout} className="btn-ghost text-sm flex items-center gap-2 text-slate-400">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
              className={link.primary ? 'btn-primary text-center text-sm' : 'btn-ghost text-sm'}>
              {link.label}
            </Link>
          ))}
          {user && (
            <button onClick={handleLogout} className="btn-ghost text-sm text-left text-slate-400">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
