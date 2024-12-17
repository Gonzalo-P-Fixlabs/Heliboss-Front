"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import {
  Users,
  LogOut,
  Menu,
  Package,
  Activity,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { getProcess } from "@/app/api/process/process.api";
import Image from "next/image";
// import router from "next/router";

const menuItems = [
 
  { icon: Package, 
    label: 'Inventario',
    href: '/dashboard/productos', 
    onlyAdmin: false
  },
  {
    icon: Users,
    label: "Usuarios",
    href: "/dashboard/users",
    onlyAdmin: true,
  },
  {
    icon: Activity,
    label: "Procesos",
    href: "/dashboard/procesos",
    onlyAdmin: true,
  },

];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapsed] = useState(false);
  const pathname = usePathname();
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" }); 
  };

  const fetchJobs = async () => {
    let count = 0;
    try{
      const response = await getProcess({});
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      response.items.map( (item: any) => {
        if (item.status === 'pending' || item.status === 'in progress') {
          count++;
        }
      } )

      setCountJobs(count);
    } 
    catch(error) {
      console.log(error);

    }

  }

  const { data: session, status } = useSession(); 
  const [filteredMenuItems, setFilteredMenuItems] = useState(menuItems);
  const [countJobs, setCountJobs] = useState(0);

  useEffect(() => {
    
    if (session) {
      const updatedMenuItems = menuItems.filter(
        (item) =>
          !item.onlyAdmin || (item.onlyAdmin && session.user?.rol === "admin")
      );
      setFilteredMenuItems(updatedMenuItems);
    }
  }, [session]);
  
  useEffect(() => {
    fetchJobs();
  
    const interval = setInterval(fetchJobs, 5000);
  
    return () => clearInterval(interval);
  }, []); 
  

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -18,
      top: 10,
      border: `1px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  if (status === "loading") {

    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className={`bg-gray-800 text-white ${
          isCollapsed ? "w-16" : "w-64"
        } transition-all duration-300 hidden md:block`}
      >
        <div className="p-4">
          <Link href="/dashboard" className="flex items-center space-x-2">
            {!isCollapsed && (
                <> 
                <Image
                  src="/Logo-Heliboss.svg"
                  alt="Logo de FIXLABS"
                  width={200}
                  height={50}
                  priority
                  style={{ width: "200px", height: "auto" }}
              /></>
            )}
          </Link>
        </div>

        <nav className="space-y-2 p-2">
        {filteredMenuItems.map((item) => (
           <Link key={item.href} href={item.href}>
             <Button
               variant={pathname === item.href ? "secondary" : "ghost"}
      className={`w-full justify-start my-1 ${
        isCollapsed ? "px-2" : "px-4"
               }`}
             >
               <item.icon className="h-4 w-4" />
               {!isCollapsed && (
                 <span className="ml-2">
                   {item.label === "Procesos" ? (
                     <StyledBadge badgeContent={countJobs} color="error">
                       {item.label}
                     </StyledBadge>
                   ) : (
                     item.label
                   )}
                 </span>
               )}
             </Button>
           </Link>
          ))}


          <Button
            variant="ghost"
            className={`w-full justify-start ${isCollapsed ? "px-2" : "px-4"}`}
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Salir</span>}
          </Button>
        </nav>
      </aside>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden absolute left-4 top-4"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-gray-800 text-white p-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <Package className="h-6 w-6" />
                <span className="text-xl font-bold">Mi Empresa</span>
              </Link>
            </div>
            <nav className="space-y-2 p-2">
              {filteredMenuItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              ))}
              <Button
                variant="ghost"
                className="w-full justify-start px-4"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </Button>
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <main className="flex-1 overflow-auto p-4">{children}</main>
    </div>
  );
}