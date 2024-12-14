import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '../../../lib/prisma';
import { ethers } from 'ethers';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { tags: true },
        });

        if (!user) {
          // Create new user if they don't exist
          const newUser = await prisma.user.create({
            data: {
              email: credentials.email,
              password: credentials.password, // In production, hash this password
              name: credentials.email.split('@')[0], // Default name from email
              userType: 'CONSUMER',
            },
          });
          return {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            userType: newUser.userType,
          };
        }

        // In production, add proper password hashing
        if (credentials.password !== user.password) {
          throw new Error('Invalid credentials');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          userType: user.userType,
        };
      },
    }),
    CredentialsProvider({
      id: 'ethereum',
      name: 'Ethereum',
      credentials: {
        address: { label: 'Address', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.address) {
          throw new Error('No wallet address provided');
        }

        const address = ethers.utils.getAddress(credentials.address); // Checksum address
        
        let user = await prisma.user.findFirst({
          where: { walletAddress: address },
          include: { tags: true },
        });

        if (!user) {
          // Create new user if they don't exist
          user = await prisma.user.create({
            data: {
              walletAddress: address,
              name: `${address.substring(0, 6)}...${address.substring(38)}`,
              userType: 'CONSUMER',
            },
          });
        }

        return {
          id: user.id,
          address: user.walletAddress,
          name: user.name,
          userType: user.userType,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userType = user.userType;
        token.email = user.email;
        token.name = user.name;
        token.walletAddress = user.walletAddress;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.userType = token.userType as string;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.walletAddress = token.walletAddress as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);