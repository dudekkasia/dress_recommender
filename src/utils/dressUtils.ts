import { Dress, Fit, Neckline, Skirt, ScoredDress, UserPreferences, ValueCounters } from '../models/types';

const FITS: Fit[] = ['Loose', 'Regular', 'Slim', 'Tight'];
const SKIRTS: Skirt[] = [
  'A-Line', 'Asymmetrical', 'Cowl', 'Fishtail', 'Flared', 'High-low', 'Mermaid',
  'Petal', 'Peplum', 'Semi-circular', 'Straight', 'Tulip', 'Wrapped', 'Yoke',
  'Bubble', 'Pencil', 'Sarong'
];
const NECKLINES: Neckline[] = [
  'Asymmetrical', 'Bertha', 'Cowl', 'Halter', 'Grecian', 'Mandarin',
  'Round spaghetti', 'Sabrina with sleeve', 'Sabrina without sleeve',
  'V-spaghetti', 'V-halter'
];

export const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const generateRandomDress = (): Dress => {
  return {
    dress: {
      fit: getRandomElement(FITS),
      skirt: getRandomElement(SKIRTS),
      neckline: getRandomElement(NECKLINES)
    }
  };
};

export const generateDressDatabase = (count: number): Dress[] => {
  return Array.from({ length: count }, () => generateRandomDress());
};

export const initializeUserPreferences = (): UserPreferences => {
  const initValueCounters = (): ValueCounters => ({ shown: 0, liked: 0 });
  
  return {
    fit: FITS.reduce((acc, fit) => {
      acc[fit] = initValueCounters();
      return acc;
    }, {} as Record<Fit, ValueCounters>),
    
    skirt: SKIRTS.reduce((acc, skirt) => {
      acc[skirt] = initValueCounters();
      return acc;
    }, {} as Record<Skirt, ValueCounters>),
    
    neckline: NECKLINES.reduce((acc, neckline) => {
      acc[neckline] = initValueCounters();
      return acc;
    }, {} as Record<Neckline, ValueCounters>)
  };
};

export const updateUserPreferences = (
  userPreferences: UserPreferences,
  shownDresses: Dress[],
  likedDressIndices: Set<number>
): UserPreferences => {
  const updatedPreferences: UserPreferences = JSON.parse(JSON.stringify(userPreferences));
  
  shownDresses.forEach((dress, index) => {
    const { fit, skirt, neckline } = dress.dress;
    
    updatedPreferences.fit[fit].shown += 1;
    updatedPreferences.skirt[skirt].shown += 1;
    updatedPreferences.neckline[neckline].shown += 1;
    
    if (likedDressIndices.has(index)) {
      updatedPreferences.fit[fit].liked += 1;
      updatedPreferences.skirt[skirt].liked += 1;
      updatedPreferences.neckline[neckline].liked += 1;
    }
  });
  
  return updatedPreferences;
};

export const calculateProbability = (counters: ValueCounters): number => {
  return (counters.liked + 1) / (counters.shown + 2);
};

export const calculateDressScore = (dress: Dress, userPreferences: UserPreferences): number => {
  const { fit, skirt, neckline } = dress.dress;
  
  const fitProb = calculateProbability(userPreferences.fit[fit]);
  const skirtProb = calculateProbability(userPreferences.skirt[skirt]);
  const necklineProb = calculateProbability(userPreferences.neckline[neckline]);
  
  return fitProb * skirtProb * necklineProb;
};

export const selectExplorationDresses = (
  allDresses: Dress[],
  shownDressIds: Set<number>,
  count: number
): { dresses: Dress[], indices: number[] } => {
  const availableIndices = allDresses
    .map((_, index) => index)
    .filter(index => !shownDressIds.has(index));
  
  if (availableIndices.length <= count) {
    const selectedIndices = [...availableIndices];
    return {
      dresses: selectedIndices.map(index => allDresses[index]),
      indices: selectedIndices
    };
  }
  
  const selectedIndices: number[] = [];
  const availableIndexSet = new Set(availableIndices);
  
  while (selectedIndices.length < count && availableIndexSet.size > 0) {
    const randomIndex = getRandomElement([...availableIndexSet]);
    selectedIndices.push(randomIndex);
    availableIndexSet.delete(randomIndex);
  }
  
  return {
    dresses: selectedIndices.map(index => allDresses[index]),
    indices: selectedIndices
  };
};

export const selectExploitationDresses = (
  allDresses: Dress[],
  shownDressIds: Set<number>,
  userPreferences: UserPreferences,
  count: number
): { dresses: Dress[], indices: number[] } => {
  const scoredDresses = allDresses
    .map((dress, index) => ({
      dress,
      index,
      score: calculateDressScore(dress, userPreferences)
    }))
    .filter(({ index }) => !shownDressIds.has(index))
    .sort((a, b) => b.score - a.score);
  
  const selected = scoredDresses.slice(0, count);
  
  return {
    dresses: selected.map(item => item.dress),
    indices: selected.map(item => item.index)
  };
};

export const generateRecommendations = (
  allDresses: Dress[],
  shownDressIds: Set<number>,
  userPreferences: UserPreferences,
  count: number
): ScoredDress[] => {
  const scoredDresses = allDresses
    .map((dress, index) => ({
      ...dress,
      score: calculateDressScore(dress, userPreferences)
    }))
    .filter((_, index) => !shownDressIds.has(index))
    .sort((a, b) => b.score - a.score); 
  
  return scoredDresses.slice(0, count);
}; 