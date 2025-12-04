import { Asset, Goal, ProjectionPoint } from './types';

// Fidelity-ish Green Palette
export const BRAND_COLOR = "#12805c"; 
export const BRAND_COLOR_LIGHT = "#e6f2ed";
export const BRAND_COLOR_DARK = "#0d5c42";

export const MOCK_ASSETS: Asset[] = [
  { id: '1', category: 'US Stocks', value: 450000, color: '#12805c', allocation: 45 },
  { id: '2', category: 'Intl Stocks', value: 200000, color: '#4ade80', allocation: 20 },
  { id: '3', category: 'Bonds', value: 250000, color: '#94a3b8', allocation: 25 },
  { id: '4', category: 'Cash', value: 50000, color: '#cbd5e1', allocation: 5 },
  { id: '5', category: 'Real Estate', value: 50000, color: '#1e293b', allocation: 5 },
];

export const MOCK_GOALS: Goal[] = [
  { id: 'g1', name: 'Retirement', targetAmount: 2500000, currentAmount: 1000000, targetYear: 2045, icon: 'retirement' },
  { id: 'g2', name: 'Vacation Home', targetAmount: 500000, currentAmount: 150000, targetYear: 2030, icon: 'house' },
  { id: 'g3', name: 'Kids Education', targetAmount: 200000, currentAmount: 85000, targetYear: 2028, icon: 'education' },
];

export const generateProjections = (startValue: number, years: number): ProjectionPoint[] => {
  const data: ProjectionPoint[] = [];
  const currentYear = new Date().getFullYear();
  
  let cons = startValue;
  let mod = startValue;
  let agg = startValue;

  for (let i = 0; i <= years; i++) {
    data.push({
      year: currentYear + i,
      conservative: Math.round(cons),
      moderate: Math.round(mod),
      aggressive: Math.round(agg),
    });
    cons *= 1.04; // 4% growth
    mod *= 1.07;  // 7% growth
    agg *= 1.09;  // 9% growth
  }
  return data;
};
