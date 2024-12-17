// app/dashboard/users/page.tsx
'use client'

import { useState, useEffect} from 'react'

import { format } from 'date-fns';
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from 'lucide-react'
import { UserActionButton } from '../../../components/ui/userActionButton'
import axios from 'axios';
import Box from '@mui/material/Box';
import { getUsers } from '@/app/api/users/users.api';
import { TablePagination } from '@mui/material';

interface User {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  password?: string;
  rol: string;
  createdAt?: string; 
}

function UsersPage() {

  const [data, setData] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const [totalItems, setTotalItems] = useState(10); 

  const formatRole = (rol: string): string => {
    if (rol === 'user') return 'Usuario';
    if (rol === 'admin') return 'Administrador';
    return rol; 
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString); 
    return format(date, 'dd/MM/yyyy'); 
  };

 
const BACKEND_URL= process.env.NEXT_PUBLIC_BACKEND_URL


  const fetchData = async () => {


    const params = { 
      itemsPerPage, 
      currentPage,
      search
     };

    try {
      const response = await getUsers(params);
      const usersWithFormattedData = response.userInfos.items.map((user: User) => {

        if (user.createdAt) {
          const formattedDate = format(new Date(user.createdAt), 'dd/MM/yyyy');
          user.createdAt = formattedDate; 
        }
        
        user.rol = formatRole(user.rol);
        return user;
      });
      setData(usersWithFormattedData);
      setTotalItems(response.userInfos.totalItems);
    } catch (error) {
      console.error("Hubo un error en la petición", error);
    }
  };

  useEffect (()=>{
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data]);





const handleCreateUser = async (newData: Partial<User> & { _id?: string }) => {

  try {
    const response = await axios.post(`${BACKEND_URL}/user/createUser`, {
      name: newData!.name,
      lastName: newData!.lastName,
      email: newData!.email,
      password: newData!.password,
      rol: newData!.rol
    });

    if (response.data.message === "Usuario user creado exitosamente" && response.data.newUser) {
      const newUser: User = {
        _id: response.data.newUser._id,
        name: response.data.newUser.name,
        lastName: response.data.newUser.lastName,
        email: response.data.newUser.email,
        rol: formatRole(response.data.newUser.rol),
        createdAt: formatDate(response.data.newUser.createdAt)
      };

      // Actualizar el estado para reflejar el nuevo usuario
      setData((prevData) => [...prevData, newUser]);

    } else {
      console.error('Error en la respuesta del servidor:', response.data);
    }
  } catch (error) {
    console.error('Error creando usuario:', error);
  }
};

const handleEditUser = async (updatedData: Partial<User> & { _id: string }) => {
  if (!updatedData._id) { 
    console.error('Error: _id es undefined.'); 
    return;
  }

  const userToUpdate: User = {
    _id: updatedData._id,
    name: updatedData.name || '', 
    lastName: updatedData.lastName || '', 
    email: updatedData.email || '', 
    password: updatedData.password || '', 
    rol: updatedData.rol || '', 
    createdAt: updatedData.createdAt || ''
  };

  try {
    const response = await axios.put(`${BACKEND_URL}/user/editUser/${userToUpdate._id}`, userToUpdate);

    if (response.data.updatedUser) {
      const updatedUsers = data.map(user => 
        user._id === userToUpdate._id ? userToUpdate : user
      );

      setData(updatedUsers);

    } else {
      console.error('Error en la respuesta del servidor:', response.data);
    }
  } catch (error) {
    console.error('Error editando usuario:', error);
  }
};

const handleDeleteUser = async (userId: string) => {
  if (!userId) {
    console.error('Error: userId is undefined.'); 
    return; }

  try {
    const response = await axios.delete(`${BACKEND_URL}/user/deleteUser/${userId}`);
    if (response.data.message === "Usuario eliminado exitosamente") {
      const updatedUsers = data.filter(user => user._id !== userId);
      setData(updatedUsers);

    } else {
      console.error('Error en la respuesta del servidor:', response.data);
    }
  } catch (error) {
    console.error('Error eliminando usuario:', error);
  }
};

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
      
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar usuarios..."
            className="pl-8"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }} 
          />
        </div>

        <UserActionButton
          action="create"
          buttonText="Agregar Usuario"
          onSubmit={handleCreateUser}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead style={{ textAlign: 'center' }}>Email</TableHead>
              <TableHead style={{ textAlign: 'center' }}>Rol</TableHead>
              <TableHead style={{ textAlign: 'center' }}>Fecha de creación</TableHead>
              {/* <TableHead style={{ textAlign: 'center' }}>Último Acceso</TableHead> */}
              <TableHead style={{ textAlign: 'center' }}>Acciones</TableHead>
            </TableRow>
          </TableHeader>
            <TableBody>
              {data.map((user: User) => (
                <TableRow key={user._id}>
                  <TableCell>{`${user.name} ${user.lastName}`}</TableCell>
                  <TableCell style={{textAlign: 'center'}}>{user.email}</TableCell>
                  <TableCell>
                    <Box
                          component="span"
                          sx={{
                            paddingX: 1,
                            paddingY: 0.5,
                            borderRadius: '16px',
                            color: 'white',
                            backgroundColor: user.rol === 'Administrador' ? 'error.main' : 'info.main',
                            fontWeight: 'bold',
                            // Centrado en el Box
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 'fit-content', // Ancho ajustado al contenido
                            margin: '0 auto', // Centra el contenido dentro de la celda
                          }}
                      >
                          {user.rol}
                      </Box>
                  </TableCell>
                  <TableCell style={{textAlign: 'center'}}>{user.createdAt}</TableCell>
                  {/* <TableCell>{user.lastLogin}</TableCell> */}
                  <TableCell style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="flex space-x-2">
                      <UserActionButton
                        action="edit"
                        buttonText="Editar Usuario"
                        onSubmit={(data) => handleEditUser({ ...data, _id: user._id })}
                        initialData={user}
                      />
                      <UserActionButton 
                      action="delete"
                      buttonText="Eliminar Usuario" 
                      onSubmit={(data) => data._id && handleDeleteUser(data._id)}
                      initialData={{ _id: user._id }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={ totalItems }
            page={ currentPage - 1 }
            onPageChange={(_, page) => {
              setCurrentPage(page + 1);
            }}
            rowsPerPage={itemsPerPage}
            onRowsPerPageChange={(e)=> {
              setItemsPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
          />

        </CardContent>
      </Card>
    </div>
  )
}

UsersPage.displayName = 'UsersPage'; 
export default UsersPage;