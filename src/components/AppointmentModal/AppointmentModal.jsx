import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { appointmentSchema } from '../../utils/validation';
import './AppointmentModal.css';

const AppointmentModal = ({ isOpen, onClose, nannyName }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(appointmentSchema),
  });

  if (!isOpen) return null;

  const handleClose = () => {
    reset();
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
      console.log('Appointment request:', {
        ...data,
        nannyName,
        date: new Date().toISOString(),
      });
      alert('Appointment request submitted successfully!');
      handleClose();
    } catch (error) {
      console.error('Error submitting appointment:', error);
      alert('Error submitting appointment. Please try again.');
    }
  };

  return (
    <div
      className="appointment-modal-backdrop"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="appointment-modal">
        <button className="appointment-modal-close" onClick={handleClose}>
          ×
        </button>

        <h2 className="appointment-modal-title">Make an Appointment</h2>
        {nannyName && (
          <p className="appointment-modal-subtitle">with {nannyName}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="appointment-modal-form">
          <div className="appointment-modal-field">
            <label htmlFor="name">Your Name *</label>
            <input
              id="name"
              type="text"
              {...register('name')}
              placeholder="Enter your name"
            />
            {errors.name && <span className="error">{errors.name.message}</span>}
          </div>

          <div className="appointment-modal-field">
            <label htmlFor="phone">Phone Number *</label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder="+380 XX XXX XXXX"
            />
            {errors.phone && <span className="error">{errors.phone.message}</span>}
          </div>

          <div className="appointment-modal-field">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>

          <div className="appointment-modal-row">
            <div className="appointment-modal-field">
              <label htmlFor="date">Date *</label>
              <input
                id="date"
                type="date"
                {...register('date')}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.date && <span className="error">{errors.date.message}</span>}
            </div>

            <div className="appointment-modal-field">
              <label htmlFor="time">Time *</label>
              <input
                id="time"
                type="time"
                {...register('time')}
              />
              {errors.time && <span className="error">{errors.time.message}</span>}
            </div>
          </div>

          <div className="appointment-modal-field">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              {...register('message')}
              placeholder="Tell us about your needs..."
              rows="4"
            />
            {errors.message && <span className="error">{errors.message.message}</span>}
          </div>

          <div className="appointment-modal-actions">
            <button
              type="button"
              onClick={handleClose}
              className="appointment-modal-button appointment-modal-button-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="appointment-modal-button appointment-modal-button-submit"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;

