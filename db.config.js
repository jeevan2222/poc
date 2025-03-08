const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("myweeklyplan_dev", "postgres", "admin", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully."))
  .catch((error) => console.error("Database connection failed:", error));

module.exports = sequelize;
