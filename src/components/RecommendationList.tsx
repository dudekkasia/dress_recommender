import React from 'react';
import { ScoredDress } from '../models/types';
import DressCard from './DressCard';
import './RecommendationList.css';

interface RecommendationListProps {
  recommendations: ScoredDress[];
}

const RecommendationList: React.FC<RecommendationListProps> = ({ recommendations }) => {
  if (recommendations.length === 0) {
    return null;
  }
  
  return (
    <div className="recommendation-list">
      <h2 className="section-title">Recommended for You</h2>
      <div className="recommendations-container">
        {recommendations.map((scoredDress, index) => (
          <DressCard
            key={index}
            dress={scoredDress}
            index={index}
            isLiked={false}
            showScore={true}
            score={scoredDress.score}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationList; 