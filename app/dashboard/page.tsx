import { redirect } from 'next/navigation'
export default function DashboardPage() {
  redirect(`/dashboard/productos`);
}
// app/dashboard/page.tsx
// 'use client'
// import { useState } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Calendar } from "@/components/ui/calendar"
// import { Input } from "@/components/ui/input"
// import { DateRange } from "react-day-picker"
// import { format } from "date-fns"
// import { Calendar as CalendarIcon, Search, DollarSign, Package, Users, TrendingUp } from "lucide-react"
// import { cn } from "@/lib/utils"
// import Chart from '@/components/Chart'
// import DataTable from '@/components/DataTable'

// // Nuevos componentes para los módulos adicionales
// import ProductChart from '@/components/ProductChart'
// import CustomerChart from '@/components/CustomerChart'

// export default function DashboardPage() {
 
//   const [date, setDate] = useState<DateRange | undefined>()
//   const [search, setSearch] = useState('')
//   const [data, setData] = useState([])
//   const column = [
//   ]
//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">Dashboard General</h1>
      
//       <div className="flex space-x-4">
//         <Popover>
//           <PopoverTrigger asChild>
//             <Button
//               variant={"outline"}
//               className={cn(
//                 "w-[240px] justify-start text-left font-normal",
//                 !date && "text-muted-foreground"
//               )}
//             >
//               <CalendarIcon className="mr-2 h-4 w-4" />
//               {date?.from ? (
//                 date.to ? (
//                   <>
//                     {format(date.from, "LLL dd, y")} -{" "}
//                     {format(date.to, "LLL dd, y")}
//                   </>
//                 ) : (
//                   format(date.from, "LLL dd, y")
//                 )
//               ) : (
//                 <span>Seleccionar fechas</span>
//               )}
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-auto p-0" align="start">
//             <Calendar
//               initialFocus
//               mode="range"
//               defaultMonth={date?.from}
//               selected={date}
//               onSelect={setDate}
//               numberOfMonths={2}
//             />
//           </PopoverContent>
//         </Popover>

//         <Popover>
//           <PopoverTrigger asChild>
//             <Button variant="outline">
//               <Search className="mr-2 h-4 w-4" />
//               Buscar
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-80">
//             <div className="space-y-4">
//               <h4 className="font-medium leading-none">Buscar</h4>
//               <Input
//                 type="search"
//                 placeholder="Buscar en todos los módulos..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </div>
//           </PopoverContent>
//         </Popover>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Ventas Totales
//             </CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$45,231.89</div>
//             <p className="text-xs text-muted-foreground">
//               +20.1% respecto al mes anterior
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Productos Vendidos
//             </CardTitle>
//             <Package className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">1,234</div>
//             <p className="text-xs text-muted-foreground">
//               +15% respecto al mes anterior
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Nuevos Clientes
//             </CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">321</div>
//             <p className="text-xs text-muted-foreground">
//               +5% respecto al mes anterior
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Tasa de Conversión
//             </CardTitle>
//             <TrendingUp className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">3.2%</div>
//             <p className="text-xs text-muted-foreground">
//               +0.5% respecto al mes anterior
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Resumen de Ventas</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Chart />
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Productos Más Vendidos</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ProductChart />
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Adquisición de Clientes</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <CustomerChart />
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Últimas Ventas</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <DataTable columns={column} data={data} />
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }