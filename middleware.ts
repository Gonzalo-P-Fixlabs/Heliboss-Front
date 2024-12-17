import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  async function middleware(req: NextRequest) {
    // Obtén el token usando getToken, pasando el request y configurando la secret
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const currentPath = req.nextUrl.pathname;
    // // Verifica si la URL contiene 'users' y si el rol no es 'Admin'
    if (currentPath.includes("users") && token?.rol !== "admin") {
      // Si no es admin, redirige a la página de inicio
      return NextResponse.redirect(new URL("/dashboard/productos", req.url));
    }
    // Si el token no está presente o no es válido, redirige a la página de login
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login", // Redirige aquí si no está autenticado
    },

    callbacks: {
      authorized: ({ req }) => {
        // verify token and return a boolean
        const sessionToken = req.cookies.get("next-auth.session-token");
        //console.log(token);
        if (sessionToken) return true;
        else return false;
      },
    },
  }
);

export const config = { matcher: ["/dashboard/:path*"] };