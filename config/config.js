import dotenv from "dotenv";

const env = dotenv.config().parsed;

export default {
  development: {
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    host: env.DB_HOST,
    dialect: "mysql",
  },
};
