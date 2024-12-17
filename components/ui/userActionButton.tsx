'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash2 } from 'lucide-react'

interface User {
  _id: string; 
  name: string; 
  lastName: string; 
  email: string; 
  password?: string; 
  rol: string; 
}

interface UserActionButtonProps {
  action: 'create' | 'edit' | 'delete' 
  buttonText: string 
  onSubmit: (data: Partial<User> & { _id?: string }) => void 
  initialData?: Partial<User> 
}

const roleMap: Record<string, string> = {
  admin: 'Administrador',
  user: 'Usuario',
  Administrador: 'admin',
  Usuario: 'user',
};

export function UserActionButton({ action, buttonText, onSubmit, initialData }: UserActionButtonProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(initialData?.name || '')
  const [lastName, setLastName] = useState(initialData?.lastName || '')
  const [email, setEmail] = useState(initialData?.email || '')
  const [password, setPassword] = useState(initialData?.password || '')
  const [rol, setRol] = useState(() => {
    if (initialData?.rol) {
      return roleMap[initialData.rol] || 'user';
    }
    return 'user';
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const formattedRol = roleMap[rol]; // Convierte a 'Administrador' o 'Usuario'
  
    if (action === 'delete' && initialData?._id) {
      onSubmit({ _id: initialData._id });
    } else if (action === 'edit' && initialData?._id) {
      onSubmit({
        _id: initialData._id,
        name: name || '',
        lastName: lastName || '',
        email: email || '',
        password: password || '',
        rol: formattedRol, // Envía el rol en formato correcto
      });
    } else if (action === 'create') {
      onSubmit({
        name: name || '',
        lastName: lastName || '',
        email: email || '',
        password: password || '',
        rol: formattedRol, // Envía el rol en formato correcto
      });
    } else {
      console.error('Error: Acción desconocida o _id es undefined.');
    }
  
    setOpen(false);
    setName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setRol('');
  };

    
  
  const isDelete = action === 'delete';
  // const isEdit = action === 'edit';
  const isCreate = action === 'create';

  const getIcon = () => {
    switch (action) {
      case 'edit':
        return <Edit className="h-4 w-4" />
      case 'delete':
        return <Trash2 className="h-4 w-4" />
      default:
        return null
    }
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <Popover open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
            <Button 
                variant={isDelete ? "destructive" : "outline"} 
                size={action === 'create' ? "default" : "icon"}
              >
                {action === 'create' ? buttonText : getIcon()}
                {action !== 'create' && <span className="sr-only">{buttonText}</span>}
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <PopoverContent 
            className="w-80 max-h-[calc(100vh-64px)] relative"
          >
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">{buttonText}</h4>
                <p className="text-sm text-muted-foreground">
                  {isDelete ? "¿Estás seguro de que quieres eliminar este usuario?" : "Ingrese los detalles del usuario."}
                </p>
              </div>
              {!isDelete && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Primer Nombre"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Apellido</Label>
                    <Input 
                      id="lastName" 
                      value={lastName} 
                      onChange={(e) => setLastName(e.target.value)} 
                      placeholder="Apellido"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      placeholder="Escribe una contraseña"
                    />
                  </div>
                  { isCreate? "" :
                    <div className="grid gap-2">
                      <Label htmlFor="rol">Rol</Label>
                      <Select
                        value={rol} // Utiliza el estado actual
                        onValueChange={(value) => setRol(value)} // Actualiza con el nuevo valor
                      >
                        <SelectTrigger id="rol">
                          <SelectValue placeholder="Seleccione un rol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrador</SelectItem>
                          <SelectItem value="user">Usuario</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  }
                </>
              )}
              <Button type="submit" variant={isDelete ? "destructive" : "default"}>
                {isDelete ? "Confirmar Eliminación" : "Guardar"}
              </Button>
            </form>
          </PopoverContent>
          <TooltipContent className="bg-gray-200 text-xs text-gray-700 rounded p-2">
            <p>{buttonText}</p>
          </TooltipContent>
        </Popover>
      </Tooltip>
    </TooltipProvider>
  )
}