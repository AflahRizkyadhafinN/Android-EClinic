'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('pasien', {
      pasien_id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      kode_pasien: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false
      },
      nama: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      nik: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      jenis_kelamin: {
        type: Sequelize.CHAR(1),
        allowNull: true
      },
      tempat_lahir: {
        type: Sequelize.CHAR(100),
        allowNull: true
      },
      tanggal_lahir: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      rt: {
        type: Sequelize.STRING(25),
        allowNull: true
      },
      rw: {
        type: Sequelize.STRING(25),
        allowNull: true
      },
      kode_wilayah: {
        type: Sequelize.STRING(25),
        allowNull: true
      },
      kode_pos: {
        type: Sequelize.STRING(25),
        allowNull: true
      },
      no_kontak: {
        type: Sequelize.STRING(25),
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      pekerjaan_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: {tableName: 'pekerjaan', schema: 'ref'},
          key: 'pekerjaan_id'
        }
      },
      golongan_darah_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: {tableName: 'golongan_darah', schema: 'ref'},
          key: 'golongan_darah_id'
        }
      },
      keahlian_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: {tableName: 'keahlian', schema: 'ref'},
          key: 'keahlian_id'
        }
      },
    }, {
      tableName: 'pasien',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: "jenis_absen_pkey",
          unique: true,
          fields: [
            { name: "id_jenis_absen" },
          ]
        },
      ]
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable({tableName: 'pasien', schema: 'public'});
  }
};
