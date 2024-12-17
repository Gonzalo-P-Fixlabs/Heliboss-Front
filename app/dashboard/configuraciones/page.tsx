// app/dashboard/configuraciones/page.tsx
'use client'

import { useState } from 'react'
import { RelationshipProvider } from '@/app/context/RelationshipContext'
import { RelationshipForm } from './RelationshipForm'
import { RelationshipTable } from './RelationshipTable'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ConfiguracionesPage() {
  const [activeTab, setActiveTab] = useState('relaciones')

  return (
    <RelationshipProvider>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Configuraciones</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="relaciones">Relaciones Cliente-Sucursal</TabsTrigger>
            <TabsTrigger value="otras">Otras Configuraciones</TabsTrigger>
          </TabsList>
          <TabsContent value="relaciones">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Relaciones Cliente-Sucursal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <RelationshipForm />
                  <RelationshipTable />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="otras">
            <Card>
              <CardHeader>
                <CardTitle>Otras Configuraciones</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Aquí puedes agregar otras configuraciones de la aplicación.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </RelationshipProvider>
  )
}