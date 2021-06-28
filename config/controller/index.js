const pegawai = require('./pegawai');
const tugas = require('./tugas');
const controller = {};

controller.pegawai = pegawai;
controller.tugas = tugas;

module.exports = controller;