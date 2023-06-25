import { hush, hashPassword, comparePassword, generateToken } from "@utils";
import { User } from "@types";

export const resolvers = {
  Query: {
    currentUser: async (_: any, __: any, ctx: any) => {
      const user = ctx.user;
      if (user) {
        return user;
      }
      throw new Error("User not authenticated.");
    },
  },

  Mutation: {
    signUp: async (_: any, { email, password }: any, { db }: any) => {
      const hashedPassword = hashPassword(password);
      const newUser = {
        email,
        password: hashedPassword,
      };

      const { ops } = await db.collection("users").insertOne(newUser);
      const user = User.decode(ops[0]);
      const result = hush(user);
      if (result != null) {
        return result;
      }
    },

    signIn: async (_: any, { email, password }: any, { db }: any) => {
      const foundUser = await db.collection("users").findOne({ email });
      if (!foundUser) {
        throw new Error("User not found.");
      }

      const isValidPassword = comparePassword(password, foundUser.password);
      if (!isValidPassword) {
        throw new Error("Invalid password.");
      }

      const token = generateToken(foundUser);
      return token;
    },
  },
};
