'use client'

import { useState } from 'react'
import Button from '@mui/material/Button'
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { darken } from '@mui/system';


interface InventoryActionButtonProps {
  buttonText: string
  onSubmit: () => void
  initialData?: { name: string; email: string; role: string }
  color: string
  active: boolean
}

export function InventoryActionButton({ buttonText, onSubmit, color, active }: InventoryActionButtonProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false);


  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()

    if (!loading) {
      setLoading(true);
      setOpen(false)
      await onSubmit(); 
      setLoading(false);
    }
  }


  return (
<TooltipProvider>
  <Tooltip>
    <Popover open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        {active ? ( // Solo habilita el trigger si el botón está activo
          <PopoverTrigger asChild>
            <div style={{ position: 'relative' }}>
              <Button
                size="medium"
                disabled={!active}
                variant="contained"
                sx={{
                  backgroundColor: color,
                  '&:hover': {
                    backgroundColor: darken(color, 0.2),
                  },
                }}
              >
                {buttonText}
              </Button>
            </div>
          </PopoverTrigger>
        ) : (
          <div style={{ position: 'relative' }}>
            <Button
              size="medium"
              disabled
              variant="contained"
              sx={{
                backgroundColor: color,
                '&:hover': {
                  backgroundColor: darken(color, 0.2),
                },
              }}
            >
              {buttonText}
            </Button>
          </div>
        )}
      </TooltipTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <>
            <Label htmlFor="name">¿Está seguro que desea actualizar inventario?</Label>
            <p className="text-sm text-muted-foreground">Esto podría tardar unos minutos</p>
          </>
          <Button 
            type="submit" 
            variant="contained" 
            sx={{
              backgroundColor: color,
              '&:hover': {
                backgroundColor: darken(color, 0.2),
                },
              }}>
            Actualizar
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