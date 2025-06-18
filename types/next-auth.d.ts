import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string | null
    address?: string | null
  }

  interface Session extends DefaultSession {
    user: User
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role?: string | null
    address?: string | null
  }
}