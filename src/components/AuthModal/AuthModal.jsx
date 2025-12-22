import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema, signInSchema } from '../../utils/validation';
import { signUp, signIn } from '../../services/auth';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(isSignUp ? signUpSchema : signInSchema),
  });

  if (!isOpen) return null;

  const handleClose = () => {
    reset();
    setError('');
    setIsSignUp(false);
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
      <div className="auth-modal">
        <button className="auth-modal-close" onClick={handleClose}>
          ×
        </button>

        <div className="auth-modal-tabs">
          <button
            className={`auth-modal-tab ${!isSignUp ? 'active' : ''}`}
            onClick={() => {
              setIsSignUp(false);
              reset();
              setError('');
            }}
          >
            Sign In
          </button>
          <button
            className={`auth-modal-tab ${isSignUp ? 'active' : ''}`}
            onClick={() => {
              setIsSignUp(true);
              reset();
              setError('');
            }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-modal-form">
          {isSignUp && (
            <div className="auth-modal-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                {...register('name')}
                placeholder="Enter your name"
              />
              {errors.name && <span className="error">{errors.name.message}</span>}
            </div>
          )}

          <div className="auth-modal-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>

          <div className="auth-modal-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register('password')}
              placeholder="Enter your password"
            />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </div>

          {error && <div className="auth-modal-error">{error}</div>}

          <button type="submit" className="auth-modal-submit" disabled={loading}>
            {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;

