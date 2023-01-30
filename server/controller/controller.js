const data = require('../models/datas')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.findAll = (req, res) => {

    data.findAll()
    .then((data) => {
        res.json(data)
    })
}

exports.signup = (req, res, next) => {
    data.findOne({where: {email: req.body.email}})
    .then(user => {
        if(user){
            return res.status(409).json({alert: 'Email sudah dipakai'})
        }else if( req.body.sPassword && req.body.email && req.body.sNik && req.body.sNamaLengkap){
            bcrypt.hash(req.body.sPassword, 12, (err, passwordHash) => {
                if(err){
                    return res.status(500).json({alert: 'Gagal membuat akun coba lagi'})
                } else if(passwordHash){
                    return data.create(({
                        email : req.body.email,
                        password : passwordHash,
                        nik : req.body.sNik,
                        namalengkap: req.body.sNamaLengkap
                    }))
                    .then(() => {
                        res.status(200).json({alert: 'Berhasil membuat akun'})
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(502).json({alert: 'Gagal membuat akun coba lagi'})
                    })
                }
            })
        } else if (!req.body.email || !req.body.password || !req.body.nik || !req.body.namalengkap){
            return res.status(400).json({alert: 'Tolong lengkapi data anda'})
        }
    })
    .catch(err => {
        console.log('error' ,err)
    })
}