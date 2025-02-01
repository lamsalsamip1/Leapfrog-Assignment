import { Sequelize } from "sequelize";

// connect to mysql database

const database = process.env.DB_NAME || "notes";
const username = process.env.DB_USER;
const password = process.env.DB_PASS;

const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "mysql",
  logging: console.log,
});

export default sequelize;

// test the connection
// async function testConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// }

// testConnection();
