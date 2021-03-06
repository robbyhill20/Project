const Sequelize = require('sequelize')
require('dotenv').config();

let sequelize;
if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME ||
    process.env.DB_Password,
    {
     host: process.env.HOST ||'localhost',
      dialect: 'mysql',
      port: process.env.PORT || 3000
    }
  );
}

module.exports = sequelize;
