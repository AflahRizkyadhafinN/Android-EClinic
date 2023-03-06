import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {stylesBPembayaran, stylesGeneral} from '../../Style';
import {MainNavbar} from '../../MainNavbar';
import {Icon} from '@rneui/themed';

export const BuktiPembayaran = ({navigation}) => {
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
  ];
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
          />
        </View>
      </View>
    </ScrollView>
  );
};
