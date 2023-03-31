import React from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import {stylesBPembayaran, stylesGeneral} from '../../Style';
import {MainNavbar} from '../../MainNavbar';
import {Icon} from '@rneui/themed';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {NumericFormat} from 'react-number-format';
import {useState} from 'react';
import FileViewer from 'react-native-file-viewer';

export const BuktiPembayaran = ({navigation}) => {
  const nama = 'Zeke yeager';
  const penyakit = 'Batu ginjal';
  const tanggal = '29 Maret 2023';
  const antrian = 1;
  const listObat = [
    {
      nama: 'Cendo Xitrol Eye Drop',
      jumlah: 5,
      harga: 10000,
    },
    {
      nama: 'DeNature',
      jumlah: 1,
      harga: 10000,
    },
    {
      nama: 'Wallatra Limatta Softgel',
      jumlah: 1,
      harga: 10000,
    },
    {
      nama: 'DeNature',
      jumlah: 1,
      harga: 10000,
    },
    {
      nama: 'Wallatra Limatta Softgel',
      jumlah: 1,
      harga: 10000,
    },
  ];

  const dataInvoice = listObat.map((item, index) => {
    return `<tr>
      <td style="text-align: center">${index + 1}</td>
      <td>${item.nama}</td>
      <td style="text-align: center">${item.jumlah}</td>
      <td style="text-align: right">Rp. ${item.jumlah * item.harga}</td>
      </tr>`;
  });

  let harga;
  let jumlah = 0;
  listObat.map((item, index) => {
    harga = item.harga * item.jumlah;
    jumlah += harga;
  });

  const invoice = `
  <style>
      .title {
        text-align: center;
      }
      .tanggal {
        text-align: center;
        font-weight: 400;
      }
      th {
        background-color: #000000;
        color: #ffffff;
        font-size: 15px;
      }
      .identitas td:nth-child(1) {
        min-width: 80px;
        max-width: 80px;
        width: 0;
      }
      .identitas td:nth-child(2) {
        min-width: 2px;
        max-width: 2px;
        width: 0;
      }
      .identitas td:nth-child(3) {
        min-width: 200px;
        max-width: 200px;
        width: 0;
      }
      .identitasContainer {
        display: grid;
        grid-template-columns: 50% 50%;
        justify-content: space-between;
        align-items: flex-start;
      }
      .deskTable {
        display: flex;
        justify-content: center;
        border-collapse: collapse;
        margin-top: 20px;
      }
      .deskTable tr th:nth-child(1) {
        width: 0;
        min-width: 50px;
        max-width: 50px;
        text-align: center;
        border: 1px solid black;
        padding: 5px;
      }
      .deskTable tr th:nth-child(2) {
        width: 0;
        min-width: 350px;
        max-width: 350px;
        text-align: center;
        border: 1px solid black;
        padding: 5px;
      }
      .deskTable tr th:nth-child(3) {
        width: 0;
        min-width: 80px;
        max-width: 80px;
        text-align: center;
        border: 1px solid black;
        padding: 5px;
      }
      .deskTable tr th:nth-child(4) {
        width: 0;
        min-width: 190px;
        max-width: 190px;
        text-align: center;

        border: 1px solid black;
        padding: 5px;
      }
      .deskTable tr td {
        border: 1px solid black;
        padding: 5px;
      }

      .deskTable tr:nth-child(odd) {
        background-color: #cdcdcd;
      }

      .totalTable {
        border-collapse: collapse;
        display: flex;
        justify-content: center;
        margin-left: 420px;
        margin-top: 20px;
        padding: 5px;
      }
      .totalTable tr td {
        background-color: #00096e;
        border: 1px solid black;
        padding: 5px;
        width: 0;
        color: #fff;
        font-weight: 600;
      }
      .totalTable tr td:first-child {
        min-width: 80px;
        max-width: 80px;
        text-align: center;
        border-right-width: 0;
      }
      .totalTable tr td:last-child {
        min-width: 190px;
        max-width: 190px;
        text-align: right;
        border-left-width: 0;
      }
    </style>
    <h1 style="text-align: center">Invoice</h1>
    <h5 class="tanggal">${tanggal}</h5>
    <div class="identitasContainer">
      <table>
        <tr class="identitas">
          <td>No Antrian</td>
          <td>:</td>
          <td>${antrian}</td>
        </tr>
        <tr class="identitas">
          <td>Nama Pasien</td>
          <td>:</td>
          <td>${nama}</td>
        </tr>
        <tr class="identitas">
          <td>Penyakit</td>
          <td>:</td>
          <td>${penyakit}</td>
        </tr>
      </table>
      <table>
        <tr class="identitas">
          <td>Nama dokter</td>
          <td>:</td>
          <td>dr. NI KETUT RAI PURNAMI, Sp.P.D, K-Ger, FINASIM</td>
        </tr>
        <tr class="identitas">
          <td>Spesialis</td>
          <td>:</td>
          <td></td>
        </tr>
      </table>
    </div>
    <div>
      <table class="deskTable">
        <tr>
          <th>No.</th>
          <th>Nama Obat</th>
          <th>Jumlah</th>
          <th>Harga</th>
        </tr>
        ${dataInvoice.join('')}
      </table>
      <table class="totalTable">
        <tr>
          <td>Total :</td>
          <td>Rp. ${jumlah}</td>
        </tr>
      </table>
    </div>
  </div>
  `;

  const createPDF = async () => {
    let options = {
      html: invoice,
      fileName: 'test',
      directory: 'PDF',
    };

    let file = await RNHTMLtoPDF.convert(options);
    Alert.alert(
      'Success',
      'Path : ' + file.filePath,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Open', onPress: () => openFile(file.filePath)},
      ],
      {cancelable: true},
    );
  };

  const openFile = filepath => {
    // const path = filepath; // absolute-path-to-my-local-file.
    FileViewer.open(filepath)
      .then(() => {
        // success
      })
      .catch(error => {
        // error
      });
  };

  return (
    <ScrollView>
      <View style={stylesGeneral.container}>
        <MainNavbar
          navigation={navigation}
          type={'default'}
          menuType={'default'}
        />
        <View style={stylesBPembayaran.mainContainer}>
          <Text style={stylesBPembayaran.title}>Bukti Pembayaran</Text>
          <View style={stylesBPembayaran.secondContainer}>
            <View style={stylesBPembayaran.ketContainer}>
              <Text style={stylesBPembayaran.text}>Nama Pasien</Text>
              <Text style={stylesBPembayaran.text}>Zeke Yeager</Text>
            </View>
            <View style={stylesBPembayaran.ketContainer}>
              <Text style={stylesBPembayaran.text}>Nama Dokter</Text>
              <Text style={stylesBPembayaran.text}>Grisha Yeager</Text>
            </View>
            <View style={stylesBPembayaran.ketContainer}>
              <Text style={stylesBPembayaran.text}>Penyakit</Text>
              <Text style={stylesBPembayaran.text}>Sakit Mata</Text>
            </View>
          </View>
          {listObat.map((item, index) => {
            return (
              <View key={index}>
                <Text style={stylesBPembayaran.text}>{item.nama}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={stylesBPembayaran.text}>
                    Rp {item.harga} x {item.jumlah}
                  </Text>
                  <Text style={stylesBPembayaran.text}>
                    Rp {item.harga * item.jumlah}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={stylesBPembayaran.thirdContainer}>
          <Icon
            name="printer"
            type="material-community"
            size={40}
            color="white"
            backgroundColor={'#56A447'}
            style={[stylesBPembayaran.button, {marginRight: 15}]}
          />
          <Icon
            name="page-export-pdf"
            type="foundation"
            size={41}
            color="white"
            backgroundColor={'#56A447'}
            style={stylesBPembayaran.button}
            onPress={() => createPDF()}
          />
        </View>
      </View>
    </ScrollView>
  );
};
