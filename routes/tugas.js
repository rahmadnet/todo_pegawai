const express = require('express');
const router = express.Router();
const db = require('../config/database/mariadb');
const controller = require('../config/controller/index');

router.get('/', controller.tugas.getAll);
router.get('/:_id', controller.tugas.getById);
router.post('/', controller.tugas.postTugas);
router.patch('/:_id', controller.tugas.updateTugas);
router.delete('/:_id', controller.tugas.deleteTugas);


module.exports = router;