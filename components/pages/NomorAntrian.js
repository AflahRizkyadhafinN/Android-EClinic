import React from 'react';
import {View, Text} from 'react-native';
import {stylesGeneral, stylesNomorAntrian} from '../Style';

export const NomorAntrian = () => {
  return (
    <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
      <Text style={stylesNomorAntrian.title}>Antrian</Text>
      <View style={stylesNomorAntrian.antrianContainer}>
        <View style={stylesNomorAntrian.antrianNomorContainer}>
          <Text style={stylesNomorAntrian.antrianNomor}>001</Text>
        </View>
        <Text style={stylesNomorAntrian.antrianNama}>Hai Faisal Muslim</Text>
        <Text style={stylesNomorAntrian.antrianWaktu}>
          Kamu mendaftar pada 30 Januari 2022
        </Text>
      </View>
      <Text style={stylesNomorAntrian.arahan}>
        Untuk ke page selanjutnya kamu harus menyelesaikan sesi diagnosis
        bersama dokter
      </Text>
    </View>
  );
};
