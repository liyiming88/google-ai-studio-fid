import React from 'react';
import { Goal } from '../types';
import { GraduationCap, Home, Umbrella, Plane } from 'lucide-react';
import { BRAND_COLOR } from '../constants';

interface GoalCardProps {
  goal: Goal;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const progress = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
  
  const getIcon = () => {
    switch(goal.icon) {
      case 'education': return <GraduationCap className="text-white" size={24} />;
      case 'house': return <Home className="text-white" size={24} />;
      case 'retirement': return <Umbrella className="text-white" size={24} />;
      default: return <Plane className="text-white" size={24} />;
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: BRAND_COLOR }}>
            {getIcon()}
          </div>
          <div>
            <h4 className="font-bold text-slate-800">{goal.name}</h4>
            <p className="text-xs text-slate-500">Target: {goal.targetYear}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Status</p>
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${progress >= 80 ? 'bg-green-100 text-green-700' : progress >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
            {progress >= 80 ? 'On Track' : progress >= 50 ? 'At Risk' : 'Needs Attention'}
          </span>
        </div>
      </div>
      
      <div className="mb-2 flex justify-between items-end">
        <span className="text-2xl font-bold text-slate-800">${goal.currentAmount.toLocaleString()}</span>
        <span className="text-sm text-slate-500 mb-1">of ${goal.targetAmount.toLocaleString()}</span>
      </div>

      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
        <div 
          className="h-2.5 rounded-full transition-all duration-1000" 
          style={{ width: `${progress}%`, backgroundColor: BRAND_COLOR }}
        ></div>
      </div>
      <div className="mt-2 text-xs text-slate-500 text-right">{progress}% Funded</div>
    </div>
  );
};

export default GoalCard;
