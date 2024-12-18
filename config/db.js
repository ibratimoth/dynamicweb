const { Sequelize } = require('sequelize');
const dotenv = require("dotenv");
dotenv.config()

const sequelize = new Sequelize(process.env.URI, {
  dialect: 'postgres', // Explicitly provide the dialect
}) // Example for postgres

const connectionDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connection has been established successfully.`.bgMagenta.white);
    await sequelize.sync({ alter: true })
    console.log(`Dtabase synced`.bgMagenta.white)
  } catch (error) {
    console.error(`Unable to connect to the database:`.bgRed.white, error);
  }
}

module.exports = { connectionDB, sequelize }