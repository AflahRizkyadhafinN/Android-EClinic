import React from 'react';
import {ScrollView} from 'react-native';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {stylesGeneral, stylesRiwayat} from '../../Style';
import {MainNavbar} from '../../MainNavbar';

export const Riwayat = ({navigation}) => {
  const riwayat = [
    {
      tanggal: '1 Januari 2023',
      penyakit: 'Diabetes',
      value: '1jan23diabetes',
    },
    {
      tanggal: '2 Januari 2023',
      penyakit: 'Batu Ginjal',
      value: '2jan23batuginjal',
    },
    {
      tanggal: '3 Januari 2023',
      penyakit: 'Mata Rabun',
      value: '3jan23matarabun',
    },
  ];
  return (
    <ScrollView>
      <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
        <MainNavbar
          navigation={navigation}
          type={'default'}
          menuType={'default'}
        />
        <Text style={stylesRiwayat.title}>Riwayat</Text>
        <Text style={stylesRiwayat.bulan}>Januari 2023</Text>
        {riwayat.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Hasil', {ket: 'Riwayat'})}
              key={index}>
              <View
                style={[
                  stylesRiwayat.ketContainer,
                  index % 2 != 0 ? {backgroundColor: '#cdcdcd'} : undefined,
                ]}>
                <Text style={stylesRiwayat.ketTanggal}>{item.tanggal}</Text>
                <Text style={stylesRiwayat.ketPenyakit}>
                  Kamu mengidap penyakit {item.penyakit}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </ScrollView>
  );
};
