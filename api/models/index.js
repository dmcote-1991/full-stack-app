'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
// Creates Sequelize instance based on config settings
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Reads all files in current directory synchronously
fs
  .readdirSync(__dirname)
  .filter(file => {
    // Filters out non-JavaScript files and test files
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    // Imports Sequelize model from file and adds to 'db' object
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Associates Sequelize models if an 'associate' method is defined
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Attaches Sequelize instance and Sequelize module to 'db' object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Exports the 'db' object containing Sequelize models and instance
module.exports = db;