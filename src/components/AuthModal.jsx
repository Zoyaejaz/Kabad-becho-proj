import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, MapPin, Eye, EyeOff, Loader2, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DEMO_CREDENTIALS = {
  email: 'demo@example.com',
  password: 'password123'
};

// InputField moved outside the component to prevent re-renders losing focus
const InputField = ({ icon: Icon, type, placeholder, label, value, onChange, error, isPassword, showPass, togglePass }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon size={18} className="text-[#66BB6A]" />
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-[#66BB6A] focus:border-[#66BB6A] text-sm transition-colors ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
        placeholder={placeholder}
      />
      {isPassword && (
        <button type="button" onClick={togglePass} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#66BB6A]">
          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

const AuthModal = ({ isOpen, onClose, redirectPath }) => {
  const [view, setView] = useState('login'); // 'login', 'signup', 'forgot'
  const navigate = useNavigate();

  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) newErrors.email = 'Email using demo credentials required';
    if (!password) newErrors.password = 'Password required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
          // Save token to localStorage to mark user as authenticated
          localStorage.setItem('token', 'demo-auth-token-12345');
          onClose(); // Close modal first
          navigate(redirectPath || '/dashboard'); 
        } else {
          setErrors({
            email: 'Invalid credentials',
            password: 'Try demo: demo@example.com / password123'
          });
        }
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl transition-all animate-fade-in-up">

        {/* Header Gradient */}
        <div className="bg-linear-to-br from-[#2E7D32] to-[#66BB6A] p-6 text-center text-white relative">
          <button onClick={onClose} className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full">
            <X size={20} />
          </button>
          <h2 className="text-2xl font-bold mb-1">
            {view === 'login' && 'Welcome Back'}
            {view === 'signup' && 'Create Account'}
            {view === 'forgot' && 'Reset Password'}
          </h2>
          <p className="text-white/90 text-sm">
            {view === 'login' && 'Please login to continue'}
            {view === 'signup' && 'Join the green revolution'}
            {view === 'forgot' && 'We\'ll help you reset it'}
          </p>
        </div>

        {/* Form Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">

          {/* Demo Creds Hint (Only for login) */}
          {view === 'login' && (
            <div className="mb-6 p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
              <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />
              <div className="text-xs text-blue-800">
                <p className="font-semibold mb-1">Demo Credentials:</p>
                <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1">
                  <span className="opacity-70">Email:</span> <code className="font-mono">{DEMO_CREDENTIALS.email}</code>
                  <span className="opacity-70">Pass:</span> <code className="font-mono">{DEMO_CREDENTIALS.password}</code>
                </div>
              </div>
            </div>
          )}

          {view === 'login' && (
            <form onSubmit={handleLogin}>
              <InputField
                icon={Mail}
                type="email"
                label="Email Address"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />
              <InputField
                icon={Lock}
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                isPassword
                showPass={showPassword}
                togglePass={() => setShowPassword(!showPassword)}
              />

              <div className="flex justify-end mb-6">
                <button
                  type="button"
                  onClick={() => setView('forgot')}
                  className="text-xs font-semibold text-[#66BB6A] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#66BB6A] hover:bg-[#43A047] text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-green-200 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Login'}
              </button>
            </form>
          )}

          {view === 'signup' && (
            <form onSubmit={(e) => e.preventDefault()}>
              <InputField icon={User} type="text" label="Full Name" placeholder="John Doe" />
              <InputField icon={Mail} type="email" label="Email Address" placeholder="john@example.com" />
              <InputField icon={Phone} type="tel" label="Phone Number" placeholder="+91 0000000000" />
              <InputField icon={MapPin} type="text" label="Address" placeholder="Your City, Area" />
              <InputField icon={Lock} type="password" label="Password" placeholder="••••••••" />

              <button className="w-full py-3 bg-[#66BB6A] hover:bg-[#43A047] text-white font-bold rounded-xl transition-all shadow-lg mt-4">
                Sign Up
              </button>
            </form>
          )}

          {view === 'forgot' && (
            <form onSubmit={(e) => e.preventDefault()}>
              <InputField icon={Mail} type="email" label="Email Address" placeholder="registered-email@example.com" />
              <button className="w-full py-3 bg-[#66BB6A] hover:bg-[#43A047] text-white font-bold rounded-xl transition-all shadow-lg mt-4">
                Send Reset Link
              </button>
            </form>
          )}

          {/* Footer Navigation */}
          <div className="text-center text-sm text-gray-500 mt-6 pt-4 border-t border-gray-100">
            {view === 'login' ? (
              <p>Don't have an account? <button onClick={() => setView('signup')} className="text-[#66BB6A] font-bold hover:underline">Sign Up</button></p>
            ) : (
              <p>Already have an account? <button onClick={() => setView('login')} className="text-[#66BB6A] font-bold hover:underline">Login</button></p>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AuthModal;