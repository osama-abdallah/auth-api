'use strict';

const Foods =(sequelize ,DataTypes) =>
    sequelize.define('foods',{
        foodName :{
            type : DataTypes.STRING,
            allowNull :false
        },
        cusine : {
            type :DataTypes.STRING,

        }
    });

module.exports =Foods;