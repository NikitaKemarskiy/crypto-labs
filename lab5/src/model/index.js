const fs = require('fs');
const path = require('path');
const config = require('config');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);

const sequelize = new Sequelize(
  config.db.name,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect,
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
