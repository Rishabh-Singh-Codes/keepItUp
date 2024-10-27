import GoogleProvider from "next-auth/providers/google";
import db from "@/db";
import { Account, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface ExtendedSession extends Session {
  user: {
    username: string;
    email: string;
    profilePicture: string;
    uid: string;
  };
}

export const authConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    session: ({ session, token }: {session: Session, token: JWT}): ExtendedSession => {
      const newSession = session as ExtendedSession;
      if (newSession.user && token.uid) {
        newSession.user.uid = token.uid as string;
      }

      return newSession;
    },
    async jwt({ token, account }: { token: JWT, account: Account | null }) {
      if(account) {
        const userExists = await db.user.findFirst({
          where: {
            providerAccountId: account.providerAccountId,
          },
        });
  
        if (userExists) {
          token.uid = userExists.id;
        }
      }

      return token;
    },
    async signIn({ user, account }: { user: User, account: Account | null }) {
      try {
        if (account?.provider === "google") {
          const { name, email } = user;
  
          if (!email) {
            return false;
          }
  
          const userExists = await db.user.findFirst({
            where: {
              providerAccountId: account.providerAccountId,
              email,
            },
          });
  
          if (userExists) {
            return true;
          }
  
          await db.user.create({
            data: {
              username: name ?? "",
              email: email,
              provider: "Google",
              profilePicture: user.image ?? "",
              providerAccountId: account.providerAccountId,
            },
          });
  
          return true;
        }
      } catch (error) {
        console.log('error in signIn callback', error);
        return false;
      }

      return false;
    },
  },
};
