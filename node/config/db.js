const { Sequelize } = require('sequelize');
const postgres = require('postgres');

const connectionString = process.env.DB_URL
const sql = postgres(connectionString);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_NAME, process.env.DB_PASSWORD {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,
  }
);

sequelize.authenticate().then(() => {
  console.log("Database connection established!");
}).catch((error) => {
  console.error("Unable to connect to Database: ", error);
});
