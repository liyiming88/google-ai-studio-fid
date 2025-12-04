import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Asset } from '../types';

interface AssetChartProps {
  assets: Asset[];
}

const AssetChart: React.FC<AssetChartProps> = ({ assets }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Asset Allocation</h3>
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={assets}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {assets.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => `$${value.toLocaleString()}`}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        {assets.map((asset) => (
          <div key={asset.id} className="flex justify-between items-center pb-2 border-b border-slate-50">
            <span className="flex items-center text-slate-600">
              <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: asset.color }}></span>
              {asset.category}
            </span>
            <span className="font-semibold text-slate-800">{asset.allocation}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetChart;
