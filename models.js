const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  db: "./db.seqlite"
});

const User = sequelize.define("User", {
  name: Sequelize.STRING
});

module.exports = {
  Sequelize,
  sequelize,
  User
};
