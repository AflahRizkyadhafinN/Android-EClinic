const data = require('../models/datas');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret_key = process.env.JWT_SECRET

exports.login = (req, res, next) => {
    if(isNaN(req.body.nik)){
        return res.status(400).json({alert: 'NIK Harus Angka!'})
    }
    data.findOne({where: {nik: req.body.nik}}).then(nik => {
        if (req.body.remember) {
           if (!nik) {
            return res.status(404).json({alert: 'Nik Tidak Terdaftar, Register Sekarang!'});
          }
          return bcrypt.compare(req.body.pass, nik.password, (err, passwordHash) => {
              if (passwordHash) {
                const token = jwt.sign({nik: req.body.nik}, secret_key, {
                  expiresIn: '1d',
                });
                res
                  .status(200)
                  .json({
                    alert: 'Login Berhasil',
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
                    token: token,
                  });
              } else {
                return res.status(404).json({alert: 'Password Salah'});
              }
            });

        }
        if (!nik) {
            return res.status(404).json({alert: 'Nik Tidak Terdaftar, Register Sekarang!'});
          }
        bcrypt.compare(req.body.pass, nik.password, (err, passwordHash) => {
            if (passwordHash) {
              const token = jwt.sign({nik: req.body.nik}, secret_key, {
                expiresIn: '1d',
              });
              res
                .status(200)
                .json({
                  alert: 'Login Berhasil',
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
                  token: token,
                });
            } else {
              res.status(404).json({alert: 'Password Salah'});
            }
          });
      });
    
  };

exports.auth = (req, res, next) => {
  
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      return res.status(401).json({alert: 'Authentication Gagal'});
    }
    const token = authHeader.split(' ')[1];
  
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, secret_key);
    } catch (err) {
      return res.status(500).json({alert: 'Error token expired'});
    }
    if (!decodedToken) {
      return res.status(401).json({alert: 'Unauthorized'});
    } 
    res.status(200).json({alert: 'Login Berhasil'})
        data.update(
          {
            accesstoken: token,
          },
          {
            where: {
              nik: decodedToken.nik,
            },
          },
        );
    
  };
  
  
  exports.rememberauth = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      return res.status(401).json({alert: 'Authentication Gagal'});
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, secret_key);
    } catch (err) {
      return res.status(500).json({alert: 'Error token expired. Silahkan login kembali'});
    }
    if (!decodedToken) {
      return res.status(401).json({alert: 'Unauthorized'});
    }
      data.findOne({where: {nik: decodedToken.nik}}).then(nik => {
        if (nik) {
          res
            .status(200)
            .json({
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
              token: token,
            })
              data.update(
                {
                  accesstoken: token,
                },
                {
                  where: {
                    nik: decodedToken.nik,
                  },
                },
              );
        }
        else{
          res.status(404).json({alert: 'Error tolong login kembali'})
        }
      })
  }