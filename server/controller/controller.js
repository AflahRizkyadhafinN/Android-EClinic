const data = require('../models/datas');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const crypto = require('crypto')
const secret_key = process.env.JWT_SECRET
const {wilayah} = require('../models/dokterdata');


exports.findAll = (req, res) => {
  data
    .max('kode_pasen')
    .then(id => {
      res.json({id: id});
    })
    .catch(err => {
      console.log('error', err);
    });
}; 
exports.wilayah = (req, res) => {
  const query = req.query.query
  wilayah.findAll().then(data => {
    if(isNaN(query) && query){
      let filterData = data.filter(item => item.nama.toLowerCase().includes(query.toLowerCase()))
      return res.json(filterData)
    }
    if(query){
      filterData = data.filter(item => item.kode_wilayah.includes(query))
      return res.json(filterData)
    }
      res.json(data)
    

  })
}
exports.signup = (req, res, next) => {
  if(isNaN(req.body.sNik)){
    return res.status(400).json({alert: 'NIK Harus Angka!'})
  }
  else{
    data
    .findOne({where: {email: req.body.email}})
    .then(async user => {
      if (user) {
        return await res.status(409).json({alert: 'Email sudah dipakai'});
      } else if (
        req.body.sPassword &&
        req.body.email &&
        req.body.sNik &&
        req.body.sNamaLengkap
      ) {
        bcrypt.hash(req.body.sPassword, 12, (err, passwordHash) => {
          if (err) {
            return res
              .status(500)
              .json({alert: 'Gagal membuat akun coba lagi'});
          } else if (passwordHash) {
            return data
              .create({
                email: req.body.email,
                password: passwordHash,
                nik: req.body.sNik,
                namalengkap: req.body.sNamaLengkap,
              })
              .then(() => {
                res.status(200).json({alert: 'Berhasil membuat akun'});
              })
              .catch(err => {
                console.log(err);
                res.status(502).json({alert: 'Gagal membuat akun coba lagi'});
              });
          }
        });
      } else if (
        !req.body.email ||
        !req.body.password ||
        !req.body.nik ||
        !req.body.namalengkap
      ) {
        return res.status(400).json({alert: 'Tolong lengkapi data anda'});
      }
    })
    .catch(err => {
      console.log('error', err);
    });
  }
  
};

exports.updatetoken = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({alert: 'Authentication Gagal'});
  }
  const gettoken = authHeader.split(' ')[1];
  data.findOne({where: {accesstoken: gettoken}}).then(data => {
    if (data) {
      let decodedToken;
      try {
        decodedToken = jwt.verify(gettoken, secret_key);
      } catch (err) {
        return res
          .status(500)
          .json({alert: 'Error token expired. Silahkan login kembali'});
      }
      if (!decodedToken) {
        res.status(401).json({alert: 'Unauthorized'});
      } else {
        const token = jwt.sign({nik: req.body.nik}, secret_key, {
          expiresIn: '30m',
        });
        if (token) {
          res.status(200).json({token: token});
        } else {
          return res.status(500).json({alert: 'Server error coba lagi nanti'});
        }
      }
    } else {
      res.status(404).json({alert: 'Akun terhubung pada perangkat lain'});
    }
  });
};

exports.update = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({alert: 'Authentication Gagal'});
  }
  const token = authHeader.split(' ')[1];
  data.findOne({where: {accesstoken: req.body.keyToken}}).then(data => {
    if (data) {
      let decodedToken;
      try {
        decodedToken = jwt.verify(token, secret_key);
      } catch (err) {
        return res.status(500).json({alert: 'Error token expired.'});
      }
      if (!decodedToken) {
        res.status(401).json({alert: 'Unauthorized'});
      } else {
        if (
          !req.body.email ||
          !req.body.namalengkap ||
          !req.body.tanggalLahir ||
          !req.body.pekerjaan ||
          !req.body.golongandarah ||
          !req.body.rw ||
          !req.body.rt ||
          !req.body.alamat ||
          !req.body.jeniskelamin ||
          !req.body.kodewilayah ||
          !req.body.kodepos ||
          !req.body.tempatLahir
        ) {
          return res.status(400).json({alert: 'Tolong lengkapi data anda'});
        } else {
          data
            .update(
              {
                namalengkap: req.body.namalengkap,
                email: req.body.email,
                tanggallahir: req.body.tanggalLahir,
                tempatlahir: req.body.tempatLahir,
                pekerjaan: req.body.pekerjaan,
                golongandarah: req.body.golongandarah,
                rt: req.body.rt,
                rw: req.body.rw,
                alamat: req.body.alamat,
                jeniskelamin: req.body.jeniskelamin,
                kodepos: req.body.kodepos,
                kodewilayah: req.body.kodewilayah,
              },
              {
                where: {
                  kode_pasen: req.body.id,
                },
              },
            )
            .then(() => {
              res.status(200).json({alert: 'Berhasil merubah data'});
            });
        }
      }
    } else {
      res.status(404).json({alert: 'Akun terhubung pada perangkat lain'})
    }
  });
};

exports.profilerefresh = (req, res, next) => {
  data.findOne({where: {pasen_id: req.body}}).then(nik => {
    if(nik){
      res.status(200).json({
            id: nik.pasen_id,
            namalengkap: nik.namalengkap,
            nik: nik.nik,
            email: nik.email,
            tanggalLahir: nik.tanggallahir,
            golongandarah: nik.golongandarah,
            tempatLahir: nik.tempatlahir,
            alamat: nik.alamat,
            rw: nik.rw,
            rt: nik.rt,
            kodepos: nik.kodepos,
            kodewilayah: nik.kodewilayah,
            pekerjaan: nik.pekerjaan,
            jeniskelamin: nik.jeniskelamin,
          });
    }
  })
}
exports.logout = (req, res, next) => {
  data.update({accesstoken: null}, {
    where: {pasen_id: req.body.id}
  })
  .then(id => {
    if(id){
     return res.status(200).json({alert : 'Logout Berhasil'})
    }
  })
  .catch(err => {
    console.log(err)
  })
}