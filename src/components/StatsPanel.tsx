import React, { useState } from 'react';
import { UserPreferences } from '../models/types';
import './StatsPanel.css';

interface StatsPanelProps {
  userPreferences: UserPreferences;
}

// Sort type
type SortType = 'none' | 'probability' | 'likes' | 'shows';

const StatsPanel: React.FC<StatsPanelProps> = ({ userPreferences }) => {
  // State for sorting
  const [sortType, setSortType] = useState<SortType>('probability');
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value as SortType);
  };

  const renderPreferencesSection = (
    title: string, 
    preferences: Record<string, { shown: number; liked: number }>
  ) => {
    // Transform preferences object into array for sorting
    const preferencesArray = Object.entries(preferences).map(([value, counters]) => {
      const probability = (counters.liked + 1) / (counters.shown + 2);
      return { value, counters, probability };
    });
    
    // Sort by selected type
    if (sortType === 'probability') {
      preferencesArray.sort((a, b) => b.probability - a.probability);
    } else if (sortType === 'likes') {
      preferencesArray.sort((a, b) => b.counters.liked - a.counters.liked);
    } else if (sortType === 'shows') {
      preferencesArray.sort((a, b) => b.counters.shown - a.counters.shown);
    }
    
    return (
      <div className="stats-section">
        <h3>{title}</h3>
        <div className="stats-list">
          {preferencesArray.map(({ value, counters, probability }) => (
            <div key={value} className="stat-item">
              <div className="stat-label">{value}</div>
              <div className="stat-bars">
                <div className="stat-bar-container">
                  <div className="stat-label-small">Shown:</div>
                  <div className="stat-value">{counters.shown}</div>
                </div>
                <div className="stat-bar-container">
                  <div className="stat-label-small">Liked:</div>
                  <div className="stat-value">{counters.liked}</div>
                </div>
                <div className="stat-bar-container">
                  <div className="stat-label-small">Probability:</div>
                  <div className="stat-probability">{(probability * 100).toFixed(1)}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="stats-panel">
      <h2 className="stats-title">Preference Statistics</h2>
      
      <div className="sort-controls">
        <label htmlFor="sort-select">Sort by: </label>
        <select 
          id="sort-select" 
          value={sortType} 
          onChange={handleSortChange}
          className="sort-select"
        >
          <option value="probability">Probability</option>
          <option value="likes">Number of likes</option>
          <option value="shows">Number of views</option>
          <option value="none">Alphabetically</option>
        </select>
      </div>
      
      {renderPreferencesSection('Fit', userPreferences.fit)}
      {renderPreferencesSection('Skirt', userPreferences.skirt)}
      {renderPreferencesSection('Neckline', userPreferences.neckline)}
    </div>
  );
};

export default StatsPanel; 