import { db } from "@/lib/db";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: "/",
    //signOut: "/auth/signout",
    //error: "/auth/error", // Error code passed in query string as ?error=
    //verifyRequest: "/auth/verify-request", // (used for check email message)
    //newUser: "/register", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        let user;
        if (credentials) {
          user = {
            id: "1",
            email: credentials.email,
            password: credentials.password,
          };
        }

        // If no error and we have user data, return it
        if (user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
