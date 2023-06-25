import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import User from "@server/models/user";
import connectToDB from "@server/database";
import { signIn } from "next-auth/react";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // KakaoProvider({
    //   clientId: process.env.KAKAO_CLIENT_ID || "",
    //   clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        // email,
        // username,
        // password,
        // isSignup,
        // redirect: true,
        // callbackUrl: "/components",

        const { email, username, password, isSignup } = credentials as any;
        // const res = await fetch("/your/endpoint", {
        //   method: "POST",
        //   body: JSON.stringify({
        //     username,
        //     password,
        //   }),
        //   headers: { "Content-Type": "application/json" },
        // });
        await connectToDB();

        const res = await User.findOne({ email });

        if (isSignup && !res) {
          const newUser = await User.create({
            email,
            username,
            password,
          });
          console.log("i am here ??", newUser);

          return newUser;
        } else {
          // const mockUser = {
          //   id: 1,
          //   name: username,
          //   email: "naminwoo8@gmail.com",
          //   accessToken: "accessToken bro !",
          //   ok: true,
          // };
          if (res != null) {
            const user = JSON.parse(JSON.stringify(res));
            // console.log("i am here ??", user);
            // const user = await res.json();

            console.log("i am here ??", user);
            return user;
            // If no error and we have user data, return it
            // if (res.ok && user) {
            //   return user;
            // }
            // Return null if user data could not be retrieved
            return null;
          } else {
            throw new Error("no user found!");
          }
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  // signIn: string
  // signOut: string
  // /** Error code passed in query string as ?error= */
  // error: string
  // verifyRequest: string
  // /** If set, new users will be directed here on first sign in */
  // newUser: string
  pages: {
    //customize login UI with route
    signIn: "/auth/signIn",
    // signOut: "/auth/signout",
    // newUser: "/auth/signUp",
  },
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }

      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // store the user id from MongoDB to session
      await connectToDB();
      if (session?.user?.email != null) {
        const sessionUser = await User.findOne({ email: session.user.email });
        if (sessionUser != null) {
          session.user = token;
          return session;
        }
      }
      throw Error("session is not existing");
    },
    //authorize -> signIn as user ?
    async signIn({ account, profile, user, credentials }) {
      try {
        const data = credentials;

        console.log("i am here 3??", data);

        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({
          email: profile?.email || user.email,
        });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            // image: profile?.picture!,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
