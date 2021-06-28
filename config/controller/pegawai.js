const model = require('../model/index');
const controller = {};

controller.getAll = async function (req, res) {
    try {
        const pegawai = await model.pegawai.findAll()
        if (pegawai.length > 0) {
            res.status(200).json({
                message: 'Get Method pegawai',
                data: pegawai
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
        const pegawai = await model.pegawai.findAll({
            where: {
                _id: req.params._id
            }
        })
        if (pegawai.length > 0) {
            res.status(200).json({
                message: 'Get Method pegawai',
                data: pegawai
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

controller.postPegawai = async function (req, res) {
    try {
        const pegawai = await model.pegawai.create({
            _id: req.body._id,
            nama: req.body.nama,
            jenis_kel: req.body.jenis_kel,
            departemen: req.body.departemen,
            jabatan: req.body.jabatan
        })
        res.status(201).json({
            message: "pegawai berhasil ditambahkan",
            data: pegawai
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    };
};

controller.updatePegawai = async function (req, res) {
    try {
        const pegawai = await model.pegawai.update({
            nama: req.body.nama,
            departemen: req.body.departemen,
            jabatan: req.body.jabatan
        }, {
            where: {
                _id: req.params._id
            }
        })
        res.status(200).json({
            message: "Pegawai berhasil di update",
            data: pegawai
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
};

controller.deletePegawai = async function (req, res) {
    try {
        const pegawai = await model.pegawai.destroy({
            where: {
                _id: req.params._id
            }
        })
        res.status(200).json({
            message: "Pegawai berhasil di delete",
            data: pegawai
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
};

module.exports = controller;