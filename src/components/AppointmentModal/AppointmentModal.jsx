import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { appointmentSchema } from '../../utils/validation';
import './AppointmentModal.css';

const AppointmentModal = ({ isOpen, onClose, nannyName, nanny }) => {
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

        <h2 className="appointment-modal-title">Make an appointment with a babysitter</h2>
        <p className="appointment-modal-description">
          Arranging a meeting with a caregiver for your child is the first step to creating a safe and comfortable environment. Fill out the form below so we can match you with the perfect care partner.
        </p>

        {nanny && (
          <div className="appointment-modal-nanny">
            <img
              src={nanny.avatar_url}
              alt={nanny.name}
              className="appointment-modal-nanny-avatar"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/100';
              }}
            />
            <div className="appointment-modal-nanny-info">
              <div className="appointment-modal-nanny-label">Your nanny</div>
              <div className="appointment-modal-nanny-name">{nanny.name}</div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="appointment-modal-form">
          <div className="appointment-modal-row">
            <div className="appointment-modal-field">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                type="text"
                {...register('address')}
                placeholder="Address"
              />
              {errors.address && <span className="error">{errors.address.message}</span>}
            </div>

            <div className="appointment-modal-field">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                placeholder="+380"
                defaultValue="+380"
              />
              {errors.phone && <span className="error">{errors.phone.message}</span>}
            </div>
          </div>

          <div className="appointment-modal-row">
            <div className="appointment-modal-field">
              <label htmlFor="childAge">Child's age</label>
              <input
                id="childAge"
                type="text"
                {...register('childAge')}
                placeholder="Child's age"
              />
              {errors.childAge && <span className="error">{errors.childAge.message}</span>}
            </div>

            <div className="appointment-modal-field">
              <label htmlFor="time">Time</label>
              <div className="appointment-modal-time-wrapper">
                <input
                  id="time"
                  type="time"
                  {...register('time')}
                  placeholder="00:00"
                  defaultValue="00:00"
                />
                <svg className="appointment-modal-time-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              {errors.time && <span className="error">{errors.time.message}</span>}
            </div>
          </div>

          <div className="appointment-modal-row">
            <div className="appointment-modal-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                {...register('email')}
                placeholder="Email"
              />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>

            <div className="appointment-modal-field">
              <label htmlFor="meetingTime">Meeting time</label>
              <select
                id="meetingTime"
                {...register('meetingTime')}
                className="appointment-modal-select"
              >
                <option value="">Select time</option>
                <option value="09:00">09 : 00</option>
                <option value="09:30">09 : 30</option>
                <option value="10:00">10 : 00</option>
                <option value="10:30">10 : 30</option>
                <option value="11:00">11 : 00</option>
                <option value="11:30">11 : 30</option>
                <option value="12:00">12 : 00</option>
              </select>
              {errors.meetingTime && <span className="error">{errors.meetingTime.message}</span>}
            </div>
          </div>

          <div className="appointment-modal-field">
            <label htmlFor="parentName">Father's or mother's name</label>
            <input
              id="parentName"
              type="text"
              {...register('parentName')}
              placeholder="Father's or mother's name"
            />
            {errors.parentName && <span className="error">{errors.parentName.message}</span>}
          </div>

          <div className="appointment-modal-field">
            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              {...register('comment')}
              placeholder="Comment"
              rows="4"
            />
            {errors.comment && <span className="error">{errors.comment.message}</span>}
          </div>

          <div className="appointment-modal-actions">
            <button
              type="submit"
              className="appointment-modal-button appointment-modal-button-submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;

