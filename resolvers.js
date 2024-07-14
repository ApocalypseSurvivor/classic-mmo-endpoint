import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const SECRET_KEY = "your_secret_key";

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    beans: async (_, { token }, { db, user }) => {
      if (!token) {
        console.log("beans saw no token");
        return null;
      }

      console.log(JSON.stringify(user));
      const data = await db.get("SELECT * FROM users WHERE id = ?", [user.id]);

      console.log(JSON.stringify(data));
      return JSON.stringify(data);
    }, //  beans
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
        return { token: null };
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password_hash);

      if (!passwordIsValid) {
        return { token: null };
      }

      const token = jwt.sign({ id: user.user_id }, SECRET_KEY, {
        expiresIn: 86400,
      }); // 24 hours

      return { token }; //  res.status(200).send({ auth: true, token });
    }, //  signIn
  }, //  Mutation
};

export default resolvers;
