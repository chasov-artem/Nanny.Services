import { useState, useEffect } from 'react';
import { FiMapPin } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';
import { useAuth } from '../../context/AuthContext';
import { checkFavorite, addToFavorites, removeFromFavorites } from '../../services/database';
import AuthModal from '../AuthModal/AuthModal';
import AppointmentModal from '../AppointmentModal/AppointmentModal';
import './NannyCard.css';

const NannyCard = ({ nanny, onFavoriteChange }) => {
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
      if (onFavoriteChange) {
        await onFavoriteChange();
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
            <div className="nanny-card-label-text">Nanny</div>
            <div className="nanny-card-name-row">
              <h3 className="nanny-card-name">{nanny.name}</h3>
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

            {nanny.characters && nanny.characters.length > 0 && (
              <div className="nanny-card-pill">
                <span className="nanny-card-pill-label">Characters:</span>
                <span className="nanny-card-pill-value">{nanny.characters.join(', ')}</span>
              </div>
            )}

            <div className="nanny-card-pill">
              <span className="nanny-card-pill-label">Education:</span>
              <span className="nanny-card-pill-value">{nanny.education}</span>
            </div>

            <div className="nanny-card-section">
              <p className="nanny-card-about">{nanny.about}</p>
            </div>

            {isExpanded && (
              <div className="nanny-card-expanded">
                {nanny.reviews && nanny.reviews.length > 0 && (
                  <div className="nanny-card-reviews">
                    {nanny.reviews.map((review, index) => {
                      const reviewerInitial = review.reviewer ? review.reviewer.charAt(0).toUpperCase() : '?';
                      return (
                        <div key={index} className="nanny-card-review">
                          <div className="nanny-card-review-header">
                            <div className="nanny-card-review-avatar">
                              {reviewerInitial}
                            </div>
                            <div className="nanny-card-review-info">
                              <span className="nanny-card-reviewer">{review.reviewer}</span>
                              <div className="nanny-card-review-rating">
                                <AiFillStar className="nanny-card-review-rating-icon" />
                                <span className="nanny-card-review-rating-value">{review.rating.toFixed(1)}</span>
                              </div>
                            </div>
                          </div>
                          <p className="nanny-card-review-comment">{review.comment}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            <div className="nanny-card-actions">
              {!isExpanded && (
                <button
                  className="nanny-card-button"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  Read more
                </button>
              )}
              {isExpanded && (
                <button
                  className="nanny-card-button nanny-card-button-primary"
                  onClick={() => setIsAppointmentModalOpen(true)}
                >
                  Make an appointment
                </button>
              )}
            </div>
          </div>
          <div className="nanny-card-meta">
            <div className="nanny-card-location">
              <FiMapPin />
              <span>{nanny.location}</span>
            </div>
            <div className="nanny-card-rating">
              <AiFillStar className="nanny-card-rating-icon" />
              <span>Rating: </span>
              <span className="nanny-card-rating-value">{averageRating}</span>
            </div>
            <div className="nanny-card-price">
              Price / 1 hour: <span className="nanny-card-price-value">{nanny.price_per_hour}$</span>
            </div>
          </div>
          <button
            className={`nanny-card-favorite ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            disabled={loading}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isFavorite ? '#F03F3B' : 'none'}
              stroke={isFavorite ? '#F03F3B' : '#11101C'}
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
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
        nanny={nanny}
      />
    </>
  );
};

export default NannyCard;

