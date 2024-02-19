import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
const authOptions = {
  providers: [
    GithubProvider({
      clientId: 'Iv1.4e2127ad44d30167',
      clientSecret: 'd045e5181c76db021aa82df573c1b1a8fc938d0c',
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user.username = session?.user?.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();

        session.user.uid = token.sub

        return session
    },
  },
  secret: 'default_secret_key',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };