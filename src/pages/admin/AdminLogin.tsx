import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, Eye, EyeOff, Loader2, AlertCircle, ShieldAlert, Sparkles, KeyRound } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn, user, isAdmin, isConfigured, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated as admin
  useEffect(() => {
    if (!loading && user && isAdmin) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    }
  }, [user, isAdmin, loading, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please enter both your admin email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await signIn(email.trim(), password);
      if (result.error) {
        setError(result.error);
      } else {
        navigate('/admin/dashboard', { replace: true });
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-navy-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Decorative Rings & Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-brand-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-brand-navy-800/40 rounded-full blur-2xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-block relative mb-4">
            <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-brand-gold-600 via-brand-gold-400 to-brand-gold-200 shadow-gold-md mx-auto">
              <img
                src="/logo.png"
                alt="Sri Guru Tours & Travels Logo"
                className="w-full h-full object-cover rounded-full bg-brand-navy-950"
              />
            </div>
            <span className="absolute bottom-0 right-0 p-1.5 rounded-full bg-brand-navy-900 border border-brand-gold-500/40 text-brand-gold-400">
              <Lock className="w-3.5 h-3.5" />
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider">
            Admin <span className="text-gold-metallic">Portal</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-medium">
            Sri Guru Tours and Travels Management System
          </p>
        </div>

        {/* Form Container */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-brand-gold-500/30 bg-brand-navy-900/90 relative">
          
          {/* Top Gold Accent Strip */}
          <div className="absolute top-0 left-1/3 right-1/3 h-1 bg-gradient-to-r from-transparent via-brand-gold-400 to-transparent" />

          {/* Configuration Alert if Supabase is not configured */}
          {!isConfigured && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-amber-200 text-xs leading-relaxed flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 font-semibold block mb-0.5">Supabase Setup Required</strong>
                Please configure <code className="bg-brand-navy-950 px-1.5 py-0.5 rounded text-amber-300">VITE_SUPABASE_URL</code> and <code className="bg-brand-navy-950 px-1.5 py-0.5 rounded text-amber-300">VITE_SUPABASE_ANON_KEY</code> in your <code className="bg-brand-navy-950 px-1.5 py-0.5 rounded text-amber-300">.env</code> file to enable live authentication.
              </div>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-start gap-3 animate-fadeIn">
              <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                Admin Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4 text-brand-gold-400/80" />
                </div>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="admin@srigurutoursandtravels.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-navy-950/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-gold-400 focus:ring-1 focus:ring-brand-gold-400 transition-colors disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <KeyRound className="w-4 h-4 text-brand-gold-400/80" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-brand-navy-950/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-gold-400 focus:ring-1 focus:ring-brand-gold-400 transition-colors disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-brand-gold-300 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-brand-navy-950 bg-gradient-to-r from-brand-gold-400 via-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-300 hover:to-brand-gold-500 shadow-gold-sm hover:shadow-gold-md transition-all duration-300 flex items-center justify-center gap-2 text-sm tracking-wider uppercase disabled:opacity-60 disabled:cursor-not-allowed mt-2 active:scale-95"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-brand-navy-950" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Sign In as Admin</span>
                </>
              )}
            </button>
          </form>

          {/* Security Footnote */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <Sparkles className="w-3 h-3 text-brand-gold-400/70" />
            <span>Authorized Administrator Access Only • 256-Bit SSL Secured</span>
          </div>

        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-slate-400 hover:text-brand-gold-300 transition-colors font-medium"
          >
            ← Return to Sri Guru Tours and Travels Website
          </a>
        </div>

      </div>
    </div>
  );
};
