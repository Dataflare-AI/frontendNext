import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {},
};

const authHandler = NextAuth(authOptions);
export default async function handler(...params: any[]) {
  await authHandler(...params);
}
