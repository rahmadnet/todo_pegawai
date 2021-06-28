const model = require('../model/index');
const controller = {};

controller.getAll = async function (req, res) {
    try {
        const tugas = await model.tugas.findAll()
        if (tugas.length > 0) {
            res.status(200).json({
                message: 'Get Method tugas',
                data: tugas
            })
        } else {
            res.status(200).json({
                message: 'Tidak ada data',
                data: []
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
};

controller.getById = async function (req, res) {
    try {
        const tugas = await model.tugas.findAll({
            where: {
                _id: req.params._id
            }
        })
        if (tugas.length > 0) {
            res.status(200).json({
                message: 'Get Method tugas',
                data: tugas
            })
        } else {
            res.status(200).json({
                message: 'Tidak ada data',
                data: []
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
};

controller.postTugas = async function (req, res) {
    try {
        const tugas = await model.tugas.create({
            _id: req.body._id,
            nama_tugas: req.body.nama_tugas,
            tanggal: req.body.tanggal,
            status: req.body.status,
            id_pegawai: req.body.id_pegawai
        })
        res.status(201).json({
            message: "tugas berhasil ditambahkan",
            data: tugas
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    };
};

controller.updateTugas = async function (req, res) {
    try {
        const tugas = await model.tugas.update({
            nama_tugas: req.body.nama_tugas,
            status: req.body.status,
        }, {
            where: {
                _id: req.params._id
            }
        })
        res.status(200).json({
            message: "Tugas berhasil di update",
            data: tugas
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
};

controller.deleteTugas = async function (req, res) {
    try {
        const tugas = await model.tugas.destroy({
            where: {
                _id: req.params._id
            }
        })
        res.status(200).json({
            message: "Tugas berhasil di delete",
            data: tugas
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
};



module.exports = controller;