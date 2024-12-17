
'use client'

import { useState, useEffect} from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Tooltip from '@mui/material/Tooltip';

import { CircularProgress, TablePagination } from '@mui/material'
import { CheckCircle, Clock, AlertCircle } from "lucide-react"; 
import { getProcess } from '@/app/api/process/process.api'


export default function ProcesosPage() {

  interface Process {
    _id: number;
    name: string;
    endpoint: string;
    status: string;
    message: string;
    user: string;
    icon: React.ReactNode;
  }
  

  const [dataItem, setDataItem] = useState<Process[]>([]);
  const [search] = useState("");
  const [currentPage, setCurrentPage] = useState(1); 

  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const [totalItems, setTotalItems] = useState(10); 



 
  const fetchData = async () => {
    try {
  
      const params = { 
        itemsPerPage, 
        currentPage,
        search
       };
  
      const data = await getProcess(params);
  
      const formattedData = data.items.map((item: Process) => {

        
        let icon;
        switch (item.status) {
          case "in progress":
            icon = (
              <Tooltip title={item.message}>
                <CircularProgress size={24} />
              </Tooltip>
            );
            break;
          case "pending":
            icon = (
              <Tooltip title={item.message}>
                <Clock style={{ color: "orange" }} />
              </Tooltip>
            );
            break;
          case "completed":
            icon = (
              <Tooltip title={item.message}>
                <CheckCircle style={{ color: "green" }} />
              </Tooltip>
            );
            break;
          case "error":
            icon = (
              <Tooltip title={item.message === "En proceso..." && item.name === 'Actualización de stock' ? 'Error al conectar con Multivende' : 'Error al procesar'}>
                <AlertCircle style={{ color: "red" }} />
              </Tooltip>
            );
            break;
          default:
            icon = (
              <Tooltip title={item.name}>
                <AlertCircle style={{ color: "gray" }} />
              </Tooltip>
            );
        }
  
        return {
          id: item._id,
          name: item.name,
          endpoint: item.endpoint,
          status: item.status,
          message: item.message,
          user: item.user,
          icon
        };
      });
  
    
  
      setDataItem(formattedData);
      setTotalItems(data.totalItems);
  
      return formattedData;
    } catch (error) {
      console.error("Hubo un error en la petición", error);
    }
  };


  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000); 

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage, search]);








  if (status === "loading") {
    return null;
  }


  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Gestión de procesos</h1>
      
      <div className="flex justify-between items-center">

      

      </div>
          
      <Card>
        <CardHeader>
          <CardTitle>Lista de Procesos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead style={{ textAlign: 'center' }}>N°</TableHead>
              <TableHead style={{ textAlign: 'center' }}>Proceso</TableHead>
              <TableHead style={{ textAlign: 'center' }}>Responsable</TableHead>
              <TableHead style={{textAlign: 'center'}}>Estado</TableHead>
            </TableRow>
          </TableHeader>
            <TableBody>
              {dataItem.map((item, Index) => 
              (
                <TableRow key={Index}>
                  <TableCell style={{textAlign: 'center'}}>{Index+1}</TableCell>
                  <TableCell style={{textAlign: 'center'}}>{item.name}</TableCell>
                  <TableCell style={{textAlign: 'center'}}>{item.user}</TableCell>
                  <TableCell
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      }}
                    >
                      {item.icon}
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
