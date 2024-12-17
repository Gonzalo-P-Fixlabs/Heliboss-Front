
'use client'

import { useState, useEffect} from 'react'

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
import { InventoryActionButton } from '../../../components/ui/inventoryActionButton'

import { getInventory, syncInventory, syncMVInventory, syncOneItemMVInventory } from '@/app/api/products/products.api'
import { TablePagination } from '@mui/material'
import { useSession } from 'next-auth/react'

import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { getProcess } from '@/app/api/process/process.api'

export default function ProductosPage() {

  const [dataItem, setDataItem] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1); 
  const [open, setOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const [totalItems, setTotalItems] = useState(10); 
  const [active, setActive] = useState(true); 
  const [MVActive, setMVActive] = useState(false); 



interface Item {
    id:                number;
    quantity:          number;
    quantityReserved:  number;
    quantityAvailable: number;
    sync:              string;
    variant:           Variant;
}

interface Variant {
    id:          number;
    description: string;
    barCode:     string;
    code:        string;
    product:     Product;
    costs:       Costs;
}

interface Costs {
  averageCost: number;
}


interface Product {
  id:   number;
  name: string;
}



 
const fetchData = async () => {
  try {

    const params = { 
      itemsPerPage, 
      currentPage,
      search
     };

     
     const data = await getInventory(params);

    const formattedData = data.items.map((item: Item) => ({
      id: item.id,
      quantity: item.quantity,
      quantityReserved: item.quantityReserved,
      quantityAvailable: item.quantityAvailable,
      sync: item.sync,
      variant: {
        id: item.variant.id,
        description: item.variant.description,
        barCode: item.variant.barCode,
        code: item.variant.code,
        product: {
          id: item.variant.product.id,
          name: item.variant.product.name,
        },
        costs: {
          averageCost: Number(item.variant.costs.averageCost.toFixed(0)).toLocaleString('es-CL')}
      },
    })
  );

  if (formattedData.length === 0) setMVActive(false);
  

  formattedData.map((item: Item) => {
    if (item.sync === 'Pendiente') {
      setMVActive(true);
    }
  })


    setDataItem(formattedData);
    setTotalItems(data.totalItems);

    return formattedData;
  } catch (error) {
    console.error("Hubo un error en la petición", error);
  }
};

const fetchJobs = async () => {
  try{
    const response = await getProcess({});

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const activedJobs = response.items.filter( (item: any) => {
        if (item.status === 'in progress') return item ;
      } );


    if (activedJobs.length > 0) {
      setActive(false);
      setMVActive(false);
    } else {
      setActive(true);
    }
  } 
  catch(error) {
    console.log(error);

  }

}


useEffect(() => {
  const fetchAll = () => {
    fetchJobs();
    fetchData();
  };

  fetchAll(); 

  const interval = setInterval(fetchAll, 5000);

  return () => clearInterval(interval); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [currentPage, itemsPerPage, search]); 





  const handleSyncInventory = async() => {
    try {
      setActive(false);
      setMVActive(false);
      await syncInventory(session?.user?.name || "No-user");
      handleClick();  
      await fetchData();
    } catch (error) {
      console.error("Error sincronizando el inventario:", error);
    }
  };

  const handleSyncMVInventory = async() => {
    try {
      setActive(false);
      setMVActive(false);
      await syncMVInventory(session?.user?.name || "No-user");
      handleClick();

    } catch (error) {
      console.error("Error sincronizando el inventario:", error);
    }
  };




  const { data: session, status } = useSession(); 
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  if (status === "loading") {
    return null;
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Gestión de inventario</h1>
      
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar producto..."
            className="pl-8"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        
        {session?.user.rol==="admin" && <>

          <div className="flex justify-between space-x-4">
            <InventoryActionButton
              buttonText="Capturar productos desde Bsale"
              onSubmit={handleSyncInventory}
              color={'#fe6902'}
              active={active}
            />
  
            <InventoryActionButton
              buttonText="Sincronizar a Multivende"
              onSubmit={handleSyncMVInventory}
              color={'#2b4063'}
              active={MVActive}
            />
          </div>


        </> }

        
      

      </div>
          
      <Card>
        <CardHeader>
          <CardTitle>Lista de Producto</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
          <TableHeader>
  <TableRow>
    <TableHead style={{ textAlign: 'center' }}>SKU</TableHead>
    <TableHead>Nombre</TableHead>
    <TableHead style={{ textAlign: 'center' }}>Stock</TableHead>
    <TableHead style={{ textAlign: 'center' }}>Precio</TableHead>
    <TableHead style={{ textAlign: 'center' }}>Estado</TableHead>
  </TableRow>
</TableHeader>
            <TableBody>
              {dataItem.map((item: Item) => (
                <TableRow key={item.id}>
                  <TableCell style={{textAlign: 'center'}}>{item.variant.code}</TableCell>
                  <TableCell>{`${item.variant.product.name} ${item.variant.description}`}</TableCell>
                  <TableCell style={{textAlign: 'center'}}>{item.quantityAvailable}</TableCell>
                  <TableCell style={{textAlign: 'center'}}>${item.variant.costs.averageCost}</TableCell>
                  <TableCell style={{textAlign: 'center'}}>
                    {
                      item.sync === 'Pendiente' 
                        ? <button onClick={() => syncOneItemMVInventory(item.variant.barCode, session?.user?.name || 'no-user' )}>{item.sync}</button> 
                        : item.sync
                    }
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

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          ¡Proceso creado con éxito!
        </Alert>
      </Snackbar>
    </div>
  )
}
