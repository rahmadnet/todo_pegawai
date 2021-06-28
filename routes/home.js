const express = require('express');
const app = express();
const router = express.Router();
// const db = require('./config/database/mariadb')
const model = require('../config/model')
const morgan = require('morgan');
const {
    body,
    validationResult,
    check
} = require('express-validator');
const bodyParser = require('body-parser');
const {
    connect
} = require('../config/database/mariadb');
const expressLayouts = require('express-ejs-layouts');

// menggunakan ejs
const ejs = require('ejs');
const db = require('../config/database/mariadb');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(
    express.urlencoded({
        extended: true,
    })
);

router.get('/add', async (req, res) => {
    res.render('addPegawai', {
        layout: 'layouts/main-layouts',
        title: 'halaman addPegawai',
    });
});
router.get('/', async (req, res, next) => {
    res.render('home', {
        layout: 'layouts/main-layouts',
        title: 'halaman dataPegawai',
        nama: 'Rahmad Nasution',
        pegawai: await model.pegawai.findAll()
    });
});

router.post('/add', async (req, res, next) => {
    await model.pegawai.create({
        _id: req.body._id,
        nama: req.body.nama,
        jenis_kel: req.body.jenis_kel,
        departement: req.body.departement,
        jabatan: req.body.jabatan
    })
    if(req.body.nama){
        res.redirect('/home');
    }
        res.render('addPegawai', {
        title: 'Form Tambah Data Pegawai',
        layout: 'layouts/main-layouts',
    })
    
});

router.get('/edit/:id', async (req, res) => {
    const pegawai = await model.pegawai.findAll({
        where: {
            _id: req.params.id
        }
    })
    res.render('editPegawai', {
        layout: 'layouts/main-layouts',
        title: 'halaman editPegawai',
        pegawai: pegawai[0].dataValues
    });
    console.log(pegawai);
});

router.post('/update/:id',
    async (req, res, next) => {
        await model.pegawai.update({
            nama: req.body.nama,
            jenis_kel: req.body.jenis_kel,
            departement: req.body.departement,
            jabatan: req.body.jabatan
        }, {
            where: {
                _id: req.params.id
            }
        })
        res.redirect('/home');
    }
);

router.get('/delete/:id', async (req, res, next) => {
    await model.pegawai.destroy({
        where: {
            _id: req.params.id
        }
    })
    res.redirect('/home');
})

module.exports = router;