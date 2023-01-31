const data = require('../models/datas')
const passport = require('passport')
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

exports.login = (req, res, next) => {
    data.findOne({where: {nik: req.body.nik}})
    .then(nik => {

        if(req.body.remember){
            if(nik){
                bcrypt.compare(req.body.pass, nik.password, (err, passwordHash) => {
                    if(passwordHash){
                        data.max('id')
                        .then(id => {
                            const token = jwt.sign({ email: req.body.nik }, 'secret',{ algorithm: "HS256" }, { expiresIn: '1h' });
                            res.status(200).json({alert: 'Login Berhasil',id: id, message: nik.namalengkap, token: token})
                        })
                        
                    } else{
                        res.status(404).json({alert: 'Password Salah'})
                    }
                
                })
            }
            else{
                res.status(404).json({alert: 'Nik Tidak Terdaftar, Register Sekarang!'})
            }
        }
        else{
            if(nik){
                bcrypt.compare(req.body.pass, nik.password, (err, passwordHash) => {
                    if(passwordHash){
                        data.max('id')
                        .then(id => {
                            const token = jwt.sign({ email: req.body.nik }, 'secret',{ algorithm: "HS256" }, { expiresIn: '1h' });
                            res.status(200).json({alert: 'Login Berhasil',id: id, message: nik.namalengkap, token: token})
                        })
                    } else{
                        res.status(404).json({alert: 'Password Salah'})
                    }
                
                })
            }
            else{
                res.status(404).json({alert: 'Nik Tidak Terdaftar, Register Sekarang!'})
            }
        }
        
    })
}

exports.auth = (req, res, next) => {
    const authHeader = req.get('Authorization')
    if(!authHeader){
        return res.status(401).json({alert: 'Authentication Gagal'})
    } 
    const token = authHeader.split(' ')[1]
    let decodedToken
    try {
        decodedToken = jwt.verify(token, 'secret')
    } 
    catch(err){
        return res.status(500).json({alert: 'Gagal Coba Lagi Nanti'})
    }
    if(!decodedToken){
        res.status(401).json({alert: 'Unauthorized'})
    }
    else{
        res.status(200).json({alert: 'Login Berhasil'})
    }
}