export interface AuthResponse {
    access_token: string;
    user: User;
}

interface User {
    _id: object;
    name: string;
    lastName: string;
    email: string;
    rol: string;
    createdAt?: string;
  }
  
  