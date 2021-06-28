const express = require('express');
const app = express();  
const sequelize = require('sequelize');

const router = express.Router();
// const db = require('./config/database/mariadb')
const model =require('./config/model')
const morgan = require('morgan');
const { body, validationResult, check } = require('express-validator');
const bodyParser = require('body-parser');
const {connect} = require('./config/database/mariadb');
const expressLayouts = require('express-ejs-layouts');


const homeRouter =require('./routes/home')
const pegawaiRouter = require('./routes/pegawai');
const tugasRouter = require('./routes/tugas');

// menggunakan ejs
const ejs = require('ejs');
const db = require('./config/database/mariadb');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/pegawai', pegawaiRouter);
app.use('/tugas', tugasRouter);
app.use('/home', homeRouter)



router.get('/pegawai/:id', async (req, res) => {
    const pegawai = await model.pegawai.findAll({
        where: {
            _id: req.params.id
        }
    })
    console.log(pegawai);
    const tugas = await model.tugas.findAll({
        where: {
            id_pegawai : req.params.id
        }
    })
    res.render('tugas', {
        layout: 'layouts/main-layouts',
        title: 'halaman addPegawai',
        tugas: tugas,
        id_pegawai: req.params.id
    });
});

router.get('/laporan', async (req, res, next) => {
    const tugas = await model.tugas.findAll()
    res.render('laporan', {
        layout: 'layouts/main-layouts',
        title: 'halaman dataTodo',
        nama: 'Rahmad Nasution',
        tugas: tugas
    });
});

router.post('/tugas/add', async (req, res, next) => {
    await model.tugas.create({
        _id: req.body._id,
        nama_tugas: req.body.nama_tugas,
        tanggal: req.body.tanggal,
        status: req.body.status,
        id_pegawai: req.body.id_pegawai
    })
    res.redirect('/pegawai/'+ req.body.id_pegawai);
}
);

router.get('/tugas/add/:id_pegawai', async (req, res, next) => {
    res.render('addTodo', {
        title: 'Form Tambah Todo Pegawai',
        layout: 'layouts/main-layouts',
        id_pegawai: req.params.id_pegawai
    })
})

router.get('/tugas/edit/:id', async (req, res) => {
    const tugas = await model.tugas.findAll({
        where: {
            _id: req.params.id
        }
    })
    res.render('editTodo', {
        layout: 'layouts/main-layouts',
        title: 'halaman editPegawai',
        tugas: tugas[0].dataValues
    });
    console.log(tugas);
});

router.post('/tugas/update/:id',
    async (req, res, next) => {
        await model.tugas.update({
            nama_tugas: req.body.nama_tugas,
            tanggal: req.body.tanggal,
            status: req.body.status,
            id_pegawai: req.body.id_pegawai
        }, {
            where: {
                _id: req.params.id
            }
        })
        res.redirect('/pegawai/'+ req.body.id_pegawai);
    }
);

router.get('/tugas/delete/:id_pegawai/:id', async (req, res, next) => {
    await model.tugas.destroy({
        where: {
            _id: req.params.id
        }
    })
    res.redirect('/pegawai/'+ req.params.id_pegawai);
})

// router.get('/test/transaction', async (req, res, next) => {
//     // console.log(sequelize);
//     try {
//     await db.transaction(function(t){
//         return model.pegawai.create({
//             nama: 'Rahmad Nasution',
//             jenis_kel: 'laki-laki',
//             departement: 'Rahmadnet',
//             jabatan: 'Founder'
//         }, {transaction: t}).then(function (pegawai){
//             return model.tugas.create({
//                 nama_tugas: 'check gudang',
//                 tanggal: '2021/06/26',
//                 status: 'rutin',
//                 id_pegawai: pegawai.id
//             },{transaction: t})
//         })
//      })
//     } catch (e) {
//         console.log(e);
//     }
     
    
// })






app.use("/", router)

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req,res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
})

module.exports=app;