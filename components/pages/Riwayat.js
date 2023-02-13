import React from 'react';
import {ScrollView} from 'react-native';
import {View, Text, TouchableOpacity} from 'react-native';
import {stylesGeneral, stylesRiwayat} from '../Style';
import {MainNavbar} from '../MainNavbar';

export const Riwayat = ({navigation}) => {
  return (
    <ScrollView>
      <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
        <MainNavbar />
        <Text style={stylesRiwayat.title}>Riwayat</Text>
        <Text style={stylesRiwayat.bulan}>Januari 2023</Text>
        <TouchableOpacity>
          <View style={stylesRiwayat.ketContainer}>
            <Text style={stylesRiwayat.ketTanggal}>1 Januari 2023</Text>
            <Text style={stylesRiwayat.ketPenyakit}>
              Kamu mengidap penyakit Diabetes{' '}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
