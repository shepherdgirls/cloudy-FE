// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;  // GitHub 토큰 저장
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;  // 클라이언트에서 accessToken 접근 가능
      return session;
    },
  },
});

export { handler as GET, handler as POST };