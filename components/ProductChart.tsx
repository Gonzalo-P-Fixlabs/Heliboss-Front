// components/ProductChart.tsx
'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Producto A', ventas: 4000 },
  { name: 'Producto B', ventas: 3000 },
  { name: 'Producto C', ventas: 2000 },
  { name: 'Producto D', ventas: 2780 },
  { name: 'Producto E', ventas: 1890 },
]

export default function ProductChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="ventas" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}