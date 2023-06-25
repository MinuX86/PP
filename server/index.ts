import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import connectToDB from "./database";

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const db = await connectToDB();

  const { url } = await startStandaloneServer(server, {
    context: async () => {
      db;
    },
  });

  console.log(`
    🚀  Server is running
    📭  Query at ${url}
  `);
}

startApolloServer();
