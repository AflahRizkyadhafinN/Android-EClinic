
const Sequelize = require("sequelize");
const sequelize = require("./connection.js");

console.log

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
        password: {
            type: Sequelize.STRING
        },
        nik: {
            type: Sequelize.NUMBER
        },
        namalengkap:{
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        nik: {
            type: Sequelize.NUMBER
        },
        namalengkap:{
            type: Sequelize.STRING
        },
        
    },
    {
        timestamps: false
    })


