import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { authorizeCredentials } from "@/lib/authorizers";
import DBError from "@/errors/db-error";
import AuthorizeError from "@/errors/authorize-error";

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
      async authorize(body) {
        const credentials = {
          email: body?.email ?? "",
          password: body?.password ?? "",
        };
        try {
          const user = await authorizeCredentials(credentials);
          return user;
        } catch (error) {
          if (error instanceof DBError || error instanceof AuthorizeError) {
            return null;
          } else {
            throw error;
          }
        }
      },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
