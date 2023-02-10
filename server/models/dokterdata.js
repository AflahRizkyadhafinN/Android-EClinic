
const Sequelize = require("sequelize");
const sequelize = require("./connection.js");

module.exports = sequelize.define('userdata', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        email: {
            type: Sequelize.STRING
        },
        
    },
    {
        timestamps: false
    })


