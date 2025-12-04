import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ProjectionPoint } from '../types';
import { BRAND_COLOR } from '../constants';

interface ProjectionChartProps {
  data: ProjectionPoint[];
}

const ProjectionChart: React.FC<ProjectionChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
         <h3 className="text-lg font-bold text-slate-800">Wealth Projection</h3>
         <div className="text-sm text-slate-500">
           Simulated growth over 20 years
         </div>
      </div>
      
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorMod" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={BRAND_COLOR} stopOpacity={0.1}/>
                <stop offset="95%" stopColor={BRAND_COLOR} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="year" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#64748b', fontSize: 12}}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#64748b', fontSize: 12}}
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Value"]}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend wrapperStyle={{paddingTop: '20px'}} />
            <Area 
              type="monotone" 
              dataKey="aggressive" 
              name="Aggressive (9%)"
              stackId="1" 
              stroke="#cbd5e1" 
              fill="transparent" 
              strokeDasharray="5 5"
            />
            <Area 
              type="monotone" 
              dataKey="moderate" 
              name="Moderate Plan (7%)"
              stroke={BRAND_COLOR} 
              fill="url(#colorMod)" 
              strokeWidth={3}
            />
            <Area 
              type="monotone" 
              dataKey="conservative" 
              name="Conservative (4%)"
              stroke="#94a3b8" 
              fill="transparent" 
              strokeDasharray="3 3"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProjectionChart;
