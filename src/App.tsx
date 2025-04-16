import React, { useState } from 'react';
import DressGrid from './components/DressGrid';
import RecommendationList from './components/RecommendationList';
import StatsPanel from './components/StatsPanel';
import { useDressRecommender } from './hooks/useDressRecommender';
import './App.css';

function App() {
  const [showStats, setShowStats] = useState(true);
  
  const {
    currentBatch,
    likedDresses,
    recommendations,
    userPreferences,
    toggleLike,
    goToNextBatch,
  } = useDressRecommender();

  const toggleStatsPanel = () => {
    setShowStats(prev => !prev);
  };

  return (
    <div className={`app ${showStats ? 'with-stats' : ''}`}>
      <div className="app-container">
        <header className="app-header">
          <h1>Dress Recommender - Soft Feminine Style</h1>
          <p className="app-description">
            An application recommending dresses in Soft Feminine style, tailored to your preferences.
            Mark the hearts on dresses you like, and we'll find similar ones!
          </p>
        </header>
        
        <main className="app-content">
          <DressGrid
            dresses={currentBatch}
            likedDresses={likedDresses}
            onLike={toggleLike}
          />
          
          <div className="next-button-container">
            <button className="next-button" onClick={goToNextBatch}>
              Next Dresses
            </button>
          </div>
          
          <RecommendationList recommendations={recommendations} />
        </main>
        
        <footer className="app-footer">
          <p>&copy; 2025 Dress Recommender - Soft Feminine Style</p>
        </footer>
      </div>
      
      <div className={`stats-container ${showStats ? 'show' : 'hide'}`}>
        <StatsPanel userPreferences={userPreferences} />
      </div>
      
      <button 
        className="toggle-stats-button"
        onClick={toggleStatsPanel}
        aria-label={showStats ? "Hide statistics" : "Show statistics"}
      >
        {showStats ? '›' : '‹'}
      </button>
    </div>
  );
}

export default App;
