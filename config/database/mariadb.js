const sequelize = require('sequelize');
const db = new sequelize('todo_pegawai', 'root', '',{
    dialect: 'mysql',
    host: 'localhost'
});
console.log("koneksi berhasil");

module.exports = db;