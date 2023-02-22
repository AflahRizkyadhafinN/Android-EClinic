const data = require('../models/datas');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const crypto = require('crypto')
const secret_key = process.env.JWT_SECRET
const {wilayah} = require('../models/dokterdata');
const { body, validationResult } = require('express-validator');

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
  