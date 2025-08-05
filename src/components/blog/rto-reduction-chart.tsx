
'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export const RtoReductionChart = () => (
    <div className="my-8 h-[300px] bg-card p-4 rounded-lg border">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={[
            { name: 'Q1 (Before)', RTO_Rate: 35 },
            { name: 'Q2 (After)', RTO_Rate: 20 },
          ]}
        >
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="%" />
          <Tooltip
            contentStyle={{
              background: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
            }}
          />
          <Bar dataKey="RTO_Rate" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
