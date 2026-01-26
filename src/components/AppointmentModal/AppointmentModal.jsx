import { useForm } from 'react-hook-form';
import { useRef, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { appointmentSchema } from '../../utils/validation';
import ClockIcon from '../Icons/ClockIcon';
import './AppointmentModal.css';

const AppointmentModal = ({ isOpen, onClose, nannyName, nanny }) => {
  const timeInputRef = useRef(null);
  const [isMeetingTimeOpen, setIsMeetingTimeOpen] = useState(false);
  const [selectedMeetingTime, setSelectedMeetingTime] = useState('');
  const meetingTimeRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(appointmentSchema),
  });

  const meetingTimes = [];
  for (let hour = 9; hour <= 18; hour++) {
    meetingTimes.push(`${hour.toString().padStart(2, '0')}:00`);
    if (hour < 18) {
      meetingTimes.push(`${hour.toString().padStart(2, '0')}:30`);
    }
  }

  const handleMeetingTimeSelect = (time) => {
    setSelectedMeetingTime(time);
    setValue('time', time);
    setIsMeetingTimeOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (meetingTimeRef.current && !meetingTimeRef.current.contains(event.target)) {
        setIsMeetingTimeOpen(false);
      }
    };

    if (isMeetingTimeOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMeetingTimeOpen]);

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
              <input
                id="address"
                type="text"
                className="appointment-modal-input-address"
                {...register('address')}
                placeholder="Address"
              />
              {errors.address && <span className="error">{errors.address.message}</span>}
            </div>

            <div className="appointment-modal-field">
              <input
                id="phone"
                type="tel"
                className="appointment-modal-input-phone"
                {...register('phone')}
                placeholder="+380"
                defaultValue="+380"
              />
              {errors.phone && <span className="error">{errors.phone.message}</span>}
            </div>
          </div>

          <div className="appointment-modal-row">
            <div className="appointment-modal-field">
              <input
                id="childAge"
                type="text"
                className="appointment-modal-input-child-age"
                {...register('childAge')}
                placeholder="Child's age"
              />
              {errors.childAge && <span className="error">{errors.childAge.message}</span>}
            </div>

            <div className="appointment-modal-field">
              <div className="appointment-modal-time-wrapper" ref={meetingTimeRef}>
                <input
                  id="time"
                  type="text"
                  ref={timeInputRef}
                  className="appointment-modal-input-time"
                  {...register('time')}
                  placeholder="00:00"
                  value={selectedMeetingTime || ''}
                  readOnly
                />
                <div 
                  className="appointment-modal-time-icon-label"
                  onClick={() => setIsMeetingTimeOpen(!isMeetingTimeOpen)}
                >
                  <ClockIcon className="appointment-modal-time-icon" />
                </div>
                {isMeetingTimeOpen && (
                  <div className="appointment-modal-meeting-time-dropdown">
                    <div className="appointment-modal-meeting-time-title">Meeting time</div>
                    <div className="appointment-modal-meeting-time-list">
                      {meetingTimes.map((time) => (
                        <div
                          key={time}
                          className={`appointment-modal-meeting-time-option ${
                            selectedMeetingTime === time ? 'selected' : ''
                          }`}
                          onClick={() => handleMeetingTimeSelect(time)}
                        >
                          {time.replace(':', ' : ')}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {errors.time && <span className="error">{errors.time.message}</span>}
            </div>
          </div>

          <div className="appointment-modal-row">
            <div className="appointment-modal-field">
              <input
                id="email"
                type="email"
                className="appointment-modal-input-email"
                {...register('email')}
                placeholder="Email"
              />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>
          </div>

          <div className="appointment-modal-field">
            <input
              id="parentName"
              type="text"
              className="appointment-modal-input-parent-name"
              {...register('parentName')}
              placeholder="Father's or mother's name"
            />
            {errors.parentName && <span className="error">{errors.parentName.message}</span>}
          </div>

          <div className="appointment-modal-field">
            <textarea
              id="comment"
              className="appointment-modal-textarea-comment"
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

