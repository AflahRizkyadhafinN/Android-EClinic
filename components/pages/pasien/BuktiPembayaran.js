import React, { useContext, useEffect, useState } from 'react';
import {View, Text, ScrollView} from 'react-native';
import {stylesBPembayaran, stylesGeneral} from '../../Style';
import {MainNavbar} from '../../MainNavbar';
import {Icon} from '@rneui/themed';
import { useRoute } from '@react-navigation/native';
import { makeContext } from '../../UseContext';
import { API_URL } from '../../../App';

export const BuktiPembayaran = ({navigation}) => {
  const route = useRoute()
  const diagnosaId = route.params.diagnosaId
  const [dataDiagnosa, setDataDiagnosa] = useState({})
  const [dataObat, setDataObat] = useState([])
  const {userdata} = useContext(makeContext)
  useEffect(() => {
    fetch(`${API_URL}/pasien/diagnosa/${diagnosaId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${userdata.token}` 
      },
    })
      .then(res => res.json())
      .then(list => {
        setDataObat(list[0].obat_pasien);
        const diagnosa = list.map(item => {
          return {
            namaPasien: item.userdatum.namalengkap,
            namaDokter: item.dokter.nama_dokter,
            tanggal: item.tanggal_diagnosis,
          };
        });
        setDataDiagnosa(diagnosa[0])
      });
  }, []);
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
              <Text style={stylesBPembayaran.text}>{dataDiagnosa.namaPasien}</Text>
            </View>
            <View style={stylesBPembayaran.ketContainer}>
              <Text style={stylesBPembayaran.text}>Nama Dokter</Text>
              <Text style={stylesBPembayaran.text}>{dataDiagnosa.namaDokter}</Text>
            </View>
            <View style={stylesBPembayaran.ketContainer}>
              <Text style={stylesBPembayaran.text}>Penyakit</Text>
              <Text style={stylesBPembayaran.text}>Sakit Mata</Text>
            </View>
          </View>
          {dataObat.map((item, index) => {
            return (
              <View key={index}>
                <Text style={stylesBPembayaran.text}>{item.obat_nama}</Text>
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
          />
        </View>
      </View>
    </ScrollView>
  );
};
