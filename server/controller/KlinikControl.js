const {klinik, poliklinik, klinik_poliklinik} = require('../models/dokterdata');
const sequelize = require('../models/connection');

exports.klinik = (req, res) => {
  klinik.findAll().then(data_klinik => {
    return res.json(data_klinik);
  });
};

exports.getPoliklinik = (req, res) => {
  klinik
    .findOne({
      where: {nama: 'klinik123'},
      include: [
        {
          model: klinik_poliklinik,
          attributes: ['klinik_id'],
          include: [
            {
              model: poliklinik,
              required: true,
              attributes: ['poliklinik_id', 'nama'],
            },
          ],
        },
      ],
      attributes: ['nama'],
    })
    .then(result => {
      if (result) {
        const klinikpoli = result.klinik_polikliniks;
        const nama = klinikpoli.map(data => data.poliklinik.nama);
        return res.status(200).json(nama);
      }
    })
    .catch(error => {
      console.error(error);
    });
};
