import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  PieChart, 
  TrendingUp, 
  Target, 
  MessageSquare, 
  Menu, 
  X,
  LogOut,
  User
} from 'lucide-react';
import { BRAND_COLOR } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'planning', label: 'Planning & Goals', icon: Target },
    { id: 'analysis', label: 'Portfolio Analysis', icon: PieChart },
    { id: 'advisor', label: 'AI Advisor', icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shadow-sm z-10">
        <div className="p-6 border-b border-slate-100 flex items-center space-x-3">
          <div className="w-8 h-8 rounded-md flex items-center justify-center text-white font-bold" style={{ backgroundColor: BRAND_COLOR }}>
            F
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">PlanView</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-all duration-200 ${
                  isActive 
                    ? `text-white shadow-md` 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
                style={{ backgroundColor: isActive ? BRAND_COLOR : 'transparent' }}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center space-x-3 px-4 py-3 text-slate-600">
            <User size={20} />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-800">John Doe</span>
              <span className="text-xs text-slate-500">Premium Investor</span>
            </div>
          </div>
          <button className="w-full flex items-center space-x-3 px-4 py-2 mt-2 text-red-600 hover:bg-red-50 rounded-md text-sm">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between z-20">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md flex items-center justify-center text-white font-bold" style={{ backgroundColor: BRAND_COLOR }}>
              F
            </div>
            <span className="font-bold text-lg text-slate-800">PlanView</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute inset-0 bg-white z-10 pt-20 px-4 space-y-2">
            {navItems.map((item) => {
               const Icon = item.icon;
               return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-4 rounded-lg text-lg border-b border-slate-100 ${
                    activeTab === item.id ? 'text-[#12805c] font-bold' : 'text-slate-600'
                  }`}
                >
                  <Icon size={24} />
                  <span>{item.label}</span>
                </button>
               );
            })}
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
