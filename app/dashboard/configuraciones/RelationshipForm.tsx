// app/dashboard/configuraciones/RelationshipForm.tsx
'use client'

import { useState } from 'react'
import { useRelationships } from '@/app/context/RelationshipContext'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X } from 'lucide-react'

// Datos de ejemplo (en una aplicación real, estos vendrían de una API)
const clients = [
  { id: '1', name: 'Cliente A' },
  { id: '2', name: 'Cliente B' },
  { id: '3', name: 'Cliente C' },
]

const branches = [
  { id: '1', name: 'Sucursal 1' },
  { id: '2', name: 'Sucursal 2' },
  { id: '3', name: 'Sucursal 3' },
  { id: '4', name: 'Sucursal 4' },
]

const accounts = [
  { id: '101', name: 'Cuenta 101' },
  { id: '102', name: 'Cuenta 102' },
  { id: '103', name: 'Cuenta 103' },
]

export function RelationshipForm() {
  const { addRelationship } = useRelationships()
  const [clientId, setClientId] = useState('')
  const [branchIds, setBranchIds] = useState<string[]>([''])
  const [accountId, setAccountId] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addRelationship({ clientId, branchIds: branchIds.filter(Boolean), accountId })
    // Limpiar el formulario
    setClientId('')
    setBranchIds([''])
    setAccountId('')
  }

  const addBranchField = () => {
    setBranchIds([...branchIds, ''])
  }

  const removeBranchField = (index: number) => {
    const newBranchIds = branchIds.filter((_, i) => i !== index)
    setBranchIds(newBranchIds)
  }

  const updateBranchId = (index: number, value: string) => {
    const newBranchIds = [...branchIds]
    newBranchIds[index] = value
    setBranchIds(newBranchIds)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="client">Cliente</Label>
        <Select value={clientId} onValueChange={setClientId}>
          <SelectTrigger id="client">
            <SelectValue placeholder="Seleccionar cliente" />
          </SelectTrigger>
          <SelectContent>
            {clients.map(client => (
              <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Sucursales</Label>
        {branchIds.map((branchId, index) => (
          <div key={index} className="flex items-center space-x-2 mt-2">
            <Select value={branchId} onValueChange={(value) => updateBranchId(index, value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar sucursal" />
              </SelectTrigger>
              <SelectContent>
                {branches.map(branch => (
                  <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {index > 0 && (
              <Button type="button" variant="outline" size="icon" onClick={() => removeBranchField(index)}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addBranchField} className="mt-2">
          <Plus className="h-4 w-4 mr-2" /> Agregar Sucursal
        </Button>
      </div>

      <div>
        <Label htmlFor="account">Cuenta Contable (Opcional)</Label>
        <Select value={accountId} onValueChange={setAccountId}>
          <SelectTrigger id="account">
            <SelectValue placeholder="Seleccionar cuenta" />
          </SelectTrigger>
          <SelectContent>
            {accounts.map(account => (
              <SelectItem key={account.id} value={account.id}>{account.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit">Guardar Relación</Button>
    </form>
  )
}