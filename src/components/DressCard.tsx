import React from 'react';
import { Dress } from '../models/types';
import './DressCard.css';

interface DressCardProps {
  dress: Dress;
  index: number;
  isLiked: boolean;
  showScore?: boolean;
  score?: number;
  onLike?: (index: number) => void;
}

const DressCard: React.FC<DressCardProps> = ({
  dress,
  index,
  isLiked,
  showScore = false,
  score,
  onLike
}) => {
  const { fit, skirt, neckline } = dress.dress;
  
  const handleLikeClick = () => {
    if (onLike) {
      onLike(index);
    }
  };
  
  const generateBackgroundColor = (fit: string, skirt: string, neckline: string) => {
    const hash = (fit + skirt + neckline).split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    const h = Math.abs(hash) % 360;
    return `hsl(${h}, 70%, 85%)`;
  };
  
  return (
    <div 
      className={`dress-card ${isLiked ? 'liked' : ''}`}
      style={{ backgroundColor: generateBackgroundColor(fit, skirt, neckline) }}
    >
      <div className="dress-info">
        <div className="dress-param">Fit: {fit}</div>
        <div className="dress-param">Skirt: {skirt}</div>
        <div className="dress-param">Neckline: {neckline}</div>
        
        {showScore && score !== undefined && (
          <div className="dress-score">Score: {(score * 100).toFixed(1)}%</div>
        )}
      </div>
      
      {onLike && (
        <button 
          className={`like-button ${isLiked ? 'liked' : ''}`}
          onClick={handleLikeClick}
          aria-label={isLiked ? "Dislike dress" : "Like dress"}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
      )}
    </div>
  );
};

export default DressCard; 