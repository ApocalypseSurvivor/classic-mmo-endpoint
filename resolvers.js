import { AuthenticationError, UserInputError } from "apollo-server-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const SECRET_KEY = "your_secret_key";

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    characters: async (_, args, { db, user }) => {
      if (!user) {
        throw new AuthenticationError("UNAUTHENTICATED");
      }

      try {
        const characters = await db.all(
          'SELECT character_id AS id, name, "fake" as model FROM characters WHERE user_id = ?',
          [user.id]
        );

        return characters;
      } catch (error) {
        console.log("Error fetching characters: " + error.message);
        return [];
      }
    },
  }, //  Query

  Mutation: {
    signUp: async (_, { username, password, email }, { db }) => {
      const user = await db.get("SELECT * FROM users WHERE username = ?", [
        username,
      ]);

      if (!!user) {
        return { token: null };
      } // user Exists

      const hashedPassword = bcrypt.hashSync(password, 8);

      await db.run(
        "INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)",
        [username, hashedPassword, email]
      ); //  this could fail ... needs a try

      const result = await db.get("SELECT last_insert_rowid() as user_id");
      const user_id = result.user_id;

      const token = jwt.sign({ id: user_id }, SECRET_KEY, {
        expiresIn: 86400,
      }); // 24 hours

      return { token };
    }, //  signUp

    signIn: async (_, { username, password }, { db }) => {
      const user = await db.get("SELECT * FROM users WHERE username = ?", [
        username,
      ]);

      if (!user) {
        throw new UserInputError("Invalid username or password");
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password_hash);

      if (!passwordIsValid) {
        throw new UserInputError("Invalid username or password");
      }

      const token = jwt.sign({ id: user.user_id }, SECRET_KEY, {
        expiresIn: 86400,
      }); // 24 hours   //  expiresIn: 300,

      return { token };
    }, //  signIn
  }, //  Mutation
};

export default resolvers;
