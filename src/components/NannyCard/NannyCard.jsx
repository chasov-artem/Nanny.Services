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
          <img
            src={nanny.avatar_url}
            alt={nanny.name}
            className="nanny-card-avatar"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/100';
            }}
          />
          <div className="nanny-card-info">
            <h3 className="nanny-card-name">{nanny.name}</h3>
            <div className="nanny-card-rating">
              <span className="nanny-card-rating-value">{averageRating}</span>
              <span className="nanny-card-rating-star">⭐</span>
            </div>
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
            <span className="nanny-card-label">Location:</span>
            <span>{nanny.location}</span>
          </div>
          <div className="nanny-card-detail">
            <span className="nanny-card-label">Price:</span>
            <span>${nanny.price_per_hour}/hour</span>
          </div>
          <div className="nanny-card-detail">
            <span className="nanny-card-label">Experience:</span>
            <span>{nanny.experience}</span>
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

