// components/CustomerChart.tsx
'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Ene', nuevos: 4000, recurrentes: 2400 },
  { name: 'Feb', nuevos: 3000, recurrentes: 1398 },
  { name: 'Mar', nuevos: 2000, recurrentes: 9800 },
  { name: 'Abr', nuevos: 2780, recurrentes: 3908 },
  { name: 'May', nuevos: 1890, recurrentes: 4800 },
  { name: 'Jun', nuevos: 2390, recurrentes: 3800 },
]

export default function CustomerChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="nuevos" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="recurrentes" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    </ResponsiveContainer>
  )
}