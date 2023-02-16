const Sequelize = require('sequelize');
const sequelize = require('./connection.js');

const dokter = sequelize.define(
  'dokter',
  {
    dokter_id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    nik: {
      type: Sequelize.STRING(16),
    },
    nama: {
      type: Sequelize.STRING(50),
    },
    jenis_kelamin: {
      type: Sequelize.STRING(1),
    },
    keahlian_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
  },
);

const klinik = sequelize.define(
  'klinik',
  {
    klinik_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    kode_klinik: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: Sequelize.STRING(100),
    },
    alamat: {
      type: Sequelize.TEXT
    },
    kode_wilayah: {
      type: Sequelize.STRING(10),
    },
    rt: {
      type: Sequelize.NUMERIC(5, 0),
    },
    rw: {
      type: Sequelize.NUMERIC(5, 0),
    },
    kode_pos: {
      type: Sequelize.NUMERIC(5, 0)
    },
    no_kontak: {
      type: Sequelize.STRING(20),
    },
    email: {
      type: Sequelize.STRING(30)
    },
    no_wa: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    instagram: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    twitter: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    facebook: {
      type: Sequelize.TEXT,
      allowNull: true
    },
  },
  {
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "klinik_pkey",
        unique: true,
        fields: [
          { name: "kode_klinik" },
        ]
      },
      {
        name: "email_klinik_ukey",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
    ]
  },
  );

  const golongan_darah = sequelize.define(
    'golongan_darah',
    {
      golongan_darah_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement :true
      },
      nama: {
        type: Sequelize.STRING(10),
      }
    },
    {
      timestamps: false,
    },
  )
  const keahlian = sequelize.define(
    'keahlian',
    {
      keahlian_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement :true
      },
      nama: {
        type: Sequelize.STRING(60),
      }
    },
    {
      timestamps: false,
    },
  )
  const wilayah = sequelize.define(
    'master_wilayah',
    {
      wilayah_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement :true
      },
      kode_wilayah: {
        type: Sequelize.STRING(10),
      },
      nama: {
        type: Sequelize.STRING(60),
      },
    },
    {
      timestamps: false,
      schema: 'ref'
    },
  )
  const penyakit = sequelize.define(
    'daftar_penyakit',
    {
      penyakit_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      nama: {
        type: Sequelize.STRING(60),
      }
    },
    {
      timestamps: false,
    },
  )
  const pekerjaan = sequelize.define(
    'pekerjaan',
    {
      pekerjaan_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nama: {
        type: Sequelize.STRING(30),
      }
    },
    {
      timestamps: false,
    },
  )
  const klinik_poliklinik = sequelize.define(
    'klinik_poliklinik',{
      poliklinik_id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model : {tableName: 'poliklinik', schema: 'ref'},
          key: 'poliklinik_id'
        }
      },
      klinik_id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model : {tableName: 'klinik', schema: 'public'},
          key: 'kode_klinik'
        }
      },
    },
    {
      schema: 'ref',
      timestamps: false
    }
  )
  const poliklinik = sequelize.define(
    'poliklinik',{
      poliklinik_id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    },
    {
      schema: 'ref',
      timestamps: false,
      
    }
  )

  klinik.hasMany(klinik_poliklinik, {foreignKey: 'klinik_id'})
  klinik_poliklinik.belongsTo(klinik, {foreignKey: 'klinik_id'})
  klinik_poliklinik.belongsTo(poliklinik, {foreignKey: 'poliklinik_id'})
  poliklinik.hasMany(klinik_poliklinik, {foreignKey: 'poliklinik_id'})
module.exports = {wilayah, dokter, klinik, poliklinik, klinik_poliklinik}