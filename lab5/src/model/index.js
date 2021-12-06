const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
  }
);

const models = fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .reduce((accum, file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);

    return {
      ...accum,
      [model.name]: model,
    };
  }, {});

module.exports = {
  ...models,
  sequelize,
};
