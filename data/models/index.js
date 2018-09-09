'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require('../../config');

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
    config.get('db:database'),
    config.get('db:username'),
    config.get('db:password'),
    {
        host: config.get('db:host'),
        dialect: 'postgres',
        logging: config.get('NODE_ENV') !== 'production'
    }
);

fs
    .readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
    if (db[modelName].addScopes) {
        db[modelName].addScopes(db);
    }
});

sequelize.sync();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
