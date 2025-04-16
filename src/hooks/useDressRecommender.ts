import { useState, useCallback, useEffect } from 'react';
import { Dress, ScoredDress, AppState } from '../models/types';
import {
  generateDressDatabase,
  initializeUserPreferences,
  updateUserPreferences,
  selectExplorationDresses,
  selectExploitationDresses,
  generateRecommendations,
} from '../utils/dressUtils';

const DATABASE_SIZE = 200;
const BATCH_SIZE = 8;
const EXPLORATION_COUNT = 4; 
const EXPLOITATION_COUNT = 4; 
const RECOMMENDATION_COUNT = 3; 

export const useDressRecommender = () => {
  const [state, setState] = useState<AppState>({
    allDresses: [],
    shownDressIds: new Set<number>(),
    currentBatch: [],
    likedDresses: new Set<number>(),
    recommendations: [],
    userPreferences: initializeUserPreferences(),
  });

  useEffect(() => {
    const dressDatabase = generateDressDatabase(DATABASE_SIZE);
    
    const initialBatch = dressDatabase.slice(0, BATCH_SIZE);
    const initialShownIds = new Set(Array.from({ length: BATCH_SIZE }, (_, i) => i));
    
    setState(prevState => ({
      ...prevState,
      allDresses: dressDatabase,
      currentBatch: initialBatch,
      shownDressIds: initialShownIds,
    }));
  }, []);

  const toggleLike = useCallback((index: number) => {
    setState(prevState => {
      const newLikedDresses = new Set(prevState.likedDresses);
      
      if (newLikedDresses.has(index)) {
        newLikedDresses.delete(index);
      } else {
        newLikedDresses.add(index);
      }
      
      return {
        ...prevState,
        likedDresses: newLikedDresses,
      };
    });
  }, []);

  const goToNextBatch = useCallback(() => {
    setState(prevState => {
      const updatedPreferences = updateUserPreferences(
        prevState.userPreferences,
        prevState.currentBatch,
        prevState.likedDresses
      );
      
      const newRecommendations = generateRecommendations(
        prevState.allDresses,
        prevState.shownDressIds,
        updatedPreferences,
        RECOMMENDATION_COUNT
      );
      
      let explorationResult, exploitationResult;
      
      if (prevState.likedDresses.size === 0) {
        explorationResult = selectExplorationDresses(
          prevState.allDresses,
          prevState.shownDressIds,
          BATCH_SIZE
        );
        exploitationResult = { dresses: [], indices: [] };
      } else {
        explorationResult = selectExplorationDresses(
          prevState.allDresses,
          prevState.shownDressIds,
          EXPLORATION_COUNT
        );
        
        exploitationResult = selectExploitationDresses(
          prevState.allDresses,
          prevState.shownDressIds,
          updatedPreferences,
          EXPLOITATION_COUNT
        );
      }
      
      const newBatch = [
        ...exploitationResult.dresses,
        ...explorationResult.dresses,
      ].slice(0, BATCH_SIZE);
      
      const newShownDressIds = new Set(prevState.shownDressIds);
      [...exploitationResult.indices, ...explorationResult.indices].forEach(
        index => newShownDressIds.add(index)
      );
      
      const newLikedDresses = new Set<number>();
      
      return {
        ...prevState,
        userPreferences: updatedPreferences,
        currentBatch: newBatch,
        shownDressIds: newShownDressIds,
        likedDresses: newLikedDresses,
        recommendations: newRecommendations,
      };
    });
  }, []);

  return {
    currentBatch: state.currentBatch,
    likedDresses: state.likedDresses,
    recommendations: state.recommendations,
    userPreferences: state.userPreferences,
    toggleLike,
    goToNextBatch,
  };
}; 