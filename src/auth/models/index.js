"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const Foods = require("./food");
const Clothes = require("./clothes");
require("dotenv").config();
const Collection = require('./Collection-class')
const Users = require('./users-model')

const SECRET = process.env.SECRET;

const DATABASE_URL =
  process.env.NODE_ENV == "test" ? "sqlite:memory" : process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? { dialectOptions: { ssl: { require: true, rejectUnauthorized: false } } }
    : {};

let sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);


let foodMod = Foods(sequelize, DataTypes);
let foodCollect = new Collection(foodMod);

let clothesMod = Clothes(sequelize, DataTypes);
let clothesCollect = new Collection(clothesMod)

module.exports = {
  db: sequelize,
  foods: foodCollect,
  clothes: clothesCollect,
  Users: Users(sequelize, DataTypes)
};
