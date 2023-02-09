
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
        password: {
            type: Sequelize.STRING
        },
        nik: {
            type: Sequelize.NUMBER
        },
        namalengkap:{
            type: Sequelize.STRING
        },
        golongandarah: {
            type: Sequelize.STRING
        },
        tempatlahir: {
            type: Sequelize.STRING
        },
        tanggallahir: {
            type: Sequelize.DATEONLY
        },
        alamat:{
            type: Sequelize.STRING
        },
        rw: {
            type: Sequelize.STRING
        },
        rt: {
            type: Sequelize.STRING
        },
        kodepos: {
            type: Sequelize.NUMBER
        },
        kodewilayah:{
            type: Sequelize.STRING
        },
        jeniskelamin: {
            type: Sequelize.STRING
        },
        pekerjaan:{
            type: Sequelize.STRING
        },
        accesstoken:{
            type: Sequelize.STRING
        },
        
    },
    {
        timestamps: false
    })


