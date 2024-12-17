"use client";
import "./globals.css";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import React from "react";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Heliboss</title>
        {/* Cambia "Mi Página" por el nombre que quieras */}
        <meta name="description" content="panel de administracion" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <Toaster richColors />
            {children}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}