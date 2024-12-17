// app/dashboard/configuraciones/RelationshipTable.tsx
'use client'

import { useRelationships } from '@/app/context/RelationshipContext'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Edit, Trash2 } from 'lucide-react'

// Datos de ejemplo (en una aplicación real, estos vendrían de una API)
const clients = {
  '1': 'Cliente A',
  '2': 'Cliente B',
  '3': 'Cliente C',
}

const branches = {
  '1': 'Sucursal 1',
  '2': 'Sucursal 2',
  '3': 'Sucursal 3',
  '4': 'Sucursal 4',
}

const accounts = {
  '101': 'Cuenta 101',
  '102': 'Cuenta 102',
  '103': 'Cuenta 103',
}

export function RelationshipTable() {
  const { relationships, deleteRelationship } = useRelationships()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>Sucursales</TableHead>
          <TableHead>Cuenta Contable</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {relationships.map((relationship) => (
          <TableRow key={relationship.id}>
            <TableCell>{clients[relationship.clientId as keyof typeof clients]}</TableCell>
            <TableCell>
              {relationship.branchIds.map(id => branches[id as keyof typeof branches]).join(', ')}
            </TableCell>
            <TableCell>
              {relationship.accountId ? accounts[relationship.accountId as keyof typeof accounts] : 'N/A'}
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => deleteRelationship(relationship.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}