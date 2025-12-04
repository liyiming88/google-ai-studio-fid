import React from 'react';
import { Asset, Goal, ProjectionPoint } from '../types';
import AssetChart from './AssetChart';
import ProjectionChart from './ProjectionChart';
import GoalCard from './GoalCard';
import { ArrowUpRight, ShieldCheck, Activity, AlertCircle } from 'lucide-react';
import { BRAND_COLOR } from '../constants';

interface DashboardProps {
  assets: Asset[];
  goals: Goal[];
  projections: ProjectionPoint[];
}

const Dashboard: React.FC<DashboardProps> = ({ assets, goals, projections }) => {
  const totalNetWorth = assets.reduce((sum, asset) => sum + asset.value, 0);
  
  // Calculate Plan Score (Mock logic)
  const fundedRatio = goals.reduce((acc, goal) => acc + (goal.currentAmount / goal.targetAmount), 0) / goals.length;
  const planScore = Math.min(99, Math.round(fundedRatio * 100));

  return (
    <div className="space-y-6 pb-10">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden">
            <div className="z-10">
                <p className="text-sm text-slate-500 font-medium mb-1">Total Net Worth</p>
                <h2 className="text-3xl font-bold text-slate-800">${totalNetWorth.toLocaleString()}</h2>
                <div className="flex items-center mt-2 text-green-600 text-sm font-semibold">
                    <ArrowUpRight size={16} className="mr-1" />
                    <span>+12.5% YTD</span>
                </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-green-50 to-transparent z-0"></div>
            <Activity className="text-slate-200 absolute right-6 bottom-6" size={48} />
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden">
            <div className="z-10">
                <p className="text-sm text-slate-500 font-medium mb-1">Fidelity PlanScore℠</p>
                <div className="flex items-baseline space-x-2">
                    <h2 className="text-3xl font-bold text-slate-800">{planScore}</h2>
                    <span className="text-sm text-slate-400">/ 100</span>
                </div>
                <div className="flex items-center mt-2 text-sm font-semibold" style={{color: BRAND_COLOR}}>
                    <ShieldCheck size={16} className="mr-1" />
                    <span>Good Standing</span>
                </div>
            </div>
            {/* Score Guage Visual Mock */}
             <div className="w-16 h-16 rounded-full border-4 border-slate-100 flex items-center justify-center absolute right-6 top-6" style={{borderRightColor: BRAND_COLOR, borderTopColor: BRAND_COLOR}}>
                <span className="text-xs font-bold text-slate-400">{planScore}</span>
             </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                 <p className="text-sm text-slate-500 font-medium mb-1">Action Items</p>
                 <h2 className="text-3xl font-bold text-slate-800">2</h2>
                 <div className="flex items-center mt-2 text-amber-600 text-sm font-semibold">
                    <AlertCircle size={16} className="mr-1" />
                    <span>Review Bonds</span>
                </div>
            </div>
            <div className="bg-amber-50 p-3 rounded-full">
                <AlertCircle className="text-amber-500" size={24} />
            </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[450px]">
        <div className="lg:col-span-2 h-[450px] lg:h-full">
            <ProjectionChart data={projections} />
        </div>
        <div className="h-[400px] lg:h-full">
            <AssetChart assets={assets} />
        </div>
      </div>

      {/* Goals Row */}
      <div>
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-slate-800">Your Goals</h3>
            <button className="text-sm font-semibold hover:underline" style={{color: BRAND_COLOR}}>View All Goals</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map(goal => (
                <GoalCard key={goal.id} goal={goal} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
