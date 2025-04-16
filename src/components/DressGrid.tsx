import React from 'react';
import { Dress } from '../models/types';
import DressCard from './DressCard';
import './DressGrid.css';

interface DressGridProps {
  dresses: Dress[];
  likedDresses: Set<number>;
  onLike: (index: number) => void;
}

const DressGrid: React.FC<DressGridProps> = ({ dresses, likedDresses, onLike }) => {
  return (
    <div className="dress-grid">
      <h2 className="section-title">Choose dresses you like</h2>
      <div className="grid-container">
        {dresses.map((dress, index) => (
          <DressCard
            key={index}
            dress={dress}
            index={index}
            isLiked={likedDresses.has(index)}
            onLike={onLike}
          />
        ))}
      </div>
    </div>
  );
};

export default DressGrid; 