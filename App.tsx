import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AIAdvisor from './components/AIAdvisor';
import { MOCK_ASSETS, MOCK_GOALS, generateProjections } from './constants';
import { Asset, Goal, ProjectionPoint } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [assets, setAssets] = useState<Asset[]>(MOCK_ASSETS);
  const [goals, setGoals] = useState<Goal[]>(MOCK_GOALS);
  const [projections, setProjections] = useState<ProjectionPoint[]>([]);

  useEffect(() => {
    // Initialize projections based on total asset value
    const totalValue = assets.reduce((acc, curr) => acc + curr.value, 0);
    const data = generateProjections(totalValue, 20);
    setProjections(data);
  }, [assets]);

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <Dashboard assets={assets} goals={goals} projections={projections} />;
      case 'advisor':
        return <AIAdvisor assets={assets} goals={goals} />;
      case 'planning':
        return (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
             <h2 className="text-2xl font-bold text-slate-800 mb-2">Detailed Planning</h2>
             <p className="text-slate-500">Goal editing and simulation features would go here.</p>
             <button 
                onClick={() => setActiveTab('advisor')}
                className="mt-6 px-6 py-2 rounded-md text-white font-medium transition-colors hover:bg-opacity-90"
                style={{ backgroundColor: '#12805c' }}
             >
               Ask AI Advisor
             </button>
          </div>
        );
      case 'analysis':
        return (
             <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
             <h2 className="text-2xl font-bold text-slate-800 mb-2">Deep Portfolio Analysis</h2>
             <p className="text-slate-500">Monte Carlo simulations and risk analysis module.</p>
          </div>
        );
      default:
        return <Dashboard assets={assets} goals={goals} projections={projections} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 capitalize">
          {activeTab === 'advisor' ? 'Financial Assistant' : activeTab === 'dashboard' ? 'Overview' : activeTab.replace('-', ' ')}
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {activeTab === 'dashboard' ? `Last updated: ${new Date().toLocaleDateString()}` : ''}
        </p>
      </div>
      {renderContent()}
    </Layout>
  );
};

export default App;
