import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema, signInSchema } from '../../utils/validation';
import { signUp, signIn } from '../../services/auth';
import './AuthModal.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const AuthModal = ({ isOpen, onClose, mode = 'login' }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(isSignUp ? signUpSchema : signInSchema),
  });

  useEffect(() => {
    if (isOpen) {
      setIsSignUp(mode === 'signup');
      setShowPassword(false);
    }
  }, [isOpen, mode]);

  if (!isOpen) return null;

  const handleClose = () => {
    reset();
    setError('');
    setIsSignUp(false);
    setShowPassword(false);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');

      if (isSignUp) {
        await signUp(data.email, data.password, data.name);
      } else {
        await signIn(data.email, data.password);
      }

      handleClose();
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="auth-modal-backdrop"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className={`auth-modal ${isSignUp ? 'auth-modal-signup' : 'auth-modal-login'}`}>
        <button className="auth-modal-close" onClick={handleClose}>
          ×
        </button>
        <div className="auth-modal-header">
          <h2>{isSignUp ? 'Registration' : 'Log In'}</h2>
          <p>
            {isSignUp
              ? 'Thank you for your interest in our platform! Please provide the information requested to create your account.'
              : 'Welcome back! Please enter your credentials to access your account and continue your babysitter search.'}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-modal-form">
          {isSignUp && (
            <div className="auth-modal-input-group">
              <input
                id="name"
                type="text"
                {...register('name')}
                placeholder="Name"
                className="auth-modal-input"
              />
              {errors.name && (
                <span className="auth-modal-error-text">{errors.name.message}</span>
              )}
            </div>
          )}

          <div className="auth-modal-input-group">
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder="Email"
              className="auth-modal-input"
            />
            {errors.email && (
              <span className="auth-modal-error-text">{errors.email.message}</span>
            )}
          </div>

          <div className="auth-modal-input-group password-group">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="Password"
              className="auth-modal-input"
            />
            <button
              type="button"
              className="auth-modal-password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            {errors.password && (
              <span className="auth-modal-error-text">{errors.password.message}</span>
            )}
          </div>

          {error && <div className="auth-modal-error-banner">{error}</div>}

          <button type="submit" className="auth-modal-submit" disabled={loading}>
            {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default AuthModal;

