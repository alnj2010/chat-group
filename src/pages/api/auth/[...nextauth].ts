import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCredentialsByEmail } from "@/lib/db";
import { createHash } from "node:crypto";

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
        if (credentials) {
          const user = await getCredentialsByEmail(credentials.email);
          if (!user) return null;

          if (
            createHash("sha256").update(credentials.password).digest("hex") !==
            user.password
          ) {
            return null;
          }

          return user;
        } else {
          return null;
        }
      },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
