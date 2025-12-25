import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { checkFavorite, addToFavorites, removeFromFavorites } from '../../services/database';
import AuthModal from '../AuthModal/AuthModal';
import AppointmentModal from '../AppointmentModal/AppointmentModal';
import './NannyCard.css';

const NannyCard = ({ nanny }) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && nanny.id) {
      checkFavorite(user.uid, nanny.id).then(setIsFavorite);
    }
  }, [user, nanny.id]);

  const handleFavoriteClick = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    try {
      setLoading(true);
      if (isFavorite) {
        await removeFromFavorites(user.uid, nanny.id);
        setIsFavorite(false);
      } else {
        await addToFavorites(user.uid, nanny.id);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  const averageRating = nanny.reviews?.length
    ? (nanny.reviews.reduce((sum, review) => sum + review.rating, 0) / nanny.reviews.length).toFixed(1)
    : nanny.rating?.toFixed(1) || '0';

  return (
    <>
      <div className="nanny-card">
        <div className="nanny-card-header">
          <div className="nanny-card-avatar-wrapper">
            <img
              src={nanny.avatar_url}
              alt={nanny.name}
              className="nanny-card-avatar"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/100';
              }}
            />
            <span className="nanny-card-online-dot"></span>
          </div>
          <div className="nanny-card-info">
            <h3 className="nanny-card-name">{nanny.name}</h3>
            <div className="nanny-card-location">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 8C9.1 8 10 7.1 10 6C10 4.9 9.1 4 8 4C6.9 4 6 4.9 6 6C6 7.1 6.9 8 8 8Z"
                  fill="currentColor"
                />
                <path
                  d="M8 0C4.7 0 2 2.7 2 6C2 10.5 8 16 8 16C8 16 14 10.5 14 6C14 2.7 11.3 0 8 0ZM8 8.5C6.6 8.5 5.5 7.4 5.5 6C5.5 4.6 6.6 3.5 8 3.5C9.4 3.5 10.5 4.6 10.5 6C10.5 7.4 9.4 8.5 8 8.5Z"
                  fill="currentColor"
                />
              </svg>
              <span>{nanny.location}</span>
            </div>
            <div className="nanny-card-rating">
              <span className="nanny-card-rating-value">{averageRating}</span>
              <span className="nanny-card-rating-star">⭐</span>
            </div>
            <div className="nanny-card-price">${nanny.price_per_hour}/hour</div>
          </div>
          <button
            className={`nanny-card-favorite ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            disabled={loading}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>

        <div className="nanny-card-details">
          <div className="nanny-card-detail">
            <span className="nanny-card-label">Age:</span>
            <span>{nanny.birthday ? new Date().getFullYear() - new Date(nanny.birthday).getFullYear() : 'N/A'}</span>
          </div>
          <div className="nanny-card-detail">
            <span className="nanny-card-label">Experience:</span>
            <span>{nanny.experience}</span>
          </div>
          <div className="nanny-card-detail">
            <span className="nanny-card-label">Kids Age:</span>
            <span>{nanny.kids_age}</span>
          </div>
        </div>

        {isExpanded && (
          <div className="nanny-card-expanded">
            <div className="nanny-card-section">
              <h4>About</h4>
              <p>{nanny.about}</p>
            </div>

            <div className="nanny-card-section">
              <h4>Education</h4>
              <p>{nanny.education}</p>
            </div>

            <div className="nanny-card-section">
              <h4>Kids Age</h4>
              <p>{nanny.kids_age}</p>
            </div>

            {nanny.characters && nanny.characters.length > 0 && (
              <div className="nanny-card-section">
                <h4>Characteristics</h4>
                <div className="nanny-card-characters">
                  {nanny.characters.map((char, index) => (
                    <span key={index} className="nanny-card-character">
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {nanny.reviews && nanny.reviews.length > 0 && (
              <div className="nanny-card-section">
                <h4>Reviews</h4>
                <div className="nanny-card-reviews">
                  {nanny.reviews.map((review, index) => (
                    <div key={index} className="nanny-card-review">
                      <div className="nanny-card-review-header">
                        <span className="nanny-card-reviewer">{review.reviewer}</span>
                        <span className="nanny-card-review-rating">
                          {'⭐'.repeat(review.rating)}
                        </span>
                      </div>
                      <p className="nanny-card-review-comment">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="nanny-card-actions">
          <button
            className="nanny-card-button"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
          <button
            className="nanny-card-button nanny-card-button-primary"
            onClick={() => setIsAppointmentModalOpen(true)}
          >
            Make an appointment
          </button>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        nannyName={nanny.name}
      />
    </>
  );
};

export default NannyCard;

