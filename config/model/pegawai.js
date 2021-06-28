const sequelize = require('sequelize');
const db = require('../database/mariadb');

const pegawai = db.define('pegawai',{
    _id: sequelize.INTEGER,
    nama: sequelize.STRING,
    jenis_kel: sequelize.STRING,
    departement: sequelize.STRING,
    jabatan: sequelize.STRING
},{
    freezeTableName: true,
    timestamps: false
});
pegawai.removeAttribute('id');
module.exports = pegawai;