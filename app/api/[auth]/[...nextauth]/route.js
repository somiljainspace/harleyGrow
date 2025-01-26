import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

// Dummy users array (replace with a database call)
const users = [
  { id: 1, email: "admin@example.com", password: bcrypt.hashSync("admin123", 10), role: "Admin" },
  { id: 2, email: "editor@example.com", password: bcrypt.hashSync("editor123", 10), role: "Editor" },
  { id: 3, email: "viewer@example.com", password: bcrypt.hashSync("viewer123", 10), role: "Viewer" },
];

// NextAuth configuration
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = users.find((u) => u.email === credentials.email);
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return { id: user.id, email: user.email, role: user.role };
        }
        return null; // Return null if user is not found
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
  session: {
    strategy: "jwt",
  },
};

// Use the new route handler export format for Next.js 13
export const GET = (req, res) => NextAuth(req, res, authOptions);
export const POST = (req, res) => NextAuth(req, res, authOptions);
