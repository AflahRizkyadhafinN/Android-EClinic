
const Sequelize = require("sequelize");
const sequelize = require("./connection.js");

module.exports = sequelize.define('userdata', {
        pasen_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        kode_pasen: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING(30)
        },
        password: {
            type: Sequelize.STRING
        },
        nik: {
            type: Sequelize.NUMERIC(16)
        },
        namalengkap:{
            type: Sequelize.STRING(50)
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
            type: Sequelize.NUMERIC(5, 0)
        },
        rt: {
            type: Sequelize.NUMERIC(5, 0)
        },
        kodepos: {
            type: Sequelize.NUMERIC
        },
        kodewilayah:{
            type: Sequelize.STRING(10)
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


