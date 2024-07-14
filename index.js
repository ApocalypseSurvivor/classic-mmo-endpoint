import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";
import openDb from "./db.js";
import authenticateJWT from "./authenticateJWT.js"; // Import the JWT middleware

const app = express();
const httpServer = http.createServer(app);
const db = await openDb();

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

// Apply middleware
app.use(
  cors(),
  bodyParser.json(),
  authenticateJWT,
  expressMiddleware(server, {
    context: async ({ req }) => {
      const user = req.user || null; // Extract user from request if available
      return { db, user };
    },
  })
);

// Start the server
await new Promise((resolve) => httpServer.listen({ port: 4444 }, resolve));
console.log(`🚀 Server ready at http://localhost:4444`);
