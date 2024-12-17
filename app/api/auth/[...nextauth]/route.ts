import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { BACKEND_URL } from "@/app/api/common/app.api";


const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Por favor, ingresa email y contraseña");
        }
          const url= `${BACKEND_URL}/user/authLogin`
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const data = await res.json();

        if (res.ok && data) {
          // Retorna tanto el user como el token
          return {
            ...data.user, // id, email, name
            access_token: data.access_token,
          };
        }

        throw new Error("Credenciales inválidas");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Si el usuario inicia sesión, agrega los datos del usuario y el token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.rol = user.rol;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.access_token = (user as any).access_token; // Incluye el access_token
      }

      return token;
    },
    async session({ session, token }) {
      // Propaga los datos del token a la sesión
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          rol: token.rol as string,
        };
        session.access_token = token.access_token as string; // Incluye el access_token en la sesión
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };