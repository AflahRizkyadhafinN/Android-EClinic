const {klinik, poliklinik, klinik_poliklinik, dokter, keahlian, klinik_dokter} = require('../models/dokterdata');
const sequelize = require('../models/connection');
const Sequelize = require('sequelize');
 const Op = Sequelize.Op
 const { body, validationResult } = require('express-validator');

exports.klinik = (req, res) => {
  klinik.findAll().then(data_klinik => {
    return res.json(data_klinik);
  });
};

exports.getPoliklinik = (req, res) => {
  klinik
    .findOne({
      where: {nama_klinik: 'klinik123'},
      include: [
        {
          model: klinik_poliklinik,
          attributes: ['klinik_id'],
          include: [
            {
              model: poliklinik,
              // required: true,
              attributes: ['poliklinik_id', 'nama'],
              
            },
          ],
        },
      ],
      attributes: ['nama_klinik'],
    })
    .then(result => {
      if (result) {
        console.log(result.klinik_polikliniks);
        const klinikpoli = result.klinik_polikliniks;
        return res.status(200).json(klinikpoli);
      }
    })
    .catch(error => {
      console.error(error);
    });
};


exports.ambilNomor = (req, res) => { 
  klinik
  .findAll({
      where: {nama_klinik: req.body.namaKlinik, '$nama_keahlian$': { [Op.eq] : req.body.keahlian} },
      raw: true,
      nest: true,
      include: 
        {
          required: true,
          duplicating: false,
          model: klinik_dokter,     
          attributes: ['klinik_id'],
          include: 
            {
              model: dokter,
              attributes: ['nama_dokter'],
              raw: true,
              nest: true,
              include: 
                {
                  model: keahlian,
                  // where: {nama_keahlian: req.body.keahlian},
                  attributes: ['nama_keahlian'],
                },

            },

          
        },

      attributes: ['nama_klinik'],
    })
  .then(result => {
      if (result) {
        const aray = result.map(item => item.dokter_kliniks.dokter)
        return res.status(200).json(aray);
      }
    })
  .catch(error => {
      console.error(error);
    });
}
