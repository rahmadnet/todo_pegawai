const express = require('express');
const router = express.Router();
const db = require('../config/database/mariadb');
const controller = require('../config/controller/index');

router.get('/', controller.pegawai.getAll);
// router.get('/:_id', controller.pegawai.getById);
router.post('/', controller.pegawai.postPegawai);
router.patch('/:_id', controller.pegawai.updatePegawai);
router.delete('/:_id', controller.pegawai.deletePegawai);




module.exports = router;