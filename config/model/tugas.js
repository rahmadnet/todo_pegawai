const sequelize = require('sequelize');
const db = require('../database/mariadb');

const tugas = db.define('tugas',{
    _id: sequelize.INTEGER,
    nama_tugas: sequelize.STRING,
    tanggal: sequelize.DATE,
    status: sequelize.STRING,
    id_pegawai: sequelize.STRING
},{
    freezeTableName: true,
    timestamps: false
});
tugas.removeAttribute('id');
module.exports = tugas;